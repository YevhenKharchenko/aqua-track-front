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

function handleRefreshing(state) {
  state.isRefreshing = true;
  state.error = false;
}

function handleError(state, action) {
  state.isRefreshing = false;
  state.error = action.payload;
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
  error: false,
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
      // .addCase(registerUser.pending, handleRefreshing)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
      })
      // .addCase(registerUser.rejected, handleError)
      .addCase(loginUser.pending, handleRefreshing)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;

        localStorage.setItem('accessToken', action.payload.data.accessToken);
      })
      .addCase(loginUser.rejected, handleError)
      .addCase(logoutUser.pending, handleRefreshing)
      .addCase(logoutUser.fulfilled, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.userInfo = null;
        state.token = null;
        localStorage.removeItem('accessToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.userInfo = null;
        state.token = null;
        localStorage.removeItem('accessToken');
        state.error = action.payload;
      })
      // .addCase(refreshUser.pending, handleRefreshing)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload;
      })
      .addCase(refreshUser.rejected, handleError)
      .addCase(updateUser.pending, handleRefreshing)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload.data;
        state.error = false;
      })
      .addCase(updateUser.rejected, handleError)
      // .addCase(getAllUsers.pending, handleRefreshing)
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.countUsers = action.payload.totalRegisteredUsers;
        state.usersInfo = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(loginUserGoogle.pending, state => {
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
  // .addCase(getAllUsers.rejected, handleError),
});

export const { loginUserSuccess } = userSlice.actions;

export const userReducer = userSlice.reducer;
