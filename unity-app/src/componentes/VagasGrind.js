import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axiosConfig';
import '../styles/VagasGrid.css';

const VagasGrid = ({ searchCriteria, isAuthenticated }) => {
  const [vagas, setVagas] = useState([]);
  const [categoriasMap, setCategoriasMap] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect é utilizado para procurar as categorias e vagas quando o componente é montado
  useEffect(() => {
    fetchCategorias();
    fetchVagas();
  }, []);

  // useEffect é utilizado para procurar vagas sempre que os critérios de pesquisa mudarem
  useEffect(() => {
    fetchVagas();
  }, [searchCriteria]);

  // Função para procurar categorias
  const fetchCategorias = async () => {
    try {
      const response = await axios.get('/api/CategoriasAPI');
      const data = response.data;
      
      // Verifica se a resposta contém um array de categorias
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
      console.error('Erro ao procurar categorias:', error);
      setError('Erro ao procurar categorias, por favor tente novamente mais tarde.');
    }
  };

  // Função para procurar vagas
  const fetchVagas = async () => {
    try {
      const response = await axios.get('/api/VagasAPI', {
        params: {
          destination: searchCriteria.destination,
          category: searchCriteria.category,
        },
      });
      const data = response.data;

      // Verifica se a resposta contém um array de vagas
      if (Array.isArray(data.$values)) {
        const mappedVagas = data.$values.map(vaga => ({
          id: vaga.id,
          nome: vaga.nome,
          fotografia: vaga.fotografia,
        }));
        setVagas(mappedVagas);
      } else {
        throw new Error("Formato de resposta inesperado");
      }
    } catch (error) {
      console.error('Erro ao procurar vagas:', error);
      setError('Erro ao procurar vagas, por favor tente novamente mais tarde.');
    }
  };

  // Função para lidar com o clique numa vaga
  const handleVagaClick = (id) => {
    navigate(`/vagas/${id}`);
  };

  // Renderiza uma mensagem de erro se houver
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="vagas-grid">
      {vagas.length > 0 ? (
        // Renderiza cada vaga no grid
        vagas.map((vaga) => (
          <div className="vaga-grid-card" key={vaga.id} onClick={() => handleVagaClick(vaga.id)}>
            <img
              src={`https://localhost:7226/images/${vaga.fotografia}`}
              alt={vaga.nome}
              className="vaga-grid-photo"
            />
            <div className="vaga-grid-overlay">
              <span className="vaga-grid-nome">{vaga.nome}</span>
            </div>
          </div>
        ))
      ) : (
        // Renderiza uma mensagem se não houver vagas disponíveis
        <p>Nenhuma vaga disponível no momento.</p>
      )}
    </div>
  );
};

export default VagasGrid;