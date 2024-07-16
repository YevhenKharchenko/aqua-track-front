import { createSlice } from '@reduxjs/toolkit';
import { refreshUser, loginUser, logoutUser, registerUser, updateUser } from './operations';

export const initialState = {
  userInfo: {
    email: null,
    name: null,
    gender: null,
    avatar: null,
    weight: null,
    sportsActivity: null,
    waterRate: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(registerUser.fulfilled, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;

        localStorage.setItem('accessToken', action.payload.data.accessToken);
        state.userInfo = action.payload.user;
        state.token = action.payload.data.accessToken;
      })

      .addCase(logoutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.userInfo = null;
        state.token = null;
        localStorage.setItem('accessToken', '');
      })

      .addCase(refreshUser.pending, (state, action) => {
        state.isRefreshing = true;
      })

      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;

        state.token = action.payload.data.accessToken;
        localStorage.setItem('accessToken', action.payload.data.accessToken);

        state.userInfo.email = action.payload.user.email;
        state.userInfo.name = action.payload.user.name;
        state.userInfo.gender = action.payload.user.gender;
        state.userInfo.avatar = action.payload.user.avatarUrl;
        state.userInfo.weight = action.payload.user.weight;
        state.userInfo.sportsActivity = action.payload.user.sportsActivity;
        state.userInfo.waterRate = action.payload.user.waterRate;
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
        state.userInfo.sportsActivity = action.payload.sportsActivity;
        state.userInfo.waterRate = action.payload.waterRate;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(refreshUser.rejected, state => {}),
});

export const {
  ///////
} = userSlice.actions;

export const userReducer = userSlice.reducer;
