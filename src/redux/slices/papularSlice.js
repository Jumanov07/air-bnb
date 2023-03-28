import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axios';

const initialState = {
   dataHouses: [],
};

export const getPapularHouses = createAsyncThunk(
   'papularHouses/getPapularHouses',
   async () => {
      const response = axiosInstance(
         `houses/popularAndLatest?popularHouse=${true}&popularApartment=${true}`
      );
      return (await response).data;
   }
);
const papularHouses = createSlice({
   name: 'papularHouses',
   initialState,
   extraReducers: (builder) => {
      builder.addCase(getPapularHouses.fulfilled, (state, action) => {
         state.dataHouses = action.payload;
      });
   },
});

export default papularHouses;
