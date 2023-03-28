import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axios';

export const getAllFavoriteCard = createAsyncThunk(
   'estimationAndLike/getAllFavoriteCard',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance('favorite');
         return response.data;
      } catch (error) {
         if (rejectWithValue) {
            throw error;
         }
         return error;
      }
   }
);

const initialState = {
   card: [],
   status: false,
};

const estimationAndLikeSlice = createSlice({
   name: 'estimationAndLike',
   initialState,
   extraReducers: {
      [getAllFavoriteCard.pending]: (state) => {
         state.status = 'pending';
      },
      [getAllFavoriteCard.rejected]: (state) => {
         state.status = 'rejected';
      },
      [getAllFavoriteCard.fulfilled]: (state, action) => {
         console.log(action.payload);
         state.card = action.payload;
      },
   },
});

export default estimationAndLikeSlice;
