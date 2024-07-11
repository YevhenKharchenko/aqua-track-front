import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../auth/operations.js';
import { getUnixDay } from "../../helpers/getUnixDay.js";

export const addWater = createAsyncThunk(
  'water/addWater',
  async (water, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/water/add', water);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/water/remove/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const putWater = createAsyncThunk(
  'water/putWater',
  async ([id, putedWater], thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/water/edit/${id}`, putedWater);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getDayWater = createAsyncThunk(
  'water/getDayWater',
  async (date, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/water/day/${date}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMonthWater = createAsyncThunk(
  'water/getMonthWater',

  async (month, thunkAPI) => {
    try {
      const unixMonthStartDate = getUnixDay(month);
      const response = await axiosInstance.get(
        `/water/month/${unixMonthStartDate}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTodaySumamryWater = createAsyncThunk(
  'water/getTodaySummaryWater',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/water/today');
      const res = (response.data.todaySumamryWater / 1000).toFixed(1);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);