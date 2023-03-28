import React from 'react';
import { useSelector } from 'react-redux';
import AdminRoute from './AdminRoutes';
import UserRoutes from './UserRoutes';

function AppRoutes() {
   const { role } = useSelector((state) => state.auth);

   return <div>{role === 'ADMIN' ? <AdminRoute /> : <UserRoutes />}</div>;
}

export default AppRoutes;
