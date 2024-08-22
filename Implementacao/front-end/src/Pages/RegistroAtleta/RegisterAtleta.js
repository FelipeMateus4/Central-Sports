import React, { useState } from 'react';
import './RegisterAtleta.css';
import { useNavigate } from 'react-router-dom';

const RegisterAtleta = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [sport, setSport] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (password !== confirmPassword) {
                setError({ message: 'As senhas não conferem.' });
                return;
            }
            const response = await fetch('http://localhost:5000/atleta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    cpf: cpf,
                    sport: sport,
                    password: password,
                    type: confirmPassword,
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
        <div className="page-atleta-section-register">
            <div className="register-atleta-container">
                <h2 className="title">Register</h2>
                {error && <div className="error">{error.message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="atleta-form-group">
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
                    <div className="atleta-form-group">
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
                    <div className="atleta-form-group">
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
                    <div className="atleta-form-group">
                        <label htmlFor="sport"></label>
                        <input
                            placeholder="Sport"
                            type="text"
                            id="sport"
                            value={sport}
                            onChange={(e) => setSport(e.target.value)}
                            required
                        />
                    </div>
                    <div className="atleta-form-group">
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
                    <div className="atleta-form-group">
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
                    <button type="submit" className="atleta-btn-register">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterAtleta;
