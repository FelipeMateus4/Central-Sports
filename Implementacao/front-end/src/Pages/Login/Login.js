import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'; // Defina a URL base do backend
axios.defaults.withCredentials = true; // Garante que cookies sejam enviados com cada requisição

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/auth/login', { email: email, password: senha });

            if (response.status === 200) {
                console.log('logado');
            } else if (response.status === 401) {
                console.log('nao logado');
            }
        } catch (error) {
            if (error.response.data.message === 'Missing credentials') {
                error.response.data.message = 'Os campos de usuário e senha são obrigatórios.';
                setError(error.response.data); // Mensagem de erro para exibir no frontend
            } else {
                setError(error.response.data); // Mensagem de erro para exibir no frontend
            }
        }
    };

    return (
        <div className="page-section">
            <section className="login-container">
                <h1 className="text">Bem vindo a Central Sports</h1>
                <div className="forms">
                    <form onSubmit={handleSubmit}>
                        <div className="campos">
                            <input
                                className="formss-input"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="formss-input"
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <button type="submit" className="btn btn-primary mt-3 legal">
                    Login
                </button>
            </section>
        </div>
    );
};

export default Login;
