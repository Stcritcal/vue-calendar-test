import type { City } from '@/model/City.js';

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  pressure: number;
}

export interface WeatherApiResponse {
  daily: Array<{
    dt: number;
    weather: Array<{
      main: string;
    }>;
  }>;
}

export class WeatherService {
  private static readonly API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  private static readonly BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

  static async fetchWeatherForCity(city: City, reminderDate: Date): Promise<string> {
    try {
      const weatherData = await this.makeWeatherApiCall(city.latitude, city.longitude);

      // Find the forecast that matches the reminder date
      if (weatherData && weatherData.daily && weatherData.daily.length > 0) {
        const targetDate = new Date(reminderDate);
        targetDate.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

        // Find the forecast for the specific date
        const matchingForecast = weatherData.daily.find(forecast => {
          const forecastDate = new Date(forecast.dt * 1000); // Convert Unix timestamp to Date
          forecastDate.setHours(0, 0, 0, 0); // Normalize to start of day
          return forecastDate.getTime() === targetDate.getTime();
        });

        if (matchingForecast && matchingForecast.weather && matchingForecast.weather.length > 0) {
          return matchingForecast.weather[0].main;
        }

        // If no exact match found, check if the date is too far in the future
        const maxForecastDate = new Date(Math.max(...weatherData.daily.map(f => f.dt * 1000)));
        const minForecastDate = new Date(Math.min(...weatherData.daily.map(f => f.dt * 1000)));

        if (targetDate > maxForecastDate) {
          return '--'; // More than 8 days in future
        } else if (targetDate < minForecastDate) {
          return '--'; // Date is in the past
        } else {
          return '--'; // Date is within range but no data
        }
      }

      return '--';
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return '--';
    }
  }

  private static async makeWeatherApiCall(lat: number, lon: number): Promise<WeatherApiResponse | null> {
    if (!this.API_KEY || this.API_KEY === 'undefined') {
      throw new Error('OpenWeatherMap API key is not configured. Please set VITE_OPENWEATHER_API_KEY in your .env.local file.');
    }

    try {
      const url = `${this.BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${this.API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error; // Re-throw the error instead of falling back to mock data
    }
  }
}