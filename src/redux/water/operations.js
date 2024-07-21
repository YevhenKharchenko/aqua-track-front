import axios from 'axios';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { formatDateForAddOrEditWater } from '../../helpers/formatDateForAddOrEditWater.js';

export const fetchWaterPerDay = createAsyncThunk(
  'waterPerDay/fetch',
  async (localDate, thunkAPI) => {
    try {
      const response = await axios.get(`/water/day/${localDate}`);

      if (!Array.isArray(response.data)) {
        toast.error('Water records not found for this day!', {
          autoClose: 5000,
        });

        return;
      }

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
      const response = await axios.get(`/water/month/${localDate}`);

      if (!Array.isArray(response.data)) return;

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk('water/delete', async id => {
  console.log(id);
  const response = await axios.delete(`/water/remove/${id}`);
  console.log(response.data._id);

  return response.data;
});

export const addWater = createAsyncThunk(
  'water/add',
  async ({ localDate, localTime: time, waterValue: amount }, thunkAPI) => {
    const date = formatDateForAddOrEditWater(localDate);
    console.log(date);
    try {
      const response = await axios.post('/water/add', {
        date,
        time,
        amount,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeWater = createAsyncThunk(
  'water/change',
  async ({ localDate, localTime: time, _id, waterValue: amount }, thunkAPI) => {
    const date = formatDateForAddOrEditWater(localDate);

    console.log(date);

    try {
      const response = await axios.patch(`/water/edit/${_id}`, {
        date,
        time,
        amount,
      });
      console.log(response.data._id);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
