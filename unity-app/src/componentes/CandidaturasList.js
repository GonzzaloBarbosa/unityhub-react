import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import '../styles/CandidaturasList.css';

const CandidaturasList = () => {
    const [candidaturas, setCandidaturas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCandidaturas = async () => {
            try {
                const response = await axios.get('/api/CandidaturasAPI');
                console.log('Resposta da API:', response.data);
                if (response.data && Array.isArray(response.data)) {
                    setCandidaturas(response.data);
                } else if (response.data && response.data.$values) {
                    setCandidaturas(response.data.$values);
                } else {
                    setError('Formato de resposta inesperado.');
                }
            } catch (err) {
                console.error('Erro ao buscar candidaturas:', err);
                setError('Erro ao buscar candidaturas.');
            }
        };

        fetchCandidaturas();
    }, []);

    const handleAcao = async (id, acao) => {
        try {
            let url = '';

            if (acao === 'delete') {
                url = `/api/CandidaturasAPI/${id}`;
                console.log('URL para delete:', url);
                await axios.delete(url);
            } else {
                url = `/api/CandidaturasAPI/${acao}/${id}`;
                console.log('URL para acao:', url);
                await axios.post(url);
            }

            // Atualiza a lista de candidaturas após a ação
            setCandidaturas(candidaturas.map(candidatura => {
                if (candidatura.id === id) {
                    if (acao === 'delete') {
                        return null; // Remove a candidatura deletada
                    } else {
                        candidatura.estado = acao === 'accept' ? 'Aceite' : 'Rejeitada';
                    }
                }
                return candidatura;
            }).filter(candidatura => candidatura !== null));
        } catch (err) {
            console.error('Erro na ação:', err);
            setError(`Erro ao ${acao} a candidatura.`);
        }
    };

    return (
        <div className="candidaturas-list" style={{ marginTop: '60px' }}>
            <h1>Todas as Candidaturas</h1>
            {error && <p className="error">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Utilizador</th>
                        <th>Vaga</th>
                        <th>Estado</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(candidaturas) && candidaturas.length > 0 ? (
                        candidaturas.map(candidatura => (
                            <tr key={candidatura.id}>
                                <td>{candidatura.utilizador.email}</td>
                                <td>{candidatura.vaga.nome}</td>
                                <td>{candidatura.estado}</td>
                                <td>
                                    {candidatura.estado === 'Pendente' ? (
                                        <>
                                            <button onClick={() => handleAcao(candidatura.id, 'accept')} className="accept-button">Aceitar</button>
                                            <button onClick={() => handleAcao(candidatura.id, 'reject')} className="reject-button">Rejeitar</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleAcao(candidatura.id, 'delete')} className="delete-button">Eliminar</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Nenhuma candidatura encontrada.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CandidaturasList;
