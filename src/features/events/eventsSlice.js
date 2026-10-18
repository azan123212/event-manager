import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchEvents,
  fetchEventById,
  fetchClassifications,
  normalizeEvent,
} from '../../services/ticketmaster';

export const getEvents = createAsyncThunk(
  'events/getEvents',
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchEvents(params);
      return {
        list: (data._embedded?.events || []).map(normalizeEvent),
        page: data.page || {},
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getEventDetails = createAsyncThunk(
  'events/getEventDetails',
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchEventById(id);
      return normalizeEvent(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  'events/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchClassifications();
      const names = (data._embedded?.classifications || [])
        .map((c) => c.segment?.name)
        .filter(Boolean);
      return [...new Set(names)];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  list: [],
  selected: null,
  categories: [],
  status: 'idle',
  detailsStatus: 'idle',
  error: null,
  detailsError: null,
  page: 0,
  totalPages: 0,
  totalElements: 0,
  filters: { keyword: '', category: '', city: '' },
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 0;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearSelected(state) {
      state.selected = null;
      state.detailsStatus = 'idle';
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.list;
        state.totalPages = action.payload.page.totalPages || 0;
        state.totalElements = action.payload.page.totalElements || 0;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(getEventDetails.pending, (state) => {
        state.detailsStatus = 'loading';
        state.detailsError = null;
      })
      .addCase(getEventDetails.fulfilled, (state, action) => {
        state.detailsStatus = 'succeeded';
        state.selected = action.payload;
      })
      .addCase(getEventDetails.rejected, (state, action) => {
        state.detailsStatus = 'failed';
        state.detailsError = action.payload || action.error.message;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilters, setPage, clearSelected } = eventsSlice.actions;
export default eventsSlice.reducer;