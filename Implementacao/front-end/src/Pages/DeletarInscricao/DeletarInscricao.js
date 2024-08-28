import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DeletarInscricao.css';

const DeletarInscricao = () => {
    const [confirmado, setConfirmado] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleConfirmar = async () => {
        try {
            const response = await fetch(`http://localhost:5000/inscricao/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar torneio');
            }

            setConfirmado(true);

            // Redirecionar de volta para a lista de torneios após a exclusão
            setTimeout(() => {
                navigate('/subs');
            }, 2000); // Redireciona após 2 segundos
        } catch (error) {
            console.error('Erro ao deletar Inscrição:', error);
        }
    };

    const handleNegar = () => {
        navigate('/subs'); // Redireciona de volta para a lista de torneios
    };

    return (
        <div className="page-section-delete">
            <div className="delete-container">
                <h1 className="delete-title">Deletar Torneio</h1>
                {confirmado ? (
                    <p>Torneio excluído com sucesso!</p>
                ) : (
                    <div>
                        <p>Você tem certeza que deseja excluir a Inscrição destes usuarios?</p>
                        <button className="delete-button confirm-button" onClick={handleConfirmar}>
                            Sim
                        </button>
                        <button className="delete-button cancel-button" onClick={handleNegar}>
                            Não
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeletarInscricao;
