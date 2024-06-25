// src/components/Header.js
//barra de navegação com o botão de mudar idioma, botões de login e registo
import React from 'react';
import '../styles/Header.css';


const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="language">PT</span>
        <a href="#ajuda" className="header-link">Ajuda</a>
      </div>
      <div className="header-center">
        <span className="logo">Unity Hub</span>
        <a href="#vagas" className="header-link">Vagas de Voluntariado</a>
      </div>
      <div className="header-right">
        <a href="#entrar" className="header-link">Entrar</a>
        <a href="#registro" className="register-btn">Registar</a>
      </div>
    </header>
  );
}

export default Header;
