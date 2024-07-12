import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import '../styles/CreateVaga.css'; // Importar o CSS específico para o componente

const CreateVaga = ({ onVagaCreated }) => {
  const [nome, setNome] = useState('');
  const [periodoVoluntariado, setPeriodoVoluntariado] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoriaId, setCategoriaId] = useState(''); // Alterado para um valor único
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('/api/CategoriasAPI');
        if (Array.isArray(response.data)) {
          setCategorias(response.data);
        } else {
          setCategorias([]);
        }
      } catch (error) {
        console.error('Error fetching categorias', error);
        setCategorias([]);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novaVaga = {
      nome,
      periodoVoluntariado,
      local,
      descricao,
      categoriaIds: [categoriaId], // Enviar como um array com um único valor
    };

    try {
      const response = await axios.post('/api/VagasAPI', novaVaga);
      console.log('Vaga criada com sucesso', response.data);
      // Limpar formulário após a criação
      setNome('');
      setPeriodoVoluntariado('');
      setLocal('');
      setDescricao('');
      setCategoriaId('');
      if (onVagaCreated) {
        onVagaCreated(); // Chamar a função onVagaCreated após a criação
      }
    } catch (error) {
      console.error('Error creating vaga', error);
    }
  };

  return (
    <div className="container">
      <h2>Criar Nova Vaga</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Período de Voluntariado:</label>
          <input
            type="text"
            className="form-control"
            value={periodoVoluntariado}
            onChange={(e) => setPeriodoVoluntariado(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Local:</label>
          <input
            type="text"
            className="form-control"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Categorias:</label>
          <select
            className="form-control"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {Array.isArray(categorias) && categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Criar Vaga</button>
      </form>
    </div>
  );
};

export default CreateVaga;
