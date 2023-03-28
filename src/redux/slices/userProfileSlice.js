import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../config/axios';

export const fetchUserProfile = createAsyncThunk(
   'dataUsers/fetchUserProfile',
   async (params) => {
      try {
         const response = await axiosInstance('users/profile', { params });
         return response.data;
      } catch (error) {
         return { errorMessage: error.message };
      }
   }
);

export const deleteUserHomeProfile = createAsyncThunk(
   'dataUsers/deleteUserHomeProfile',
   async (idHome) => {
      try {
         const response = await axiosInstance.delete(`houses/${idHome}`);
         return response.data;
      } catch (error) {
         return { errorMessage: error.message };
      }
   }
);

export const fetchHomeDetails = createAsyncThunk(
   'homeDetails/fetchHomeDetails',
   async (params) => {
      try {
         const response = await axiosInstance.get(
            `houses/announcement/${params}`
         );
         return response.data;
      } catch (error) {
         return { errorMessage: error.message };
      }
   }
);

export const blockAllHouse = createAsyncThunk(
   'blockAllHouse',
   async (params) => {
      try {
         const response = await axiosInstance.post(`users/${params}`);
         toast.success(response.data.message);
         return response;
      } catch (error) {
         return error.message;
      }
   }
);

export const unBlockHouse = createAsyncThunk(
   'unBlockHouse',
   async ({ params }) => {
      try {
         const response = await axiosInstance.post(
            `houses/changeStatusOfHouse/${params.houseId}`,
            {},
            { params: { housesStatus: params.housesStatus } }
         );
         toast.success(response.data.message);

         return response.data.message;
      } catch (error) {
         toast.error(error.message);
         return error.message;
      }
   }
);

const initialState = {
   dataUsers: [],
   homeDetails: [],
   status: '',
};

const userProfileSlice = createSlice({
   name: 'userProfile',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
         state.dataUsers = action.payload;
         state.status = action.payload.message;
      });
      builder.addCase(fetchUserProfile.pending, (state) => {
         state.status = 'pending';
      });
      builder.addCase(fetchUserProfile.rejected, (state, action) => {
         state.status = action.payload.errorMessage;
      });
      builder.addCase(deleteUserHomeProfile.fulfilled, (state, action) => {
         state.status = action.payload.message;
      });
      builder.addCase(deleteUserHomeProfile.rejected, (state) => {
         state.status = 'failed';
      });

      builder.addCase(fetchHomeDetails.fulfilled, (state, action) => {
         state.homeDetails = action.payload;
      });
      builder.addCase(fetchHomeDetails.rejected, (state, action) => {
         state.status = action.payload.errorMessage;
      });
      builder.addCase(blockAllHouse.fulfilled, (state, action) => {
         toast.success(action.payload.message);
      });
      builder.addCase(blockAllHouse.rejected, (state, action) => {
         toast.error(action.payload.errorMessage);
      });
      builder.addCase(unBlockHouse.fulfilled, (state, action) => {
         toast.success(action.payload.message);
      });
      builder.addCase(unBlockHouse.rejected, (state, action) => {
         toast.error(action.payload.message);
      });
   },
});

export const userProfileAction = userProfileSlice.actions;
export default userProfileSlice;
