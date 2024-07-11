import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
const AuthContext = createContext();

// Provedor de contexto
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, isAdmin: false });

    const login = (email) => {
        setAuth({ 
            isAuthenticated: true, 
            isAdmin: email === 'admin@UnityHub.pt' 
        });
    };

    const logout = () => {
        setAuth({ isAuthenticated: false, isAdmin: false });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
