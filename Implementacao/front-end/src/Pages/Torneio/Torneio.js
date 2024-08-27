import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adicionando useNavigate
import { FaTrash, FaEdit } from 'react-icons/fa';
import './Torneio.css';

function TournamentItem({ tournament, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <li className="tournament-item">
            <div className="tournament-header">
                <span>{tournament.name}</span>
                <div className="tournament-actions">
                    <button onClick={toggleExpand} className="btn-visualizar">
                        Visualizar
                    </button>
                    <button className="tournament-button" onClick={() => onDelete(tournament.id)}>
                        <FaTrash /> Excluir
                    </button>
                    <Link to={`/edit-tournament/${tournament.id}`} className="tournament-link">
                        <button className="tournament-button">
                            <FaEdit /> Editar
                        </button>
                    </Link>
                </div>
            </div>
            {isExpanded && (
                <div className="tournament-details">
                    <p>
                        <strong>Descrição:</strong> {tournament.descricao}
                    </p>
                    <p>
                        <strong>Esporte:</strong> {tournament.esporte}
                    </p>
                    <p>
                        <strong>Quantidade de Vagas:</strong> {tournament.qtdVagas}
                    </p>
                    <p>
                        <strong>Data:</strong> {new Date(tournament.data).toLocaleDateString('pt-BR')}
                    </p>
                </div>
            )}
        </li>
    );
}

function TournamentsPage() {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Adicionar hook useNavigate

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch('http://localhost:5000/torneio', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar torneios');
                }

                const data = await response.json();

                if (data && Array.isArray(data.data.torneio)) {
                    setTournaments(data.data.torneio);
                } else {
                    setTournaments([]);
                }
            } catch (error) {
                console.error('Erro ao buscar torneios:', error);
                setError('Erro ao carregar torneios.');
            } finally {
                setLoading(false);
            }
        };

        fetchTournaments();
    }, []);

    const handleDelete = async (id) => {
        // Redirecionar para a página de confirmação
        navigate(`/delete-tournament/${id}`);
    };

    if (loading) {
        return <div className="loading-message">Carregando torneios...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="page-section-tournaments">
            <div className="tournaments-container">
                <h1 className="tournaments-title">Lista de Torneios</h1>
                <ul className="tournaments-list">
                    {tournaments.map((tournament) => (
                        <TournamentItem key={tournament.id} tournament={tournament} onDelete={handleDelete} />
                    ))}
                </ul>

                <Link to="/create-tournament">
                    <button className="tournament-register-button">Registrar Novo Torneio</button>
                </Link>
            </div>
        </div>
    );
}

export default TournamentsPage;
