import React, { useState, useEffect } from 'react';
import './EditTorneio.css'; // Importa o novo CSS
import { useParams, useNavigate } from 'react-router-dom';

const EditTorneio = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [descricao, setDescricao] = useState('');
    const [qtdVagas, setQtdVagas] = useState('');
    const [esporte, setEsporte] = useState('');
    const [data, setData] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Carregar os dados atuais do torneio
        const fetchTorneio = async () => {
            try {
                const response = await fetch(`http://localhost:5000/torneio/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Erro ao carregar os dados do torneio');
                }

                const data = await response.json();

                // Preencher o formulário com os dados existentes
                setName(data.data.torneio.name);
                setDescricao(data.data.torneio.descricao);
                setQtdVagas(data.data.torneio.qtdVagas);
                setEsporte(data.data.torneio.esporte);
                setData(data.data.torneio.data);
            } catch (error) {
                setError('Erro ao carregar os dados do torneio.');
                console.error('Erro ao carregar os dados do torneio:', error);
            }
        };

        fetchTorneio();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/torneio`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    id,
                    name,
                    descricao,
                    qtdVagas,
                    esporte,
                    data,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar torneio');
            }
            setSuccess('Torneio atualizado com sucesso!');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setError('Erro ao atualizar torneio.');
            console.error('Erro ao atualizar torneio:', error);
        }
    };

    return (
        <div className="page-section-edit-torneio">
            <div className="edit">
                <h2 className="title-edit-torneio">Editar Torneio</h2>
                {error && <div className="error-edit-torneio">{error}</div>}
                {success && <div className="success-edit-torneio">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group-edit-torneio">
                        <label htmlFor="name"></label>
                        <input
                            placeholder="Nome do Torneio"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-edit-torneio">
                        <label htmlFor="descricao"></label>
                        <input
                            placeholder="Descrição"
                            type="text"
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-edit-torneio">
                        <label htmlFor="qtdVagas"></label>
                        <input
                            placeholder="Quantidade de Vagas"
                            type="number"
                            id="qtdVagas"
                            value={qtdVagas}
                            onChange={(e) => setQtdVagas(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-edit-torneio">
                        <label htmlFor="esporte"></label>
                        <input
                            placeholder="Esporte"
                            type="text"
                            id="esporte"
                            value={esporte}
                            onChange={(e) => setEsporte(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-edit-torneio">
                        <label htmlFor="data"></label>
                        <input
                            placeholder="Data"
                            type="date"
                            id="data"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-edit-torneio">
                        Atualizar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTorneio;
