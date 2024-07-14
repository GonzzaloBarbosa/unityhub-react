import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosConfig';
import { useAuth } from '../services/AuthContext';
import '../styles/VagaDetalhes.css';

const VagaDetalhe = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [vaga, setVaga] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);

  // useEffect é utilizado para procurar os detalhes da vaga quando o componente é montado
  useEffect(() => {
    const fetchVaga = async () => {
      try {
        // Realiza uma requisição GET à API para obter os detalhes da vaga pelo ID
        const response = await axios.get(`/api/VagasAPI/${id}`);
        // Define os detalhes da vaga obtidos na resposta da API
        setVaga(response.data);

        // Verifica se há categorias e obtém os seus nomes
        if (response.data.categorias && response.data.categorias.$values.length > 0) {
          const categoriaIds = response.data.categorias.$values;
          const categoriaPromises = categoriaIds.map(async (categoriaId) => {
            const categoriaResponse = await axios.get(`/api/CategoriasAPI/${categoriaId}`);
            return categoriaResponse.data.nome;
          });
          // Obtém os nomes das categorias e atualiza o estado
          const categoriaNomes = await Promise.all(categoriaPromises);
          setCategorias(categoriaNomes);
        }
      } catch (error) {
        // Define uma mensagem de erro se ocorrer um problema na requisição
        setError('Erro ao procurar detalhes da vaga, por favor tente novamente mais tarde.');
      }
    };

    fetchVaga();
  }, [id]); // A lista de dependências contém [id], fazendo com que este useEffect corra sempre que o id mudar

  // Função para candidatar-se a uma vaga
  const handleCandidatar = async () => {
    if (!auth.isAuthenticated) {
      alert('Por favor, faça login para se candidatar.');
      return;
    }

    try {
      // Realiza uma requisição POST à API para criar uma candidatura para a vaga atual
      const response = await axios.post(/api/CandidaturasAPI, { VagaFK: id });
      alert('Candidatura realizada com sucesso!');
    } catch (error) {
      // Exibe uma mensagem de erro se ocorrer um problema na requisição
      alert('Erro ao realizar candidatura, por favor tente novamente mais tarde.');
    }
  };

  // Exibe uma mensagem de erro se houver um erro na requisição
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Exibe uma mensagem de carregamento enquanto os detalhes da vaga são obtidos
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
      {/* Exibe o botão de candidatura se o utilizador estiver autenticado e não for administrador */}
      {auth.isAuthenticated && !auth.isAdmin && (
        <button onClick={handleCandidatar}>Candidatar-se</button>
      )}
      <button onClick={() => window.history.back()}>Voltar para a lista</button>
    </div>
  );
};

export default VagaDetalhe;