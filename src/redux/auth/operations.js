import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

axios.defaults.baseURL = 'https://project6-back.onrender.com';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  // const token = store.getState().user.token;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// axios.interceptors.response.use(
//   res => res,
//   async err => {
//     const originalRequest = err.config;

//     if (err.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post('/users/refresh');

//         setAuthHeader(res.data.accessToken);

//         localStorage.setItem('accessToken', res.data.accessToken);
//         originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

//         return axios(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem('accessToken');
//         clearAuthHeader();
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(err);
//   }
// );

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post('/users/register', { email, password });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const res = await axios.post('/users/login', { email, password });

    setAuthHeader(res.data.accessToken);

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const res = await axios.post('/users/logout');
    clearAuthHeader();
    localStorage.removeItem('accessToken');
    toast.success('You are successfully logged out!', {
      autoClose: 5000,
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  // const persistedToken = localStorage.getItem('refreshToken');
  // if (persistedToken === null) {
  //   return thunkAPI.rejectWithValue('Unable to fetch user');
  // }
  // try {
  //   const res = await axios.post('/users/refresh', {
  //     refreshToken: persistedToken,
  //     withCredentials: true,
  //   });
  //   setAuthHeader(res.data.accessToken);
  //   return res.data;
  // } catch (e) {
  //   localStorage.setItem('refreshToken', '');
  //   return thunkAPI.rejectWithValue(e.message);
  // }

  try {
    const persistedToken = localStorage.getItem('accessToken');

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    setAuthHeader(persistedToken);

    const res = await axios.get('/users/current-user-data');

    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk('auth/update', async (data, thunkAPI) => {
  try {
    const res = await axios.patch('/users/update', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getAllUsers = createAsyncThunk('auth/getAllUsers', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/users/registered-users');

    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
