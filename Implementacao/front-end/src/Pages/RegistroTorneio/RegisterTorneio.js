import React, { useState } from 'react';
import './RegisterTorneio.css';
import { useNavigate } from 'react-router-dom';

const RegisterTorneio = () => {
    const [name, setName] = useState('');
    const [descricao, setDescricao] = useState('');
    const [qtdVagas, setQtdVagas] = useState('');
    const [esporte, setEsporte] = useState('');
    const [data, setData] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // State to store success message
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/torneio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    descricao,
                    qtdVagas,
                    esporte,
                    data,
                }),
            });

            const responseData = await response.json(); // Renamed to responseData

            if (response.status === 201) {
                setSuccess('Torneio registrado com sucesso!');
            } else if (response.status === 400) {
                setError({ message: responseData.message });
            }
        } catch (error) {
            setError({ message: error.message });
            console.error('Erro ao tentar registrar o torneio:', error);
        }
    };

    return (
        <div className="page-section-register-torneio">
            <div className="register-container-torneio-h">
                <h2 className="title-torneio">Register Torneio</h2>
                {error && <div className="error">{error.message}</div>}
                {success && <div className="success-torneio">{success}</div>} {/* Success message */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group-torneio">
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
                    <div className="form-group-torneio">
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
                    <div className="form-group-torneio">
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
                    <div className="form-group-torneio">
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
                    <div className="form-group-torneio">
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
                    <button type="submit" className="btn-register-torneio">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterTorneio;
