import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axios';

export const fetchTableUser = createAsyncThunk(
   'users/fetchUsers',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('users/all');
         const data = response;
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

export const deleteUser = createAsyncThunk(
   'user/deleteUser',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(`users/${id}`);
         const { data } = response;
         dispatch(fetchTableUser());
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

const initialState = {
   users: [],
   isLoading: false,
   error: '',
   status: '',
};

const userInAdminSlice = createSlice({
   name: 'userInAdmin',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchTableUser.fulfilled, (state, { payload }) => {
         state.users = payload.data;
         state.isLoading = false;
      });
      builder.addCase(fetchTableUser.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(fetchTableUser.rejected, (state, action) => {
         state.error = action.error.message;
         state.isLoading = false;
      });
      builder.addCase(deleteUser.fulfilled, (state, action) => {
         state.status = action.payload.message;
      });
      builder.addCase(deleteUser.pending, (state) => {
         state.status = 'loading';
      });
      builder.addCase(deleteUser.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.error.message;
      });
   },
});

export const userInAdminActions = userInAdminSlice.actions;

export default userInAdminSlice;
