import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    name: '',
  },
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
  },
  selectors: {
    selectNameFilter: state => state.name,
  },
});

export const { changeFilter } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;

export const { selectNameFilter } = filtersSlice.selectors;
