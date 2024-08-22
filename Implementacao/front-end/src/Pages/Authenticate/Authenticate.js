import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Authenticate.css';

const Authenticate = () => {
    return (
        <div className="page-section">
            <section className="login-container">
                <h1 className="text">Bem-vindo à Central Sports</h1>
                <div className="line"></div>
                <div className="forms">
                    <form>
                        <div className="campos">
                            <input className="formss-input" type="text" placeholder="Email" />
                            <input className="formss-input" type="password" placeholder="Senha" />
                        </div>
                        <button className="formss-button">Entrar</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Authenticate;
