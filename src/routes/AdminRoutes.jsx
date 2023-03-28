import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import TableUser from '../components/UI/TableUser';
import HomeUserDetails from '../components/userGetByIdHouses/HomeUserDetails';
import UserGetByHouses from '../components/userGetByIdHouses/UserGetByHouses';
import AdminLayout from '../layout/admin-layout/AdminLayout';
import AllHousing from '../pages/admin-all-housing/AllHousing';
import ApplicationAdmin from '../pages/admin-pagas/ApplicationAdmin';
import ApplicationHomeDatails from '../pages/admin-pagas/ApplicationHomeDatails';

const pathadmin = [
   {
      path: 'application',
      element: <ApplicationAdmin />,
   },
   {
      path: 'application/:idAdmin',
      element: <ApplicationHomeDatails />,
   },
   {
      path: 'users',
      element: <TableUser />,
   },
   {
      path: 'users/:userId/*',
      element: <UserGetByHouses />,
   },
   {
      path: 'users/:userId/:homeId',
      element: <HomeUserDetails />,
   },
   {
      path: 'all-housing',
      element: <AllHousing />,
   },
];
const AdminRoute = () => {
   return (
      <Routes>
         <Route path="/" element={<Navigate to="/application" />} />
         <Route path="/" element={<AdminLayout />}>
            {pathadmin.map((i) => (
               <Route path={i.path} key={i.path} element={i.element} />
            ))}
         </Route>
      </Routes>
   );
};
export default AdminRoute;
