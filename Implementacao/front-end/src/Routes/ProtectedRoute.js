import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Pages/Context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext); // Use o AuthContext para verificar a autenticação

    if (!isAuthenticated) {
        return <Navigate to="/" replace />; // Redireciona para a página de login ou outra página se não estiver autenticado
    }

    return <Outlet />; // Renderiza o componente protegido
};

export default ProtectedRoute;
