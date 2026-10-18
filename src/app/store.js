import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import eventsReducer from '../features/events/eventsSlice';
import registrationsReducer from '../features/registrations/registrationsSlice';
import { saveJSON } from '../utils/storage';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
});

store.subscribe(() => {
  const { auth, registrations } = store.getState();
  saveJSON('users', auth.users);
  saveJSON('registrations', registrations.items);
  if (auth.user) {
    saveJSON('currentUser', auth.user);
  } else {
    localStorage.removeItem('currentUser');
  }
});