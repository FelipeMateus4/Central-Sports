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
            const response = await fetch('http://localhost:5000/auth/register', {
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
                    confirmPassword: confirmPassword,
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                console.log('Registrado com sucesso');
                navigate('/login');
            } else if (response.status === 400) {
                console.log('Erro ao registrar');
            }
        } catch (error) {
            setError({ message: error.message });
            console.error('Erro ao tentar registrar:', error);
        }
    };

    return (
        <div className="page-section-register">
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF:</label>
                        <input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="graduation">Graduation:</label>
                        <input
                            type="text"
                            id="graduation"
                            value={graduation}
                            onChange={(e) => setGraduation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-register">
                        Register
                    </button>
                </form>
                <div className="social-buttons">
                    <button className="btn-social">Sign up with Google</button>
                    <button className="btn-social">Sign up with Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterTreinador;
