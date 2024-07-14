// componentes/Utilizadores.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import '../styles/Utilizadores.css';
import { useAuth } from '../services/AuthContext';
import { Navigate } from 'react-router-dom';

const Utilizadores = () => {
  const [utilizadores, setUtilizadores] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated && auth.isAdmin) {
      fetchUtilizadores();
    }
  }, [auth]);

  const fetchUtilizadores = async () => {
    try {
      const response = await axios.get('/api/UtilizadoresAPI/list');
      if (response.data && response.data.$values && Array.isArray(response.data.$values)) {
        setUtilizadores(response.data.$values);
      } else {
        console.error('A resposta da API não é um array:', response.data);
        setUtilizadores([]); // Defina um array vazio em caso de erro
      }
    } catch (error) {
      console.error('Erro ao buscar utilizadores:', error);
      setUtilizadores([]); // Defina um array vazio em caso de erro
    }
  };

  const handleViewDetails = (utilizador) => {
    alert(JSON.stringify(utilizador, null, 2));
  };

  if (!auth.isAuthenticated) {
    return <div>Carregando...</div>;
  }

  if (!auth.isAdmin) {
    return <Navigate to="/" />; // Redireciona para a página inicial se não for admin
  }

  return (
    <div className="utilizadores-container">
      <h2>Gestão de Utilizadores</h2>
      <ul className="utilizador-list">
        {Array.isArray(utilizadores) && utilizadores.length > 0 ? (
          utilizadores.map((utilizador) => (
            <li key={utilizador.id}>
              <span className="utilizador-info">{utilizador.email}</span>
              <div className="buttons">
                <button className="btn-details" onClick={() => handleViewDetails(utilizador)}>Detalhes</button>
              </div>
            </li>
          ))
        ) : (
          <li>Nenhum utilizador encontrado</li>
        )}
      </ul>
    </div>
  );
};

export default Utilizadores;