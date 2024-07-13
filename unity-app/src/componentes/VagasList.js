import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import '../styles/VagasList.css';
import CreateVaga from './CreateVaga';

const VagasList = () => {
  const [vagas, setVagas] = useState([]);
  const [categoriasMap, setCategoriasMap] = useState({});
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchCategorias();
    fetchVagas();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('/api/CategoriasAPI');
      const data = response.data;
      
      if (Array.isArray(data.$values)) {
        const map = data.$values.reduce((acc, categoria) => {
          acc[categoria.id] = categoria.nome;
          return acc;
        }, {});
        setCategoriasMap(map);
      } else {
        throw new Error("Formato de resposta inesperado");
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setError('Erro ao buscar categorias, por favor tente novamente mais tarde.');
    }
  };

  const fetchVagas = async () => {
    try {
      const response = await axios.get('/api/VagasAPI');
      const data = response.data;

      console.log('Resposta da API:', data);

      if (Array.isArray(data.$values)) {
        const mappedVagas = data.$values.map(vaga => ({
          id: vaga.id,
          nome: vaga.nome,
          periodoVoluntariado: vaga.periodoVoluntariado,
          local: vaga.local,
          descricao: vaga.descricao,
          fotografia: vaga.fotografia,
          categorias: vaga.categorias ? vaga.categorias.$values.map(catId => categoriasMap[catId]).filter(catName => catName) : []
        }));

        setVagas(mappedVagas);
      } else {
        throw new Error("Formato de resposta inesperado");
      }
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
      setError('Erro ao buscar vagas, por favor tente novamente mais tarde.');
    }
  };

  const handleCreateButtonClick = () => {
    setShowCreateForm(true);
  };

  const handleVagaCreated = () => {
    setShowCreateForm(false);
    fetchVagas();
  };

  const handleCancel = () => {
    setShowCreateForm(false);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="vagas-list-container">
      {showCreateForm ? (
        <CreateVaga onVagaCreated={handleVagaCreated} onCancel={handleCancel} />
      ) : (
        <>
          <h2>Lista de Vagas</h2>
          <button className="btn-vaga" onClick={handleCreateButtonClick}>
            Criar Nova Vaga
          </button>
          <div className="vagas-list">
            {vagas.length > 0 ? (
              vagas.map((vaga) => (
                <div className="vaga-card" key={vaga.id}>
                  <img
                    src={`https://localhost:7226/images/${vaga.fotografia}`}
                    alt={vaga.nome}
                    className="vaga-photo"
                  />
                  <div className="vaga-details">
                    <h3>{vaga.nome}</h3>
                    <p><strong>Período de Voluntariado:</strong> {vaga.periodoVoluntariado}</p>
                    <p><strong>Local:</strong> {vaga.local}</p>
                    <p><strong>Descrição:</strong> {vaga.descricao}</p>
                    <p><strong>Categorias:</strong> {vaga.categorias.join(', ')}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhuma vaga disponível no momento.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VagasList;