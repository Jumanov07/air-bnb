/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../config/axios';

export const getAllFavorites = createAsyncThunk(
   'announcements/getAllFavorites',
   async () => {
      try {
         const response = await axiosInstance('favorite');
         return response.data;
      } catch (error) {
         return error;
      }
   }
);
// application Admin//
export const getAllApplication = createAsyncThunk(
   'application/getAllApplication',
   async (params) => {
      try {
         const response = await axiosInstance.get(
            'houses/announcementForAdmin',
            { params }
         );
         return response.data;
      } catch (error) {
         throw new Error();
      }
   }
);

export const applicationAccept = createAsyncThunk(
   'acceptHouse',
   async ({ paramsAccept }) => {
      try {
         const response = await axiosInstance.post(
            `houses/changeStatusOfHouse/${paramsAccept.houseId}`,
            {},
            { params: { housesStatus: paramsAccept.housesStatus } }
         );
         toast.success(response.data.message);
      } catch (error) {
         console.log(error.message);
      }
   }
);

export const applicationReject = createAsyncThunk(
   'rejectHouse',
   async ({ data }) => {
      try {
         const response = await axiosInstance.post(
            `houses/changeStatusOfHouse/${data.id}`,
            {},
            {
               params: {
                  message: data.valueTextTarea,
                  housesStatus: data.housesStatus,
               },
            }
         );
         toast.success(response.data.message);
      } catch (error) {
         console.log(error.message);
      }
   }
);

export const deleteApplicationHome = createAsyncThunk(
   'deleteHomeApplicaton',
   async (id) => {
      try {
         const response = await axiosInstance.delete(`houses/${id}`);
         toast.success(response.data.message);
      } catch (error) {
         console.log(error.errorMessage);
      }
   }
);
// application//
// fetchHomeDatails//\
export const fetchHomeApplicationDatails = createAsyncThunk(
   'fetchHomeApplicationDatails',
   async (id) => {
      try {
         const response = await axiosInstance.get(`houses/announcement/${id}`);
         return response.data;
      } catch (error) {
         toast.error(error.message);
      }
   }
);

export const applicationDatailsReject = createAsyncThunk(
   'rejectHouse',
   async ({ data }) => {
      try {
         const response = await axiosInstance.post(
            `houses/changeStatusOfHouse/${data.id}`,
            {},
            {
               params: {
                  message: data.valueTextTarea,
                  housesStatus: data.housesStatus,
               },
            }
         );
         toast.success(response.data.message);
      } catch (error) {
         console.log(error.message);
      }
   }
);

export const applicationDatailsAccept = createAsyncThunk(
   'applicationDatailsAccept',
   async ({ paramsAccept }) => {
      try {
         const response = await axiosInstance.post(
            `houses/changeStatusOfHouse/${paramsAccept.houseId}`,
            {},
            { params: { housesStatus: paramsAccept.housesStatus } }
         );
         toast.success(response.data.message);
      } catch (error) {
         console.log(error.message);
      }
   }
);

// HOmeDatails
const postImagesRequest = createAsyncThunk(
   'announcements/postImagesRequest',
   async (images) => {
      try {
         const formData = new FormData();
         const imageRequests = images.map((image) => {
            formData.set('file', image);
            return fetch(
               'http://ec2-3-67-201-139.eu-central-1.compute.amazonaws.com/api/file',
               {
                  method: 'POST',
                  body: formData,
               }
            );
         });
         const response = await Promise.all(imageRequests);
         const result = await Promise.all(response.map((r) => r.json()));
         return result;
      } catch (e) {
         throw new Error(e);
      }
   }
);

export const addAnnouncmentRequest = createAsyncThunk(
   'announcements/addAnnouncmentRequest',
   async ({ announcement, images = [] }, { dispatch }) => {
      try {
         const response = await dispatch(postImagesRequest(images))
            .unwrap()
            .then((images) => {
               return axiosInstance.post('/houses', {
                  ...announcement,
                  images: images.map((image) => image.link),
               });
            });
         return response;
      } catch (e) {
         return e;
      }
   }
);

const initialState = {
   favorites: [],
   applications: [],
   houseApplication: [],
};

const announcementsSlice = createSlice({
   name: 'announcements',
   initialState,
   extraReducers: {
      [getAllFavorites.pending]: (state) => {
         state.status = 'pending';
      },
      [getAllFavorites.rejected]: (state) => {
         state.status = 'rejected';
      },
      [getAllFavorites.fulfilled]: (state, action) => {
         state.favorites = action.payload;
      },
      [getAllApplication.fulfilled]: (state, action) => {
         state.applications = action.payload;
      },
      [fetchHomeApplicationDatails.fulfilled]: (state, action) => {
         state.houseApplication = action.payload;
      },
   },
});

export const announcementsActions = announcementsSlice.actions;

export default announcementsSlice;
