import { Navigate } from 'react-router-dom';
import HomeDetail from '../../pages/user-pages/apartmant-detail/HomeDetail';
import AddAnnouncment from '../../components/announcment/AddAnnouncment';
import Edit from '../../components/Profile/Edit';
import ProfilePage from '../../components/Profile/ProfilePage';
import UserHome from '../../components/Profile/UserHome';
import Favorite from '../../pages/user-pages/favorite/Favorite';
import MainPage from '../../pages/user-pages/main';
import PrivateRoute from '../../routes/PrivateRoute';

export const pathuser = [
   {
      path: '/',
      element: <Navigate to="main" replace />,
   },
   {
      path: 'main',
      element: <MainPage />,
   },
   {
      path: 'main/region/:id',
      element: <HomeDetail />,
   },
   {
      path: 'main/profile/*',
      element: (
         <PrivateRoute path="main" roles="USER">
            <ProfilePage />
         </PrivateRoute>
      ),
   },
   {
      path: 'main/profile/:idHome',
      element: (
         <PrivateRoute path="main" roles="USER">
            <UserHome />
         </PrivateRoute>
      ),
   },
   {
      path: 'main/editanouncement=:id',
      element: (
         <PrivateRoute path="main" roles="USER">
            <div>EditUserCard </div>
         </PrivateRoute>
      ),
   },
   {
      path: 'main/favorite',
      element: (
         <PrivateRoute path="" roles="USER">
            <Favorite />
         </PrivateRoute>
      ),
   },
   {
      path: 'main/addannouncement',
      element: (
         <PrivateRoute path="main" roles="USER">
            <AddAnnouncment />
         </PrivateRoute>
      ),
   },
   {
      path: 'main/addannouncement/:id',
      element: (
         <PrivateRoute path="main" roles="USER">
            <Edit />
         </PrivateRoute>
      ),
   },
];
