
import { Navigate, Outlet, RouteProps } from 'react-router'

import React from 'react'

export const PrivateRoutes = ({ children, ...rest }: RouteProps): JSX.Element => {
  
  return   localStorage.userData ? <Outlet /> : <Navigate to={{ pathname: '/login' }} />
}
