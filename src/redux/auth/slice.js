import { createSlice } from '@reduxjs/toolkit';
import {
  refreshUser,
  loginUser,
  logoutUser,
  registerUser,
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
    // loginUserSuccess: (state, action) => {
    //   state.isLoggedIn = true;
    //   state.token = action.payload;
    //   state.isRefreshing = false;
    // },
  },
  extraReducers: builder =>
    builder
      .addCase(registerUser.fulfilled, (state, action) => {})
      .addCase(loginUser.pending, (state, action) => {
        state.isRefreshing = true;
      })
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
        state.userInfo = action.payload;
      })
      .addCase(updateUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = '';
        state.isRefreshing = false;

        state.userInfo = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      })

      .addCase(getAllUsers.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isRefreshing = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      }),
});

export const { loginUserSuccess } = userSlice.actions;

export const userReducer = userSlice.reducer;
