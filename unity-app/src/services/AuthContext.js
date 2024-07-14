import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from './axiosConfig';

// Criação do contexto de autenticação
const AuthContext = createContext();

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, isAdmin: false });

    // Efeito para verificar o token de autenticação ao montar o componente
    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            setAuth({
                isAuthenticated: true,
                isAdmin: sessionStorage.getItem('userEmail') === 'admin@UnityHub.pt',
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    // Função de login para definir o estado de autenticação e armazenar o token no sessionStorage
    const login = (email, token) => {
        setAuth({ 
            isAuthenticated: true, 
            isAdmin: email === 'admin@UnityHub.pt' 
        });
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userEmail', email);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    // Função de logout para limpar o estado de autenticação e remover o token do sessionStorage
    const logout = () => {
        setAuth({ isAuthenticated: false, isAdmin: false });
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userEmail');
        delete axios.defaults.headers.common['Authorization'];
    };

    // Retorna o provedor de contexto que engloba os componentes filhos
    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para utilizar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
