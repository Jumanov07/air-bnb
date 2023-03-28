import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ roles, children, path }) => {
   const { role } = useSelector((state) => state.auth);
   if (!roles.includes(role)) {
      return <Navigate to={path} replace />;
   }
   return children || <Outlet />;
};
export default PrivateRoute;
