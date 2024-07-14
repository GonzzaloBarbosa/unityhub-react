import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import '../styles/CandidaturasList.css';

const CandidaturasList = () => {
  const [candidaturas, setCandidaturas] = useState([]);
  const [error, setError] = useState(null);

  // useEffect é utilizado para procurar candidaturas quando o componente é montado
  useEffect(() => {
    const fetchCandidaturas = async () => {
      try {
        // Realiza uma requisição GET à API para obter todas as candidaturas
        const response = await axios.get('/api/CandidaturasAPI');
        // Define as candidaturas obtidas na resposta da API
        setCandidaturas(response.data);
      } catch (error) {
        // Define uma mensagem de erro se ocorrer um problema na requisição
        setError('Erro ao procurar candidaturas, por favor tente novamente mais tarde.');
      }
    };

    fetchCandidaturas();
  }, []); // A lista de dependências vazia faz com que este useEffect corra apenas uma vez

  // Função para aceitar uma candidatura
  const handleAccept = async (id) => {
    try {
      // Realiza uma requisição POST à API para aceitar a candidatura com o ID fornecido
      await axios.post(`/api/CandidaturasAPI/accept/${id}`);
      // Atualiza o estado das candidaturas localmente para refletir a mudança
      setCandidaturas(prevState => prevState.map(candidatura => 
        candidatura.id === id ? { ...candidatura, estado: 'Aceite' } : candidatura
      ));
    } catch (error) {
      // Define uma mensagem de erro se ocorrer um problema na requisição
      setError('Erro ao aceitar candidatura, por favor tente novamente mais tarde.');
    }
  };

  // Função para rejeitar uma candidatura
  const handleReject = async (id) => {
    try {
      // Realiza uma requisição POST à API para rejeitar a candidatura com o ID fornecido
      await axios.post(`/api/CandidaturasAPI/reject/${id}`);
      // Atualiza o estado das candidaturas localmente para refletir a mudança
      setCandidaturas(prevState => prevState.map(candidatura => 
        candidatura.id === id ? { ...candidatura, estado: 'Rejeitada' } : candidatura
      ));
    } catch (error) {
      // Define uma mensagem de erro se ocorrer um problema na requisição
      setError('Erro ao rejeitar candidatura, por favor tente novamente mais tarde.');
    }
  };

  return (
    <div className="candidaturas-list">
      <h2>Candidaturas</h2>
      {/* Exibe a mensagem de erro, se houver */}
      {error && <p className="error">{error}</p>}
      {/* Verifica se existem candidaturas para exibir */}
      {candidaturas.length > 0 ? (
        <ul>
          {candidaturas.map((candidatura) => (
            <li key={candidatura.id}>
              {/* Exibe o nome da vaga e o estado da candidatura */}
              {candidatura.vaga.nome} - {candidatura.estado}
              {/* Botão para aceitar a candidatura */}
              <button onClick={() => handleAccept(candidatura.id)}>Aceitar</button>
              {/* Botão para rejeitar a candidatura */}
              <button onClick={() => handleReject(candidatura.id)}>Rejeitar</button>
            </li>
          ))}
        </ul>
      ) : (
        // Exibe uma mensagem se não houver candidaturas
        <p>Nenhuma candidatura encontrada.</p>
      )}
    </div>
  );
};

export default CandidaturasList;