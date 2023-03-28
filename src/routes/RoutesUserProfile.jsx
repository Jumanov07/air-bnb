import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TableUser from '../components/UI/TableUser';
import HomeUserDetails from '../components/userGetByIdHouses/HomeUserDetails';
import UserGetByHouses from '../components/userGetByIdHouses/UserGetByHouses';

function RoutesUserProfile() {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Navigate to="user" />} />
            <Route path="user" element={<TableUser />} />
            <Route path="user/:userId" element={<UserGetByHouses />} />
            <Route path="user/:userId/:homeId" element={<HomeUserDetails />} />
         </Routes>
      </div>
   );
}

export default RoutesUserProfile;
