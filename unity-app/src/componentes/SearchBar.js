// src/components/SearchBar.js
// barra de pesquisa de vagas e a barra de pesquisa por país.
import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" className="search-input" placeholder="Pesquisar por título, localização..." />
      <button className="search-button">Pesquisar</button>
      <input type="text" className="search-input" placeholder="Pesquisar por país..." />
      <button className="search-button">Pesquisar</button>
    </div>
  );
}

export default SearchBar;

