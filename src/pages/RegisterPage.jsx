import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const AUTH_BASE_URL = "http://localhost:5000";

function RegisterPage() {
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(`${AUTH_BASE_URL}/register`, { 
                username, 
                email,
                password,
            });

            console.log('Регистрация успешна:', response.data);

            alert('Регистрация прошла успешно. Теперь выполните вход.');
            navigate('/login');

        } catch (err) {
            console.error('Ошибка регистрации:', err);
            setError(err.response?.data?.message || 'Ошибка регистрации. Проверьте данные.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1>Регистрация</h1>
            <form onSubmit={handleRegister} className="auth-form">
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
        </div>
    );
}

export default RegisterPage;