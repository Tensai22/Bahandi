import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const AUTH_BASE_URL = "http://localhost:5000";

function LoginPage() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

    try {
        const response = await axios.post(`${AUTH_BASE_URL}/auth`, { 
            email,
            password,
    });

         const { token, user } = response.data;

        if (token && user) {
                login(token, user.email, user.username); 
                
                localStorage.setItem('userEmail', user.email); 
                localStorage.setItem('userName', user.username);
                
                console.log('Вход успешен. Токен сохранен.');
                navigate('/'); 
            } else {
                setError(response.data?.message || 'Неверный email или пароль.');
            }

} catch (err) {
            console.error('Ошибка входа:', err);
            const errorMessage = err.response?.data?.message || 'Неизвестная ошибка входа.';
            if (errorMessage === 'RESOURCE_INVALID_LOGIN_OR_PASSWORD') {
                setError('Неверный email или пароль.');
            } else {
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1>Вход</h1>
            <form onSubmit={handleLogin} className="auth-form">
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
                    {loading ? 'Вход...' : 'Войти'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
        </div>
    );
}

export default LoginPage;