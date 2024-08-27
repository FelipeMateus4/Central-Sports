import React, { useState } from 'react';
import './RegisterInscricao.css';

const RegisterInscricao = () => {
    const [atletaId, setAtletaId] = useState('');
    const [treinadorId, setTreinadorId] = useState('');
    const [torneioId, setTorneioId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/inscricao', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    atletaId: atletaId,
                    treinadorId: treinadorId,
                    torneioId: torneioId,
                }),
            });

            const responseData = await response.json();

            if (response.status === 201) {
                setSuccess('Inscrição registrada com sucesso!');
                setError(null);
            } else if (response.status === 400) {
                setError({ message: responseData.message });
                setSuccess(null);
            } else if (response.status === 500) {
                setError({ message: 'Verifique se os ids são válidos!' });
                setSuccess(null);
            } else {
                setError({ message: responseData.message });
                setSuccess(null);
            }
        } catch (error) {
            setError({ message: error.message });
            setSuccess(null);
            console.error('Erro ao tentar registrar a inscrição:', error);
        }
    };

    return (
        <div className="page-section-register-inscricao">
            <div className="register-container-inscricao">
                <h2 className="title-inscricao">Registrar Inscrição</h2>
                {error && <div className="error">{error.message}</div>}
                {success && <div className="success-inscricao">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group-inscricao">
                        <input
                            placeholder="ID do Atleta"
                            type="text"
                            value={atletaId}
                            onChange={(e) => setAtletaId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-inscricao">
                        <input
                            placeholder="ID do Treinador"
                            type="text"
                            value={treinadorId}
                            onChange={(e) => setTreinadorId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-inscricao">
                        <input
                            placeholder="ID do Torneio"
                            type="text"
                            value={torneioId}
                            onChange={(e) => setTorneioId(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-register-inscricao">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterInscricao;
