import { createSlice } from '@reduxjs/toolkit';
import {
  refreshUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  getAllUsers,
  loginUserGoogle,
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
  usersInfo: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // loginUserSuccess: (state, action) => {
    //   const { token, user } = action.payload;
    //   state.isLoggedIn = true;
    //   state.token = token;
    //   state.userInfo = user;
    //   localStorage.setItem('accessToken', token);
    // },
  },
  extraReducers: builder =>
    builder
      .addCase(registerUser.fulfilled, (state, action) => {})
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
        state.isRefreshing = false;
        state.countUsers = action.payload.totalRegisteredUsers;
        state.usersInfo = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(loginUserGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = localStorage.getItem('accessToken');
        state.userInfo = action.payload;
      })
      .addCase(loginUserGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const { loginUserSuccess } = userSlice.actions;

export const userReducer = userSlice.reducer;
