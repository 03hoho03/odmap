import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const NotAuthRoutes = ({ isAuth }) => {
  return isAuth ? <Navigate to='/' /> : <Outlet />;
};

export default NotAuthRoutes;
