import React from 'react';
import '../styles/SearchBar.css';

function SearchBar() {
  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="search-input">
          <label htmlFor="destination">Procurar destino:</label>
          <input type="text" id="destination" placeholder="Pesquisar países..." />
        </div>
        <div className="search-input">
          <label htmlFor="volunteer-type">Tipo de Voluntariado:</label>
          <select id="volunteer-type">
            <option value="">Selecione o tipo de voluntariado</option>
            <option value="education">Educação</option>
            <option value="health">Saúde</option>
            <option value="environment">Meio Ambiente</option>
          </select>
        </div>
        <button className="search-button">Pesquisar</button>
      </div>
    </div>
  );
}

export default SearchBar;
