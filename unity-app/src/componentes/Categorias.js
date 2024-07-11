// componentes/Categorias.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import '../styles/Categorias.css';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [newCategoria, setNewCategoria] = useState('');
  const [editCategoria, setEditCategoria] = useState(null);
  const [editCategoriaName, setEditCategoriaName] = useState('');

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('/api/CategoriasAPI');
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleAddCategoria = async () => {
    if (newCategoria.trim()) {
      try {
        await axios.post('/api/CategoriasAPI', { nome: newCategoria });
        setNewCategoria('');
        fetchCategorias();
      } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
      }
    }
  };

  const handleDeleteCategoria = async (id) => {
    try {
      await axios.delete(`/api/CategoriasAPI/${id}`);
      fetchCategorias();
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
    }
  };

  const handleEditCategoria = async () => {
    if (editCategoriaName.trim()) {
      try {
        await axios.put(`/api/CategoriasAPI/${editCategoria.id}`, { id: editCategoria.id, nome: editCategoriaName });
        setEditCategoria(null);
        setEditCategoriaName('');
        fetchCategorias();
      } catch (error) {
        console.error('Erro ao editar categoria:', error);
      }
    }
  };

  return (
    <div className="categorias-container">
      <h2>Gestão de Categorias</h2>
      <div className="add-categoria">
        <input
          type="text"
          placeholder="Nova Categoria"
          value={newCategoria}
          onChange={(e) => setNewCategoria(e.target.value)}
        />
        <button onClick={handleAddCategoria}>Adicionar</button>
      </div>
      <ul className="categoria-list">
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            {editCategoria && editCategoria.id === categoria.id ? (
              <>
                <input
                  type="text"
                  value={editCategoriaName}
                  onChange={(e) => setEditCategoriaName(e.target.value)}
                />
                <div className="buttons">
                  <button className="btn-edit" onClick={handleEditCategoria}>Salvar</button>
                  <button className="btn-edit" onClick={() => setEditCategoria(null)}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <span className="categoria-name">{categoria.nome}</span>
                <div className="buttons">
                  <button className="btn-edit" onClick={() => {
                    setEditCategoria(categoria);
                    setEditCategoriaName(categoria.nome);
                  }}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDeleteCategoria(categoria.id)}>Excluir</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;
