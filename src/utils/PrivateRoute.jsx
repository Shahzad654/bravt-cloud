import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
