import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import '../styles/VagasList.css'; // Crie ou modifique o CSS conforme necessário
import CreateVaga from './CreateVaga'; // Importar CreateVaga

const VagasList = () => {
  const [vagas, setVagas] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false); // Estado para alternar a visualização

  const fetchVagas = async () => {
    try {
      const response = await axios.get('/api/VagasAPI');
      setVagas(response.data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    }
  };

  useEffect(() => {
    fetchVagas();
  }, []);

  const handleToggleView = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleVagaCreated = () => {
    setShowCreateForm(false);
    // Refetch vagas after creating a new one
    fetchVagas();
  };

  return (
    <div className="vagas-container">
      <h2>{showCreateForm ? 'Criar Nova Vaga' : 'Lista de Vagas'}</h2>
      <button className="btn btn-primary" onClick={handleToggleView}>
        {showCreateForm ? 'Ver Lista de Vagas' : 'Criar Nova Vaga'}
      </button>
      {showCreateForm ? (
        <CreateVaga onVagaCreated={handleVagaCreated} /> // Passar a função handleVagaCreated como prop
      ) : (
        <ul className="vagas-list">
          {vagas.map((vaga) => (
            <li key={vaga.id}>
              <h3>{vaga.nome}</h3>
              <p>{vaga.descricao}</p>
              <p><strong>Período de Voluntariado:</strong> {vaga.periodoVoluntariado}</p>
              <p><strong>Local:</strong> {vaga.local}</p>
              <p><strong>Categorias:</strong> <span className="categoria-nomes">{vaga.categorias.map(c => c.nome).join(', ')}</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VagasList;
