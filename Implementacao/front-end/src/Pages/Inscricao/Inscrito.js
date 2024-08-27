import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './Inscricao.css';

function InscricaoItem({ inscricao, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <li className="inscricao-item">
            <div className="inscricao-header">
                {/* Ajustando para exibir o id da inscrição, que parece ser a única informação diretamente utilizável */}
                <span>Inscrição ID: {inscricao.id}</span>
                <div className="inscricao-actions">
                    <button onClick={toggleExpand} className="btn-visualizar">
                        Visualizar
                    </button>
                    <button className="inscricao-button" onClick={() => onDelete(inscricao.id)}>
                        <FaTrash /> Excluir
                    </button>
                    <Link to={`/edit-inscricao/${inscricao.id}`} className="inscricao-link">
                        <button className="inscricao-button">
                            <FaEdit /> Editar
                        </button>
                    </Link>
                </div>
            </div>
            {isExpanded && (
                <div className="inscricao-details">
                    <p>
                        <strong>ID do Atleta:</strong> {inscricao.atletaModelId}
                    </p>
                    <p>
                        <strong>ID do Treinador:</strong> {inscricao.treinadorModelId}
                    </p>
                    <p>
                        <strong>ID do Torneio:</strong> {inscricao.torneioModelId}
                    </p>
                    <p>
                        <strong>Data da Inscrição:</strong> {new Date(inscricao.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                </div>
            )}
        </li>
    );
}

function InscricoesPage() {
    const [inscricoes, setInscricoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInscricoes = async () => {
            try {
                const response = await fetch('http://localhost:5000/inscricao', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar inscrições');
                }

                const data = await response.json();

                if (data && Array.isArray(data.data.inscricao)) {
                    setInscricoes(data.data.inscricao);
                } else {
                    setInscricoes([]);
                }
            } catch (error) {
                console.error('Erro ao buscar inscrições:', error);
                setError('Erro ao carregar inscrições.');
            } finally {
                setLoading(false);
            }
        };

        fetchInscricoes();
    }, []);

    const handleDelete = async (id) => {
        navigate(`/delete-inscricao/${id}`);
    };

    if (loading) {
        return <div className="loading-message">Carregando inscrições...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="page-section-inscricoes">
            <div className="inscricoes-container">
                <h1 className="inscricoes-title">Lista de Inscrições</h1>
                <ul className="inscricoes-list">
                    {inscricoes.map((inscricao) => (
                        <InscricaoItem key={inscricao.id} inscricao={inscricao} onDelete={handleDelete} />
                    ))}
                </ul>

                <Link to="/create-inscricao">
                    <button className="inscricao-register-button">Registrar Nova Inscrição</button>
                </Link>
            </div>
        </div>
    );
}

export default InscricoesPage;
