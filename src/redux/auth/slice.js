import { createSlice } from '@reduxjs/toolkit';
import {
  refreshUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  getAllUsers,
} from './operations';

function handleRefreshing(state) {
  state.loading = true;
  state.error = null;
}

function handleError(state, action) {
  state.waters.waterPerDay.waterRecord = [];
  state.error = action.payload;
  state.loading = false;
}

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
    loginUserSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.userInfo = user;
      localStorage.setItem('accessToken', token);
    },
  },
  extraReducers: builder =>
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        handleRefreshing;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        handleError;
      })
      .addCase(loginUser.pending, state => {
        handleRefreshing;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;

        localStorage.setItem('accessToken', action.payload.data.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        handleError;
      })
      .addCase(logoutUser.pending, state => {
        handleRefreshing;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.userInfo = null;
        state.token = null;
        localStorage.removeItem('accessToken');
      })
      .addCase(logoutUser.rejected, state => {
        state.isLoggedIn = false;
        state.userInfo = null;
        state.token = null;
        localStorage.removeItem('accessToken');
      })
      .addCase(refreshUser.pending, (state, action) => {
        handleRefreshing;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        handleError;
      })
      .addCase(updateUser.pending, state => {
        handleRefreshing;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        handleError;
      })

      .addCase(getAllUsers.pending, state => {
        handleRefreshing;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.countUsers = action.payload.totalRegisteredUsers;
        state.usersInfo = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        handleError;
      }),
});

export const { loginUserSuccess } = userSlice.actions;

export const userReducer = userSlice.reducer;
