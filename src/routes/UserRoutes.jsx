import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/UI/NotFound';
import UserLayout from '../layout/user-layout/UserLayout';
import InnerRegionPage from '../pages/inner-page-region/InnerRegionPage';
<<<<<<< HEAD
import NotFoundPage from '../pages/notFound/NotFoundPage';
=======
>>>>>>> 27ed9a32a7496998a0ab776084995f034e112251
import { pathuser } from '../utils/constants/routes';

function UserRoutes() {
   const { user } = useSelector((state) => state.auth);
<<<<<<< HEAD

=======
>>>>>>> 27ed9a32a7496998a0ab776084995f034e112251
   return (
      <Routes>
         <Route path="/main/region" element={<InnerRegionPage />} />
         <Route path="/" element={<UserLayout />}>
            {pathuser.map((i) => (
               <Route path={i.path} element={i.element} key={i.path} />
            ))}
         </Route>
         {user !== 'ADMIN' ? <Route path="*" element={<NotFound />} /> : null}
      </Routes>
   );
}
export default UserRoutes;
