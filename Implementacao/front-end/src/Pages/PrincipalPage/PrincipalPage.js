import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import './PrincipalPage.css';

const PrincipalPage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams(); // Captura o treinadorId da URL
    const navigate = useNavigate();
    const [inscricoes, setInscricoes] = useState([]);

    useEffect(() => {
        const fetchInscricoes = async () => {
            try {
                const endpoint =
                    user.type === 'treinador'
                        ? `http://localhost:5000/inscricao/treinador/${id}`
                        : `http://localhost:5000/inscricao/atleta/${id}`;

                const response = await fetch(endpoint, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();

                if (response.ok) {
                    setInscricoes(data.data.inscricao);
                } else {
                    console.error('Erro ao buscar as inscrições:', data.message);
                }
            } catch (error) {
                console.error('Erro ao buscar as inscrições:', error);
            }
        };

        fetchInscricoes();
    }, [id, user]);

    const handleViewAtletas = () => {
        navigate(`/treinador/atletas/${id}`);
    };

    return (
        <div className="page-section-2">
            <div className="dashboard-container">
                <h1 className="dashboard-title">Bem-vindo, {user.name}</h1>
                <p className="dashboard-info">
                    Você está logado como {user.type === 'treinador' ? 'Treinador' : 'Atleta'}.
                </p>
                {user.type === 'treinador' && (
                    <button className="dashboard-button view-atletas-button" onClick={handleViewAtletas}>
                        Ver Atletas Relacionados
                    </button>
                )}

                <h2 className="dashboard-subtitle">Torneios em que você está inscrito:</h2>
                <ul className="inscricoes-list">
                    {inscricoes.map((inscricao) => (
                        <li key={inscricao.name} className="inscricao-item">
                            <strong>Torneio:</strong> {inscricao.name}{' '}
                            {/* Substitua por informações detalhadas do torneio */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PrincipalPage;
