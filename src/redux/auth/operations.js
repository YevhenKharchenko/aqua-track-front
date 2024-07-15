import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const SetAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const ClearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

axios.defaults.baseURL = "https://project6-back.onrender.com"; //адрес бк


axios.interceptors.response.use(res => res, async (err) => {
  const originalRequest = err.config;

  if (err.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken.length > 0) {
      try {
        const res = await axios.post("/users/refresh", { refreshToken });

        SetAuthHeader(res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.setItem("refreshToken", "");
        ClearAuthHeader();
        return Promise.reject(refreshError);
      }
    }
  }
  return Promise.reject(err);
});


export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post("/users/register", { email, password });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", { email, password });

      SetAuthHeader(res.data.accessToken);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      
      const res = await axios.post("users/logout");
     
      ClearAuthHeader();
      toast.success("You are successfully logged out!", {
  autoClose: 5000
})
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    ///////////////////
    const persistedToken = localStorage.getItem("refreshToken");

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      const res = await axios.post("/users/refresh", {
        refreshToken: persistedToken,
      });

      SetAuthHeader(res.data.accessToken);

      return res.data;
    } catch (e) {
      localStorage.setItem("refreshToken", "");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/update",
  async (data, thunkAPI) => {
    try {
      const res = await axios.put("users/update", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);