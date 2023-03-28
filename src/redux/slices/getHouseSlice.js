import axiosInstance from '../../config/axios';
import { getAllFavorites } from './announcements.slice';

const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const initialState = {
   house: [],
   isLoading: true,
   error: null,
};

export const getHouseSlice = createAsyncThunk(
   'house/getHouseSlice',
   async ({ params }) => {
      try {
         const response = await axiosInstance(`houses/pagination`, { params });
         return response.data;
      } catch (error) {
         return console.log(error);
      }
   }
);

export const postFovoriteSlice = createAsyncThunk(
   'house/postFovoriteSlice',
   async function ({ id }, { dispatch }) {
      try {
         const response = axiosInstance.post(`favorite/${id}`);
         dispatch(getAllFavorites());
         return response.data.id;
      } catch (error) {
         return console.log(error.message);
      }
   }
);

const houseSlice = createSlice({
   name: 'house',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getHouseSlice.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getHouseSlice.fulfilled, (state, action) => {
            state.house = action.payload;
            state.isLoading = false;
         })
         .addCase(getHouseSlice.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            console.error(
               `An error occurred while fetching data from the server: ${state.error}`
            );
         });
   },
});

export default houseSlice;
