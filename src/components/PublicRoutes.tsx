import React from 'react';
import { RouteProps, Outlet, Navigate } from 'react-router-dom';

export const PublicRoutes = ({ children, ...rest }: RouteProps): JSX.Element => {
  const userData = localStorage.getItem('userData');

  return userData ?  <Navigate to={{ pathname: '/' }} />:<Outlet />
};