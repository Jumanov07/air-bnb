import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axiosInstance from '../../config/axios';
import { auth } from '../../config/firebase';
import { LOGIN_INFO_LS_KEY } from '../../utils/constants/general';

export const signInViaGoogleRequest = createAsyncThunk(
   'auth/signInViaGoogleRequest',
   async (_, { dispatch }) => {
      try {
         const provider = new GoogleAuthProvider();
         const response = await signInWithPopup(auth, provider);
         const idToken = await response.user.getIdToken();
         const responseFromBase = await axiosInstance.post(
            'auth/google',
            {},
            {
               params: {
                  tokenId: idToken,
               },
            }
         );

         const result = responseFromBase.data;

         if (result?.jwtToken) {
            localStorage.setItem(LOGIN_INFO_LS_KEY, JSON.stringify(result));
            dispatch(authActions.setCredentials(result));
            const profileLogo = response.user.photoURL;
            localStorage.setItem('PROFILE_LOGO', profileLogo);
         }
         return result;
      } catch (error) {
         return error;
      }
   }
);

export const signInRequest = createAsyncThunk(
   'auth/signInRequest',
   async (credentials, { dispatch }) => {
      try {
         const response = await axiosInstance.post('auth/login', credentials);
         const result = response.data;
         if (result && result.jwtToken) {
            localStorage.setItem(LOGIN_INFO_LS_KEY, JSON.stringify(result));
            dispatch(authActions.setCredentials(result));
         }
         return result;
      } catch (error) {
         return error;
      }
   }
);

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      token: null,
      user: null,
      isAuthorized: false,
      role: null,
   },
   reducers: {
      setCredentials: (state, action) => {
         const credentials = action.payload;
         state.isAuthorized = true;
         state.token = credentials.jwtToken;
         state.role = credentials.authorities;
         state.user = credentials.email;
      },
      logOut: (state) => {
         state.isAuthorized = null;
         state.role = null;
         state.token = null;
         state.user = null;
      },
   },
});
export default authSlice;

export const authActions = authSlice.actions;
