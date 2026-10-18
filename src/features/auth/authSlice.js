import { createSlice } from '@reduxjs/toolkit';
import { loadJSON } from '../../utils/storage';

const initialState = {
  users: loadJSON('users', []),
  user: loadJSON('currentUser', null),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action) {
      const { name, email, password } = action.payload;
      const normalized = email.trim().toLowerCase();
      if (state.users.some((u) => u.email === normalized)) {
        state.error = 'An account with this email already exists';
        return;
      }
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: normalized,
        password,
      };
      state.users.push(newUser);
      state.user = { id: newUser.id, name: newUser.name, email: newUser.email };
      state.error = null;
    },
    login(state, action) {
      const { email, password } = action.payload;
      const normalized = email.trim().toLowerCase();
      const found = state.users.find(
        (u) => u.email === normalized && u.password === password
      );
      if (!found) {
        state.error = 'Invalid email or password';
        return;
      }
      state.user = { id: found.id, name: found.name, email: found.email };
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;