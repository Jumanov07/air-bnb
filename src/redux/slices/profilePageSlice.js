import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axios';

export const getProjects = createAsyncThunk(
   'users/getProjects',
   async (params) => {
      try {
         const response = axiosInstance.get('/users', { params });
         return (await response).data;
      } catch (error) {
         throw new Error(error.message);
      }
   }
);

export const deleteItem = createAsyncThunk(
   'users/deleteItem',
   async (params, { dispatch }) => {
      try {
         const response = await axiosInstance.delete(`/houses/${params.id}`);
         dispatch(getProjects({ ...params.params }));
         return response.data;
      } catch (error) {
         throw new Error(error.message);
      }
   }
);

export const getUserData = createAsyncThunk('users/getUsrData', async (id) => {
   try {
      const response = await axiosInstance.get(`/houses/announcement/${id}`);
      console.log(response, 'shalmkil');
      return (await response).data;
   } catch (error) {
      return error;
   }
});

export const updateUserData = createAsyncThunk(
   'users/updateUserData',
   async (params) => {
      try {
         const response = await axiosInstance.put(
            `/houses/${params.id}`,
            params.data
         );
         const result = await response.data;
         return result;
      } catch (error) {
         return error;
      }
   }
);
export const fetchHomeUserDetails = createAsyncThunk(
   'homeDetails/fetchHomeDetails',
   async (params) => {
      console.log(params, 'abau');
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
export const profileSlice = createSlice({
   name: 'users',
   initialState: {
      userData: {},
      data: [],
      homeDetails: [],
      isLoading: null,
      error: null,
   },
   reducers: {},
   extraReducers: {
      [getProjects.pending]: (state) => {
         state.isLoading = 'loading';
      },
      [getProjects.fulfilled]: (state, action) => {
         state.isLoading = 'succeeded';
         state.data = action.payload;
      },
      [getProjects.rejected]: (state, action) => {
         state.isLoading = 'failed';
         state.error = action.error.message;
      },
      [getUserData.fulfilled]: (state, action) => {
         state.isLoading = 'succeeded';
         state.userData = action.payload;
      },
      [fetchHomeUserDetails.fulfilled]: (state, action) => {
         state.isLoading = 'succeeded';
         state.homeDetails = action.payload;
      },
   },
});
export const profile = profileSlice.actions;
export default profileSlice;
