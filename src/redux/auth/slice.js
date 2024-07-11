import { createSlice } from '@reduxjs/toolkit';
import {
  signIn,
  signOut,
  signUp,
  current,
  currentEdit,
  fetchUserCount,
  changePassword,
  resetPasswordSendMail,
  checkResetToken,
  resetPassword,
} from './operations.js';
import toast from 'react-hot-toast';

const initialState = {
  user: {
    _id: null,
    name: null,
    email: null,
    avatarURL: null,
    gender: null,
    weight: null,
    activityTime: null,
    desiredVolume: null,
    createdAt: null,
    updatedAt: null,
  },
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  isResendVerify: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        toast.success(
          'Check your email. Verification link has been sent to your email!',
          {
            duration: 5000,
            position: 'top-center',
            style: {
              textAlign: 'center',
              boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
            },
          }
        );
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = false;
        toast.error('Request is invalid or email already taken', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loading = false;
        state.isLoggedIn = true;
        toast.success('Logged in successfully!', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;

        if (action.payload === 'Please, verify your email') {
          state.isResendVerify = true;
          toast.error('Please, verify your email.', {
            duration: 5000,
            position: 'top-center',
            style: {
              textAlign: 'center',
              boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
            },
          });
        } else
          toast.error('Email or password is wrong.', {
            duration: 5000,
            position: 'top-center',
            style: {
              textAlign: 'center',
              boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
            },
          });
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = {
          _id: null,
          name: null,
          email: null,
          avatarURL: null,
          gender: null,
          weight: null,
          activityTime: null,
          desiredVolume: null,
          createdAt: null,
          updatedAt: null,
        };
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.loading = false;
        toast.success('Logged out successfully!', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(current.pending, (state) => {
        state.isRefreshing = true;
        state.loading = true;
      })
      .addCase(current.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.loading = false;
      })
      .addCase(current.rejected, (state) => {
        state.isRefreshing = false;
        state.loading = false;
      })
      .addCase(currentEdit.pending, (state) => {
        state.loading = true;
      })
      .addCase(currentEdit.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        toast.success('Updated profile successfully!', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(currentEdit.rejected, (state) => {
        state.loading = false;
        toast.error('Failed to update profile.', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(fetchUserCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCount.fulfilled, (state, action) => {
        state.count = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        toast.success('Password successfully updated!', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(changePassword.rejected, (state) => {
        state.loading = false;
        toast.error('Failed to update password. ', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(resetPasswordSendMail.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(resetPasswordSendMail.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(resetPasswordSendMail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(checkResetToken.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(checkResetToken.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(checkResetToken.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        toast.success('Password successfully updated! You can log in now.', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
        state.error = true;
        toast.error('Failed to update password. Try again...', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      }),
});

export const { refreshTokens } = authSlice.actions;

export const authReducer = authSlice.reducer;