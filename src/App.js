import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
   const { role } = useSelector((store) => store.auth);
   const nav = useNavigate();
   useEffect(() => {
      if (role === 'ADMIN') {
         nav('/application');
      }
   }, [role]);

   return <AppRoutes />;
}
export default App;
