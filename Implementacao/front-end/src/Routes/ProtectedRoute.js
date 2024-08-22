import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    console.log(isAuthenticated);

    if (!isAuthenticated) {
        console.log(isAuthenticated);
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
