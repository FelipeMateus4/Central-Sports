import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PageListAtletas.css'; // Importa o CSS com nomes de classes únicos

const ListaAtletas = () => {
    const { id } = useParams(); // Captura o ID do treinador da URL
    const [atletas, setAtletas] = useState([]);

    useEffect(() => {
        const fetchAtletas = async () => {
            try {
                const response = await fetch(`http://localhost:5000/inscricao/treinador/atletas/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();

                if (response.ok) {
                    setAtletas(data.data.atletasNomes); // Atualiza a lista de atletas com os nomes recebidos
                } else {
                    console.error('Erro ao buscar os atletas:', data.message);
                }
            } catch (error) {
                console.error('Erro ao buscar os atletas:', error);
            }
        };

        fetchAtletas();
    }, [id]);

    return (
        <div className="lista-atletas-page-section">
            <div className="lista-atletas-container">
                <h1 className="lista-atletas-title">Atletas Relacionados</h1>
                <ul className="lista-atletas-list">
                    {atletas.length > 0 ? (
                        atletas.map((nome, index) => (
                            <li key={index} className="lista-atletas-item">
                                {nome}
                            </li>
                        ))
                    ) : (
                        <li className="lista-atletas-item">Nenhum atleta encontrado.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ListaAtletas;
