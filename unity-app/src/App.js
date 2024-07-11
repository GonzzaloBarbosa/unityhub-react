import React from 'react';
import './styles/App.css';
import NavBar from './componentes/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './paginas/Home';
import Sobre from './paginas/Sobre';
import Contacto from './paginas/Contacto';
import LoginRegister from './paginas/SignIn';
import Category from './paginas/Categorias';
import 'bootstrap/dist/css/bootstrap.min.css';
import Utilizadores from './componentes/Utilizadores';
import { AuthProvider } from './services/AuthContext.js'; // Importar AuthProvider

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/categorias" element={<Category />} />
          <Route path="/utilizadores" element={<Utilizadores />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
