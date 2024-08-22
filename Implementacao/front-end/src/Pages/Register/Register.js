import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const RegisterTreinador = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [graduation, setGraduation] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (password !== confirmPassword) {
                setError({ message: 'As senhas não conferem.' });
                return;
            }
            const response = await fetch('http://localhost:5000/treinador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    cpf: cpf,
                    graduation: graduation,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                console.log('Registrado com sucesso');
                navigate('/');
            } else if (response.status === 400) {
                setError({ message: data.message });
            }
        } catch (error) {
            setError({ message: error.message });
            console.error('Erro ao tentar registrar:', error);
        }
    };

    return (
        <div className="page-section-register">
            <div className="register-container">
                <h2 className="title">Register</h2>
                {error && <div className="error">{error.message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name"></label>
                        <input
                            placeholder="Name"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"></label>
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf"></label>
                        <input
                            placeholder="CPF"
                            type="text"
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="graduation"></label>
                        <input
                            placeholder="Graduation"
                            type="text"
                            id="graduation"
                            value={graduation}
                            onChange={(e) => setGraduation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input
                            placeholder="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword"></label>
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-register">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterTreinador;
