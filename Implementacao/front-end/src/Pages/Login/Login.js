import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const { loginAuth } = useContext(AuthContext);
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

            if (response.status === 200) {
                loginAuth(data.user);
                console.log('Logado com sucesso');

                // Supondo que data.user contenha o treinadorId
                console.log('Treinador ID:', data.user.treinadorModelId);
                const treinadorId = data.user.treinadorModelId;
                console.log('Tipo de usuário:', data.user.type);
                if (data.user.type === 'admin') {
                    navigate(`/admin`);
                } else {
                    navigate(`/principal/${treinadorId}`);
                }
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
                                <a href="/SelecaoUsuario" className="text-decoration-none ml-2 regoster">
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
