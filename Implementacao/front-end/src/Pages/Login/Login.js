import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email: email, password: senha }),
            });

            const data = await response.json();
            console.log(data);

            if (response.status === 200) {
                console.log('Logado com sucesso');
                // navigate('/authenticate');
            } else if (response.status === 401) {
                console.log('Não autorizado');
                setError({ message: data.message });
            }
        } catch (error) {
            setError({ message: error.message });
            console.error('Erro ao tentar logar:', error);
        }
    };

    return (
        <div className="page-section">
            <section className="login-container">
                <h1 className="text">Bem-vindo à Central Sports</h1>
                <div className="line"></div>
                {error && <div className="error">{error.message}</div>}
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
                            <div>
                                <a href="/treinador/register" className="text-decoration-none ml-2 regoster">
                                    Registre-se
                                </a>
                            </div>
                            <button type="submit" className="legal">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="container-bottom">
                    <div className="line2"></div>
                    <a className="text-middle text-decoration-none ml-2" href="/esqueci">
                        Esqueceu a senha?
                    </a>
                    <div className="line3"></div>
                </div>
            </section>
        </div>
    );
};

export default Login;
