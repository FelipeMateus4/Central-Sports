import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Certifique-se de criar este arquivo para os estilos

export const AdminPage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleTorneio = () => {
        navigate('/torneio'); // Altere o caminho conforme necessário
    };

    const handleInscricoes = () => {
        navigate('/inscricoes'); // Altere o caminho conforme necessário
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
