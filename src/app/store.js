import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import eventsReducer from '../features/events/eventsSlice';
import { saveJSON } from '../utils/storage';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
  },
});

store.subscribe(() => {
  const { users, user } = store.getState().auth;
  saveJSON('users', users);
  if (user) {
    saveJSON('currentUser', user);
  } else {
    localStorage.removeItem('currentUser');
  }
});