import { createSlice } from '@reduxjs/toolkit';
import {
  refreshUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  getCurrentUser,
  getAllUsers,
} from './operations';

export const initialState = {
  userInfo: {
    email: null,
    name: null,
    gender: null,
    avatar: null,
    weight: null,
    sportTime: null,
    waterNorma: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUserSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(registerUser.fulfilled, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;

        state.token = action.payload.data.accessToken;
        localStorage.setItem('accessToken', action.payload.data.accessToken);

        state.userInfo = action.payload.user;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.userInfo = null;
        state.token = null;
        localStorage.setItem('accessToken', '');
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;

        state.token = action.payload.data.accessToken;
        localStorage.setItem('accessToken', action.payload.data.accessToken);

        state.userInfo = action.payload.user;
      })
      .addCase(updateUser.pending, state => {
        // ТУТ  ЛОАДЕР;
        state.isRefreshing = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = '';
        state.isRefreshing = false;

        state.userInfo.email = action.payload.email;
        state.userInfo.name = action.payload.name;
        state.userInfo.gender = action.payload.gender;
        state.userInfo.avatar = action.payload.avatarUrl;
        state.userInfo.weight = action.payload.weight;
        state.userInfo.sportTime = action.payload.sportsActivity;
        state.userInfo.waterNorma = action.payload.waterRate;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getCurrentUser.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        console.log(JSON.parse(JSON.stringify(state.userInfo)));
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {})
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
      }),
});

export const { loginUserSuccess } = userSlice.actions;

export const userReducer = userSlice.reducer;
