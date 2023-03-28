import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axios';

const initialState = {
   lastestData: [],
};

export const getLastesData = createAsyncThunk(
   'lastestData/getLastesData',
   async () => {
      const response = axiosInstance(
         `houses/popularAndLatest?popularHouse=${true}&popularApartment=${true}`
      );
      return (await response).data;
   }
);

const getLatesHouses = createSlice({
   name: 'lastestData',
   initialState,
   extraReducers: (builder) => {
      builder.addCase(getLastesData.fulfilled, (state, action) => {
         state.lastestData = action.payload;
      });
   },
});

export default getLatesHouses;
