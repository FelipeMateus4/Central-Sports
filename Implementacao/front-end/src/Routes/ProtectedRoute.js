import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        console.log(isAuthenticated);
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
