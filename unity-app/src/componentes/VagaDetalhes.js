import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosConfig';
import { useAuth } from '../services/AuthContext';
import '../styles/VagaDetalhes.css';

const VagaDetalhes = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [vaga, setVaga] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const response = await axios.get(`/api/VagasAPI/${id}`);
        setVaga(response.data);

        if (response.data.categorias && response.data.categorias.$values.length > 0) {
          const categoriaIds = response.data.categorias.$values;
          const categoriaPromises = categoriaIds.map(async (categoriaId) => {
            const categoriaResponse = await axios.get(`/api/CategoriasAPI/${categoriaId}`);
            return categoriaResponse.data.nome;
          });
          const categoriaNomes = await Promise.all(categoriaPromises);
          setCategorias(categoriaNomes);
        }
      } catch (error) {
        setError('Erro ao procurar detalhes da vaga, por favor tente novamente mais tarde.');
      }
    };

    fetchVaga();
  }, [id]);

  const handleCandidatar = async () => {
    console.log("Iniciando candidatura...");
    if (!auth.isAuthenticated) {
      alert('Por favor, faça login para se candidatar.');
      return;
    }

    try {
      console.log("Token de autenticação:", sessionStorage.getItem('authToken'));
      const response = await axios.post('/api/CandidaturasAPI/Create', { VagaFK: id, Email: sessionStorage.getItem('userEmail') });
      console.log("Resposta da candidatura:", response);
      alert('Candidatura realizada com sucesso!');
    } catch (error) {
      console.error("Erro ao realizar candidatura:", error.response ? error.response.data : error.message);
      alert('Erro ao realizar candidatura, por favor tente novamente mais tarde.');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!vaga) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="vaga-detalhes">
      <h2>Detalhes da Vaga</h2>
      <img src={`https://localhost:7226/images/${vaga.fotografia}`} alt={vaga.nome} />
      <h3>{vaga.nome}</h3>
      <p>{vaga.descricao}</p>
      <p><strong>Local:</strong> {vaga.local}</p>
      <p><strong>Período de Voluntariado:</strong> {vaga.periodoVoluntariado}</p>
      <p><strong>Categorias:</strong> {categorias.length > 0 ? categorias.join(', ') : 'N/A'}</p>
      {auth.isAuthenticated && !auth.isAdmin && (
        <button onClick={handleCandidatar}>Candidatar-se</button>
      )}
      <button onClick={() => window.history.back()}>Voltar para a lista</button>
    </div>
  );
};

export default VagaDetalhes;
