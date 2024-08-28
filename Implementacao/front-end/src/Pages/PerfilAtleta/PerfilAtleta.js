import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './PerfilAtleta.css';

const PerfilAtleta = () => {
    const [perfil, setPerfil] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    const { user, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redireciona para a tela de login se não estiver autenticado
            return;
        }

        const fetchPerfilData = async () => {
            try {
                const url =
                    user.type === 'atleta'
                        ? `http://localhost:5000/atleta/${user.id}`
                        : `http://localhost:5000/treinador/${user.id}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                if (response.status === 200) {
                    setPerfil(data.data);
                    setEditData(data.data); // Inicializa o formulário com os dados atuais
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError(error.message);
                console.error('Erro ao buscar dados do perfil:', error);
            }
        };

        fetchPerfilData();
    }, [user, isAuthenticated, navigate]);

    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveEdit = async () => {
        try {
            const url = user.type === 'atleta' ? 'http://localhost:5000/atleta' : 'http://localhost:5000/treinador';

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: user.id, ...editData }), // Inclui os dados editados
            });

            const data = await response.json();
            if (response.status === 200) {
                setPerfil(data.data);
                setIsEditing(false); // Sai do modo de edição após salvar
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
            console.error('Erro ao salvar alterações:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const url = user.type === 'atleta' ? 'http://localhost:5000/atleta' : 'http://localhost:5000/treinador';

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: user.id }), // O backend espera o email do usuário
            });

            if (response.status === 200) {
                navigate('/'); // Redireciona para a página inicial após exclusão
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
            console.error('Erro ao excluir perfil:', error);
        }
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!perfil) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="perfil-atleta-container">
            <div className="perfil-detalhes">
                <h1 className="perfil-titulo">{user.type === 'atleta' ? 'Perfil do Atleta' : 'Perfil do Treinador'}</h1>
                <p>
                    <strong>Nome:</strong>
                    {isEditing ? (
                        <input type="text" name="name" value={editData.name || ''} onChange={handleEditChange} />
                    ) : (
                        perfil?.atleta?.name || perfil?.treinador?.name
                    )}
                </p>
                <p>
                    <strong>CPF:</strong>
                    {isEditing ? (
                        <input type="text" name="cpf" value={editData.cpf || ''} onChange={handleEditChange} />
                    ) : (
                        perfil?.atleta?.cpf || perfil?.treinador?.cpf
                    )}
                </p>
                {user.type === 'atleta' ? (
                    <p>
                        <strong>Esporte:</strong>
                        {isEditing ? (
                            <input type="text" name="sport" value={editData.sport || ''} onChange={handleEditChange} />
                        ) : (
                            perfil?.atleta?.sport
                        )}
                    </p>
                ) : (
                    <>
                        <p>
                            <strong>Graduação:</strong>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="graduation"
                                    value={editData.graduation || ''}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                perfil?.treinador?.graduation
                            )}
                        </p>
                    </>
                )}
                <p>
                    <strong>Email:</strong>{' '}
                    {isEditing ? (
                        <input type="email" name="email" value={editData.email || ''} onChange={handleEditChange} />
                    ) : (
                        perfil?.user?.email
                    )}
                </p>
                <p>
                    <strong>Data de Criação:</strong> {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p>
                    <strong>Data de Atualização:</strong> {new Date(user.updatedAt).toLocaleDateString()}
                </p>

                {isEditing ? (
                    <button className="perfil-button" onClick={handleSaveEdit}>
                        Confirmar Edição
                    </button>
                ) : (
                    <button className="perfil-button" onClick={() => setIsEditing(true)}>
                        Editar Perfil
                    </button>
                )}

                <button className="perfil-button perfil-button-delete" onClick={handleDelete}>
                    Excluir Perfil
                </button>
            </div>
        </div>
    );
};

export default PerfilAtleta;
