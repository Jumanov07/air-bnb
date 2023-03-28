import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axiosInstance from '../../config/axios';

export const getDetailOfHouse = createAsyncThunk(
   'homeDetail/getDetailOfHouse',
   async (params) => {
      try {
         const response = await axiosInstance(`houses/announcement/${params}`);
         const { data } = response;
         return data;
      } catch (error) {
         return console.log(error.message);
      }
   }
);

export const postCheckInAndCheckOut = createAsyncThunk(
   `homeDetail/postCheckInAndCheckOut`,
   async (params) => {
      try {
         const response = await axiosInstance.post(`bookings/houses/${params}`);
         return response.data;
      } catch (error) {
         throw new Error();
      }
   }
);

export const likeAndDislike = createAsyncThunk(
   `homeDetail/likeAndDislike`,
   async (params, { dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `feedback/update/${params.id}`,
            { like: 1, dislike: 1 },
            { params: { like: params.like, dislike: params.dislike } }
         );

         dispatch(getDetailOfHouse(params.getId));

         return response.data;
      } catch (error) {
         throw new Error();
      }
   }
);

export const postPriceAndDate = createAsyncThunk(
   `homeDetail/postPriceAndDate`,
   async (params) => {
      try {
         const response = await axiosInstance.post('payments/charge', {
            amount: params.amount,
            currency: params.currency,
            token: params.token,
         });

         toast.success(response.data.message);

         return response.data;
      } catch (error) {
         toast.error(error.message);
         throw new Error();
      }
   }
);

export const feedbacks = createAsyncThunk(
   `homeDetail/feedbacks`,
   async ({ image, id, text, rating }) => {
      try {
         const response = await axiosInstance.post(`feedback/${id}`, {
            text,
            rating,
            image,
         });

         toast.success(response.data.message);

         return response.data;
      } catch (error) {
         throw new Error();
      }
   }
);

const initialState = {
   pageData: [],
   isLoading: null,
};
const homeDetailSlice = createSlice({
   name: 'homeDetail',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getDetailOfHouse.fulfilled, (state, action) => {
         state.pageData = action.payload;
      });
      builder.addCase(getDetailOfHouse.rejected, (state, action) => {
         state.status = action.payload.massage;
      });
      builder.addCase(postPriceAndDate.fulfilled, (action) => {
         toast.success(action.payload.message);
      });
      builder.addCase(postPriceAndDate.rejected, (action) => {
         toast.error(action.payload.errorMessage);
      });
      builder.addCase(postPriceAndDate.pending, (state) => {
         state.isLoading = 'pending';
      });
      builder.addCase(feedbacks.rejected, (action) => {
         toast.error(action.payload.errorMessage);
      });
   },
});
export const homeDetailActions = homeDetailSlice.actions;
export default homeDetailSlice;
