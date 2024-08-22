import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Authenticate.css';

const Authenticate = () => {
    const [token, setToken] = useState('');
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState(null);
    const { loginAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ token: token }),
            });

            const data = await response.json();
            console.log(data);

            if (response.status === 200) {
                loginAuth(data.user);
                console.log('Logado com sucesso');
                navigate('/authenticate');
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
        <div className="page-section-authenticate">
            <div className="authenticate-container">
                <h2 className="title">Seu Token</h2>
                <p className="text-center timer-text">Seu código expira em: {timer} segundos</p>
                {error && <div className="error">{error.message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name"></label>
                        <input
                            placeholder="Token"
                            type="text"
                            id="name"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-authenticate">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Authenticate;
