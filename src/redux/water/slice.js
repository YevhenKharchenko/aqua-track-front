import { createSlice } from '@reduxjs/toolkit';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
});

export const waterReducer = waterSlice.reducer;
