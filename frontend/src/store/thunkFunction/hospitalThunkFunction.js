import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

const fetchHospital = createAsyncThunk(
  'hospital/fetchHospital',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/map');

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

const fetchReviewList = createAsyncThunk(
  'hospital/fetchReviewList',
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/review');

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export { fetchHospital };
