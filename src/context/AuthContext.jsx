import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    const initialToken = localStorage.getItem('userToken');
    const initialEmail = localStorage.getItem('userEmail');
    const initialUsername = localStorage.getItem('userName'); 

    const [token, setToken] = useState(initialToken);
    const [userEmail, setUserEmail] = useState(initialEmail);
    const [userName, setUserName] = useState(initialUsername);
    
    const isAuthenticated = !!token;


    const login = (newToken, email, username) => {
        localStorage.setItem('userToken', newToken);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', username); 
        
        setToken(newToken);
        setUserEmail(email);
        setUserName(username); 
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');

        localStorage.removeItem('userName');
        
        setToken(null);
        setUserEmail(null);
        setUserName(null); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token, userEmail, userName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;