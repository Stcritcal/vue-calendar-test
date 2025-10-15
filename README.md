# Vue Calendar Application

A modern, feature-rich calendar application built with Vue.js 3, vite, TypeScript, and Tailwind CSS. This project demonstrates advanced front-end development skills including state management and API integration.

## 🚀 Features

### Core Calendar Functionality
- **Monthly Calendar View** - Clean, intuitive monthly grid layout
- **Month Navigation** - Navigate between months using arrow buttons
- **Today Highlighting** - Current date is visually highlighted

### Reminder Management
- **Create Reminders** - Add reminders with title, date, time, color, and location
- **Edit Reminders** - Modify existing reminders with full validation
- **Delete Reminders** - Remove individual reminders or all reminders for a specific date
- **Color Coding** - Customize reminder appearance with color selection
- **Form Validation** - Comprehensive validation for all reminder fields

### Location & Weather Integration
- **City Selection** - Choose from 50 international cities with country flags
- **Weather Forecasts** - Automatic weather predictions for reminder dates
- **Smart Weather Matching** - Intelligent date-specific weather data retrieval
- **Fallback Handling** - Graceful handling of API limitations and errors

### User Experience
- **Date Details Sidebar** - View all reminders for a selected date
- **Modal Forms** - Intuitive reminder creation and editing interface
- **Visual Feedback** - Clear indicators for different reminder states

## 🛠️ Technology Stack

- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development
- **Pinia** - Modern state management for Vue
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Vitest** - Unit testing framework
- **OpenWeatherMap API** - Real-time weather data integration

## 📦 Installation & Setup

### Prerequisites
- Node.js (v20.19.0 or v22.12.0+)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd vue-calendar-test
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration (Optional)
For weather functionality, create a `.env.local` file in the root directory:
```bash
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

To get a free API key:
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Generate an API key
4. Add it to your `.env.local` file

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Testing & Build

### Run Unit Tests
```bash
npm run test:unit
```

### Type Checking
```bash
npm run type-check
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 How to Use

### Creating Reminders
1. Click the "+" button on any calendar date (only appears while hovering the cell)
2. Fill in the reminder details:
   - **Title** (required, max 30 characters)
   - **Date & Time** (required)
   - **Color** (required, hex format)
   - **City** (optional, for weather integration)
3. Click "Save Reminder"

### Managing Reminders
- **View Details**: Click on a date to see all reminders in the sidebar
- **Edit**: Click the edit button on any reminder card
- **Delete**: Use the delete button on individual reminders
- **Bulk Delete**: Remove all reminders for a date using "Delete All"

### Navigation
- **Month Navigation**: Use left/right arrows in the header
- **Date Selection**: Click any date to view its reminders

## 🔧 Development Setup

### Recommended IDE Setup
- **VS Code** + [Vue Official Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- Disable Vetur if installed

### Browser DevTools
- **Chrome/Edge**: Install [Vue.js DevTools](https://chromestore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox**: Install [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## 🏗️ Project Structure

```
src/
├── components/           # Reusable Vue components
│   ├── calendar/        # Calendar-specific components
│   ├── modal/           # Modal and form components
│   └── ...
├── stores/              # Pinia state management
├── model/               # TypeScript interfaces and classes
├── services/            # API integration services
├── utils/               # Utility functions
└── __tests__/           # Unit test files
```

## 🌟 Key Features Implemented

### State Management
- Centralized reminder storage with Pinia
- Reactive calendar state management
- Modal and offcanvas state handling

### Weather Integration
- Real-time weather API integration
- Smart date matching for forecasts
- Graceful fallback to mock data
- Comprehensive error handling

### Type Safety
- Full TypeScript implementation
- Strong typing for all data structures
- Interface-based API contracts

### User Experience
- Intuitive reminder creation workflow
- Visual feedback and validation
- Responsive design patterns
- Accessibility considerations

## 📝 License

This project was created as part of a technical assessment and demonstrates modern Vue.js development practices.
