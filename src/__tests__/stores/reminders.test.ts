import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useRemindersStore } from '../../stores/reminders.js';
import Reminder from '../../model/Reminder.js';
import { mappedCities } from '../../stores/cities.js';

describe('Reminders Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('addReminder', () => {
    it('should add a valid reminder', () => {
      const store = useRemindersStore();
      const initialCount = store.reminders.length;

      const testCity = mappedCities.find(city => city.name === 'New York') || null;

      const newReminder = {
        title: 'Test Reminder',
        date: new Date('2024-10-15'),
        time: '14:30',
        color: '#ff0000',
        city: testCity
      };

      store.addReminder(newReminder);

      expect(store.reminders.length).toBe(initialCount + 1);
      const addedReminder = store.reminders[store.reminders.length - 1];
      expect(addedReminder.title).toBe('Test Reminder');
      expect(addedReminder.color).toBe('#ff0000');
    });

    it('should throw error for empty title', () => {
      const store = useRemindersStore();

      const invalidReminder = {
        title: '',
        date: new Date('2024-10-15'),
        time: '14:30',
        color: '#ff0000'
      };

      expect(() => store.addReminder(invalidReminder)).toThrow('Title is required');
    });

    it('should throw error for whitespace-only title', () => {
      const store = useRemindersStore();

      const invalidReminder = {
        title: '   ',
        date: new Date('2024-10-15'),
        time: '14:30',
        color: '#ff0000'
      };

      expect(() => store.addReminder(invalidReminder)).toThrow('Title is required');
    });

    it('should throw error for title too long', () => {
      const store = useRemindersStore();

      const invalidReminder = {
        title: 'a'.repeat(31),
        date: new Date('2024-10-15'),
        time: '14:30',
        color: '#ff0000'
      };

      expect(() => store.addReminder(invalidReminder)).toThrow('Title must be 30 characters or less');
    });

    it('should throw error for null date', () => {
      const store = useRemindersStore();

      const invalidReminder = {
        title: 'Test Reminder',
        date: null,
        time: '14:30',
        color: '#ff0000'
      };

      expect(() => store.addReminder(invalidReminder)).toThrow('Date is required');
    });

    it('should throw error for invalid time format', () => {
      const store = useRemindersStore();

      const invalidReminder = {
        title: 'Test Reminder',
        date: new Date('2024-10-15'),
        time: '25:61',
        color: '#ff0000'
      };

      expect(() => store.addReminder(invalidReminder)).toThrow('Time must be in HH:MM format (24-hour)');
    });

    it('should throw error for invalid time format - not HH:MM', () => {
      const store = useRemindersStore();

      const invalidReminder = {
        title: 'Test Reminder',
        date: new Date('2024-10-15'),
        time: '2:5',
        color: '#ff0000'
      };

      expect(() => store.addReminder(invalidReminder)).toThrow('Time must be in HH:MM format (24-hour)');
    });

    it('should throw error for empty time', () => {
      const store = useRemindersStore();

      const invalidReminder = {
        title: 'Test Reminder',
        date: new Date('2024-10-15'),
        time: '',
        color: '#ff0000'
      };

      expect(() => store.addReminder(invalidReminder)).toThrow('Time is required');
    });

    it('should throw error for invalid color format', () => {
      const store = useRemindersStore();

      const invalidReminder = {
        title: 'Test Reminder',
        date: new Date('2024-10-15'),
        time: '14:30',
        color: 'red'
      };

      expect(() => store.addReminder(invalidReminder)).toThrow('Color must be a valid hex color (e.g., #FF0000 or #F00)');
    });

    it('should throw error for empty color', () => {
      const store = useRemindersStore();

      const invalidReminder = {
        title: 'Test Reminder',
        date: new Date('2024-10-15'),
        time: '14:30',
        color: ''
      };

      expect(() => store.addReminder(invalidReminder)).toThrow('Color is required');
    });

    it('should accept valid 3-digit hex color', () => {
      const store = useRemindersStore();
      const initialCount = store.reminders.length;

      const validReminder = {
        title: 'Test Reminder',
        date: new Date('2024-10-15'),
        time: '14:30',
        color: '#f00'
      };

      expect(() => store.addReminder(validReminder)).not.toThrow();
      expect(store.reminders.length).toBe(initialCount + 1);
    });

    it('should accept valid time formats', () => {
      const store = useRemindersStore();
      const initialCount = store.reminders.length;

      const validReminder = {
        title: 'Test Reminder',
        date: new Date('2024-10-15'),
        time: '09:05',
        color: '#ff0000'
      };

      expect(() => store.addReminder(validReminder)).not.toThrow();
      expect(store.reminders.length).toBe(initialCount + 1);
    });
  });

  describe('updateReminder', () => {
    it('should update existing reminder', () => {
      const store = useRemindersStore();
      const existingId = store.reminders[0].id;

      const updatedCity = mappedCities.find(city => city.name === 'London') || null;

      const updatedReminder = new Reminder({
        id: existingId,
        title: 'Updated Title',
        color: '#00ff00',
        date: new Date(),
        city: updatedCity
      });

      store.updateReminder(updatedReminder);

      const found = store.getReminderById(existingId);
      expect(found?.title).toBe('Updated Title');
      expect(found?.color).toBe('#00ff00');
    });

    it('should throw error when updating non-existent reminder', () => {
      const store = useRemindersStore();

      const nonExistentReminder = new Reminder({
        id: 999,
        title: 'Non-existent',
        color: '#ff0000',
        date: new Date()
      });

      expect(() => store.updateReminder(nonExistentReminder)).toThrow('Reminder not found');
    });
  });

  describe('deleteReminder', () => {
    it('should delete reminder by id', () => {
      const store = useRemindersStore();
      const initialCount = store.reminders.length;
      const idToDelete = store.reminders[0].id;

      store.deleteReminder(idToDelete);

      expect(store.reminders.length).toBe(initialCount - 1);
      expect(store.getReminderById(idToDelete)).toBeUndefined();
    });
  });

  describe('getRemindersByDate', () => {
    it('should return reminders for specific date sorted by time', () => {
      const store = useRemindersStore();
      const testDate = new Date();
      testDate.setHours(0, 0, 0, 0);

      const remindersForDate = store.getRemindersByDate(testDate);

      expect(Array.isArray(remindersForDate)).toBe(true);

      // Check if sorted by time
      for (let i = 1; i < remindersForDate.length; i++) {
        expect(remindersForDate[i - 1].date.getTime()).toBeLessThanOrEqual(
          remindersForDate[i].date.getTime()
        );
      }
    });

    it('should return empty array for date with no reminders', () => {
      const store = useRemindersStore();
      const futureDate = new Date('2030-01-01');

      const reminders = store.getRemindersByDate(futureDate);

      expect(reminders).toEqual([]);
    });
  });

  describe('deleteAllReminderFromDate', () => {
    it('should delete all reminders from specific date', () => {
      const store = useRemindersStore();
      const testDate = new Date();
      testDate.setHours(0, 0, 0, 0);

      const initialRemindersForDate = store.getRemindersByDate(testDate);
      const initialTotalCount = store.reminders.length;

      store.deleteAllReminderFromDate(testDate);

      const remainingRemindersForDate = store.getRemindersByDate(testDate);
      expect(remainingRemindersForDate.length).toBe(0);
      expect(store.reminders.length).toBe(initialTotalCount - initialRemindersForDate.length);
    });
  });

  describe('getReminderById', () => {
    it('should return reminder when id exists', () => {
      const store = useRemindersStore();
      const existingId = store.reminders[0].id;

      const reminder = store.getReminderById(existingId);

      expect(reminder).toBeDefined();
      expect(reminder?.id).toBe(existingId);
    });

    it('should return undefined when id does not exist', () => {
      const store = useRemindersStore();

      const reminder = store.getReminderById(999);

      expect(reminder).toBeUndefined();
    });
  });

  describe('Reminder.validateFormData', () => {
    it('should return undefined for valid data', () => {
      const error = Reminder.validateFormData(
        'Valid Title',
        new Date('2024-10-15'),
        '14:30',
        '#ff0000'
      );

      expect(error).toBeUndefined();
    });

    it('should validate time edge cases', () => {
      expect(Reminder.validateFormData('Title', new Date(), '00:00', '#fff')).toBeUndefined();
      expect(Reminder.validateFormData('Title', new Date(), '23:59', '#fff')).toBeUndefined();
      expect(Reminder.validateFormData('Title', new Date(), '24:00', '#fff')).toBe('Time must be in HH:MM format (24-hour)');
      expect(Reminder.validateFormData('Title', new Date(), '12:60', '#fff')).toBe('Time must be in HH:MM format (24-hour)');
    });

    it('should validate color edge cases', () => {
      expect(Reminder.validateFormData('Title', new Date(), '12:00', '#000')).toBeUndefined();
      expect(Reminder.validateFormData('Title', new Date(), '12:00', '#FFFFFF')).toBeUndefined();
      expect(Reminder.validateFormData('Title', new Date(), '12:00', '#abc123')).toBeUndefined();
      expect(Reminder.validateFormData('Title', new Date(), '12:00', 'ff0000')).toBe('Color must be a valid hex color (e.g., #FF0000 or #F00)');
      expect(Reminder.validateFormData('Title', new Date(), '12:00', '#gg0000')).toBe('Color must be a valid hex color (e.g., #FF0000 or #F00)');
    });
  });
});