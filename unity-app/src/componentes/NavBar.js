// componentes/NavBar.js
import React, { useState } from 'react';
import '../styles/NavBar.css';
import { MenuItens, AdminMenuItens } from './MenuItens';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext'; // Importar AuthContext

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const { auth, logout } = useAuth(); // Usar AuthContext
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = auth.isAdmin ? AdminMenuItens : MenuItens; // Menu para admin

  return (
    <nav className="NavbarItems">
      <div className="navbar-logo-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="navbar-logo">UnityHub</h1>
        </Link>
      </div>
      <div className='menu-icons' onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link className={item.cName} to={item.url}>
              <i className={item.icone}></i> {item.titulo}
            </Link>
          </li>
        ))}
        {auth.isAuthenticated ? (
          <button onClick={handleLogout}>Sair</button>
        ) : (
          <Link to="/login-register">
            <button>Entrar</button>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
