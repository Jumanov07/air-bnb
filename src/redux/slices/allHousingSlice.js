import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axios';

const initialState = {
   data: [],
   loading: true,
};

export const getAllHousingDate = createAsyncThunk(
   'getHausingSlice/getAllHousingDate',

   async ({ params }) => {
      try {
         const response = axiosInstance(`houses/allHousing`, { params });
         return (await response).data;
      } catch (error) {
         return console.error(error, 'error is from slice');
      }
   }
);

const allHousingSlice = createSlice({
   name: 'getHausingSlice',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllHousingDate.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(getAllHousingDate.fulfilled, (state, action) => {
         state.data = action.payload;
         state.loading = false;
      });
   },
});
export default allHousingSlice;
