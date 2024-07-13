import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import Select from 'react-select';
import '../styles/CreateVaga.css';

const CreateVaga = ({ onVagaCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    periodoVoluntariado: '',
    local: '',
    descricao: '',
    fotografia: '',
    categoriaIds: []
  });
  const [categorias, setCategorias] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('/api/CategoriasAPI');
        console.log('Resposta da API de categorias:', response.data);
        if (response.data && Array.isArray(response.data.$values)) {
          const categoriasOptions = response.data.$values.map(cat => ({ value: cat.id, label: cat.nome }));
          setCategorias(categoriasOptions);
        } else {
          setCategorias([]);
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        setCategorias([]);
      }
    };

    fetchCategorias();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        fotografia: reader.result
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCategoriaChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      categoriaIds: selectedOptions ? selectedOptions.map(option => option.value) : []
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      nome: formData.nome,
      periodoVoluntariado: formData.periodoVoluntariado,
      local: formData.local,
      descricao: formData.descricao,
      fotografia: formData.fotografia,
      categorias: formData.categoriaIds // Enviar apenas IDs
    };
    console.log('Dados enviados:', payload);

    try {
      const response = await axios.post('/api/VagasAPI', payload);
      console.log('Vaga criada com sucesso', response.data);
      setFeedbackMessage('Vaga criada com sucesso!');
      setFormData({
        nome: '',
        periodoVoluntariado: '',
        local: '',
        descricao: '',
        fotografia: '',
        categoriaIds: []
      });
      if (onVagaCreated) {
        onVagaCreated();
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro ao criar vaga', error.response.data);
        setFeedbackMessage('Erro ao criar vaga: ' + error.response.data);
      } else {
        console.error('Erro ao criar vaga', error.message);
        setFeedbackMessage('Erro ao criar vaga');
      }
    }
  };

  return (
    <div className="container">
      <h2>Criar Nova Vaga</h2>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Período de Voluntariado:</label>
          <input
            type="text"
            name="periodoVoluntariado"
            className="form-control"
            value={formData.periodoVoluntariado}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Local:</label>
          <input
            type="text"
            name="local"
            className="form-control"
            value={formData.local}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            name="descricao"
            className="form-control"
            value={formData.descricao}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Fotografia:</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Categorias:</label>
          <Select
            isMulti
            options={categorias}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleCategoriaChange}
            value={categorias.filter(option => formData.categoriaIds.includes(option.value))}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-vaga">Criar Vaga</button>
          <button type="button" className="btn-vaga btn-cancel" onClick={onCancel}>Voltar à Lista</button>
        </div>
      </form>
    </div>
  );
};

export default CreateVaga;