import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PerfilAtleta = () => {
    const [atleta, setAtleta] = useState(null);
    const [error, setError] = useState(null);
    const { user, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redireciona para a tela de login se não estiver autenticado
            return;
        }

        const fetchAtletaData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/atleta/${user.atletaModelId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const data = await response.json();

                if (response.status === 200) {
                    setAtleta(data.data.atleta);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError(error.message);
                console.error('Erro ao buscar dados do atleta:', error);
            }
        };

        fetchAtletaData();
    }, [user, isAuthenticated, navigate]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!atleta) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="perfil-atleta-container">
            <h1>Perfil do Atleta</h1>
            <div className="perfil-detalhes">
                <p>
                    <strong>Nome:</strong> {atleta.name}
                </p>
                <p>
                    <strong>CPF:</strong> {atleta.cpf}
                </p>
                <p>
                    <strong>Esporte:</strong> {atleta.sport}
                </p>
                {/* Adicione mais campos conforme necessário */}
            </div>
            {/* Você pode adicionar mais funcionalidades, como edição ou exclusão do perfil, aqui */}
        </div>
    );
};

export default PerfilAtleta;
