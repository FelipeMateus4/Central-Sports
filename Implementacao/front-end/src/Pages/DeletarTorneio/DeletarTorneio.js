import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DeletarTorneio.css';

const DeletarTorneio = () => {
    const [confirmado, setConfirmado] = useState(false);
    const { id } = useParams(); // Obtenha o ID da URL
    const navigate = useNavigate();

    const handleConfirmar = async () => {
        // Lógica para excluir o torneio
        try {
            const response = await fetch(`http://localhost:5000/torneio/${id}`, {
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
                navigate('/torneio');
            }, 2000); // Redireciona após 2 segundos
        } catch (error) {
            console.error('Erro ao deletar torneio:', error);
        }
    };

    const handleNegar = () => {
        // Lógica para cancelar a exclusão do torneio
        navigate('/torneio'); // Redireciona de volta para a lista de torneios
    };

    return (
        <div className="page-section-delete">
            <div className="delete-container">
                <h1 className="delete-title">Deletar Torneio</h1>
                {confirmado ? (
                    <p>Torneio excluído com sucesso!</p>
                ) : (
                    <div>
                        <p>Você tem certeza que deseja excluir o Torneio?</p>
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

export default DeletarTorneio;
