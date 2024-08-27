import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Certifique-se de criar este arquivo para os estilos

export const AdminPage = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        fetch('http://localhost:5000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        navigate('/');
    };

    const handleTorneio = () => {
        navigate('/torneio');
    };

    const handleInscricoes = () => {
        navigate('/subs');
    };

    return (
        <div className="page-section-admin admin-page">
            <div className="container-buttoms">
                <div className="buttons-container">
                    <button className="admin-button" onClick={handleTorneio}>
                        Torneio
                    </button>
                    <button className="admin-button" onClick={handleInscricoes}>
                        Inscrições
                    </button>
                    <button className="admin-button" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );
};
