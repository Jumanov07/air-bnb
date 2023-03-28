import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import authSlice from './slices/auth.slice';
import { injectStore } from '../config/axios';
import announcementsSlice from './slices/announcements.slice';
import houseSlice from './slices/getHouseSlice';
import allHousingSlice from './slices/allHousingSlice';
import papularHouses from './slices/papularSlice';
import { profileSlice } from './slices/profilePageSlice';
import getLatesHouses from './slices/getLatesHouses';
import userInAdminSlice from './slices/userInAdminSlice';
import userProfileSlice from './slices/userProfileSlice';
import homeDetailSlice from './slices/homeDetail.slice';

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   houseData: houseSlice.reducer,
   [announcementsSlice.name]: announcementsSlice.reducer,
   allHousing: allHousingSlice.reducer,
   getPapularHouses: papularHouses.reducer,
   profileData: profileSlice.reducer,
   getLatesData: getLatesHouses.reducer,
   [userInAdminSlice.name]: userInAdminSlice.reducer,
   [userProfileSlice.name]: userProfileSlice.reducer,
   [homeDetailSlice.name]: homeDetailSlice.reducer,
});

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

injectStore(store);
export const persistor = persistStore(store);
export default store;
