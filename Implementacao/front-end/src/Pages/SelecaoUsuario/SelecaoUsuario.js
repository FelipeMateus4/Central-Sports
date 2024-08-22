import React from 'react';
import { Link } from 'react-router-dom';
import './SelecaoUsuario.css';

const SelecaoUsuario = () => {
    return (
        <div className="page-section-selecao">
            <div className="selecao-container">
                <h1 className="selecao-title">Escolha seu Tipo de Registro</h1>
                <div className="selecao-buttons">
                    <Link to="/treinador/register" className="selecao-link">
                        <button className="selecao-button">Registrar como Treinador</button>
                    </Link>
                    <Link to="/atleta/register" className="selecao-link">
                        <button className="selecao-button">Registrar como Atleta</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SelecaoUsuario;
