import { createSlice } from '@reduxjs/toolkit';
import { loadJSON } from '../../utils/storage';

const initialState = {
  items: loadJSON('registrations', []),
  message: null,
};

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    registerEvent(state, action) {
      const { userId, event } = action.payload;
      const exists = state.items.some(
        (r) => r.userId === userId && r.eventId === event.id
      );
      if (exists) {
        state.message = { type: 'error', text: 'You are already registered for this event.' };
        return;
      }
      state.items.push({
        userId,
        eventId: event.id,
        name: event.name,
        date: event.date,
        time: event.time,
        image: event.image,
        venue: event.venue,
        city: event.city,
        category: event.category,
        registeredAt: new Date().toISOString(),
      });
      state.message = { type: 'success', text: `Registered for "${event.name}"!` };
    },
    cancelRegistration(state, action) {
      const { userId, eventId } = action.payload;
      state.items = state.items.filter(
        (r) => !(r.userId === userId && r.eventId === eventId)
      );
      state.message = { type: 'success', text: 'Registration cancelled.' };
    },
    clearMessage(state) {
      state.message = null;
    },
  },
});

export const { registerEvent, cancelRegistration, clearMessage } = registrationsSlice.actions;
export default registrationsSlice.reducer;