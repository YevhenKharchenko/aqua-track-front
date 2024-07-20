import { createSlice } from '@reduxjs/toolkit';
import {
  refreshUser,
  loginUser,
  logoutUser,
  // registerUser,
  updateUser,
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
    waterNorma: 1.5,
  },
  token: localStorage.getItem('accessToken') || null,
  isLoggedIn: false,
  isRefreshing: false,
  error: '',
  countUsers: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // loginUserSuccess: (state, action) => {
    //   state.isLoggedIn = true;
    //   state.token = action.payload;
    //   state.isRefreshing = false;
    // },
  },
  extraReducers: builder =>
    builder
      // .addCase(registerUser.fulfilled, (state, action) => {})
      .addCase(loginUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;

        localStorage.setItem('accessToken', action.payload.data.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.userInfo = null;
        state.token = null;
        localStorage.removeItem('accessToken');
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload;
      })
      .addCase(updateUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })

      .addCase(getAllUsers.pending, state => {
        state.error = '';
        state.isRefreshing = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        // state.countUsers = action.payload;
        state.isRefreshing = false;
        state.userInfo = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      }),
});

export const { loginUserSuccess } = userSlice.actions;

export const userReducer = userSlice.reducer;
