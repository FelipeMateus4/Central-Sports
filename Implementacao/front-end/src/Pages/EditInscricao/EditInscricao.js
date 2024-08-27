import React, { useState, useEffect } from 'react';
import './EditInscricao.css';
import { useParams, useNavigate } from 'react-router-dom';

const EditInscricao = () => {
    const { id } = useParams(); // Obtém o ID da inscrição da URL
    const [atletaId, setAtletaId] = useState('');
    const [treinadorId, setTreinadorId] = useState('');
    const [torneioId, setTorneioId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Carrega os dados atuais da inscrição
        const fetchInscricao = async () => {
            try {
                const response = await fetch(`http://localhost:5000/inscricao/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Erro ao carregar os dados da inscrição');
                }

                const data = await response.json();

                // Preenche o formulário com os dados existentes
                setAtletaId(data.data.inscricao.atletaId);
                setTreinadorId(data.data.inscricao.treinadorId);
                setTorneioId(data.data.inscricao.torneioId);
            } catch (error) {
                setError('Erro ao carregar os dados da inscrição.');
                console.error('Erro ao carregar os dados da inscrição:', error);
            }
        };

        fetchInscricao();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/inscricao`, {
                method: 'PATCH', // Faz uma requisição PATCH para atualizar a inscrição
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    id, // ID da inscrição que está sendo editada
                    atletaId,
                    treinadorId,
                    torneioId,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar a inscrição');
            }
            setSuccess('Inscrição atualizada com sucesso!');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setError('Erro ao atualizar a inscrição.');
            console.error('Erro ao atualizar a inscrição:', error);
        }
    };

    return (
        <div className="page-section-edit-inscricao">
            <div className="edit-container-inscricao">
                <h2 className="title-edit-inscricao">Editar Inscrição</h2>
                {error && <div className="error">{error}</div>}
                {success && <div className="success-edit-inscricao">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group-edit-inscricao">
                        <input
                            placeholder="ID do Atleta"
                            type="text"
                            value={atletaId}
                            onChange={(e) => setAtletaId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-edit-inscricao">
                        <input
                            placeholder="ID do Treinador"
                            type="text"
                            value={treinadorId}
                            onChange={(e) => setTreinadorId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-edit-inscricao">
                        <input
                            placeholder="ID do Torneio"
                            type="text"
                            value={torneioId}
                            onChange={(e) => setTorneioId(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-edit-inscricao">
                        Atualizar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditInscricao;
