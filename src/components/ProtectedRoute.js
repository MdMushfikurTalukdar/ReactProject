// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Navigate to="/register" />
      }
    />
  );
};

export default ProtectedRoute;
