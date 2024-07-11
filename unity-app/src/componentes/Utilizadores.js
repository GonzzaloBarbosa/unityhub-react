// componentes/Utilizadores.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import '../styles/Utilizadores.css';

const Utilizadores = () => {
  const [utilizadores, setUtilizadores] = useState([]);

  useEffect(() => {
    fetchUtilizadores();
  }, []);

  const fetchUtilizadores = async () => {
    try {
      const response = await axios.get('/api/UtilizadoresAPI/list');
      setUtilizadores(response.data);
    } catch (error) {
      console.error('Erro ao buscar utilizadores:', error);
    }
  };

  const handleDeleteUtilizador = async (id) => {
    try {
      await axios.delete(`/api/UtilizadoresAPI/${id}`);
      fetchUtilizadores();
    } catch (error) {
      console.error('Erro ao deletar utilizador:', error);
    }
  };

  const handleViewDetails = (utilizador) => {
    alert(JSON.stringify(utilizador, null, 2));
  };

  return (
    <div className="utilizadores-container">
      <h2>Gestão de Utilizadores</h2>
      <ul className="utilizador-list">
        {utilizadores.map((utilizador) => (
          <li key={utilizador.id}>
            <span className="utilizador-info">{utilizador.email}</span>
            <div className="buttons">
              <button className="btn-details" onClick={() => handleViewDetails(utilizador)}>Detalhes</button>
              <button className="btn-delete" onClick={() => handleDeleteUtilizador(utilizador.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Utilizadores;
