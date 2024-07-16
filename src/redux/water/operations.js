import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWaterPerDay = createAsyncThunk(
  'waterPerDay/fetch',
  async (localDate, thunkAPI) => {
    try {
      const response = await axios.post('/water/fullday', { localDate });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchWaterPerMonth = createAsyncThunk(
  'waterPerMonth/fetch',
  async (localDate, thunkAPI) => {
    try {
      const response = await axios.post('/water/fullMonth', { localDate });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteWater = createAsyncThunk('water/delete', async id => {
  const response = await axios.delete(`/water/day/${id}`);
  return response.data;
});
export const addWater = createAsyncThunk(
  'water/add',
  async ({ localDate, localTime, waterValue }, thunkAPI) => {
    try {
      const response = await axios.post('/water/day', {
        localDate,
        localTime,
        waterValue,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const changeWater = createAsyncThunk(
  'water/change',
  async ({ localDate, localTime, _id, waterValue }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/day/${_id}`, {
        localDate,
        localTime,
        waterValue,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
