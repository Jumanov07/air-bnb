import React from 'react';
import { Box, styled } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

const UserLayout = () => {
   const location = useLocation();

   return (
      <>
         {location.pathname !== '/main' ? <Header /> : null}

         <Main>
            <Outlet />
         </Main>
         <Footer />
      </>
   );
};
const Main = styled(Box)(() => ({}));

export default UserLayout;
