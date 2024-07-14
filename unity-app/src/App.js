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
import VagasList from './componentes/VagasList';
import VagaDetalhes from './componentes/VagaDetalhes';
import CandidaturasList from './componentes/CandidaturasList';
import AcessoNegado from './componentes/AcessoNegado';
import Protected from './componentes/Protected';
import { useAuth } from './services/AuthContext.js';

function App() {
  // Obtém o estado de autenticação a partir do contexto
  const { auth } = useAuth();

  return (
    <div className="App">
      <NavBar /> {/* Renderiza a barra de navegação */}
      <Routes> {/* Defina as rotas da aplicação */}
        {/* Defina a rota para a página inicial */}
        <Route path="/" element={<Home />} />
        {/* Defina a rota para a página "Sobre" */}
        <Route path="/sobre" element={<Sobre />} />
        {/* Defina a rota para a página de contacto */}
        <Route path="/contacto" element={<Contacto />} />
        {/* Defina a rota para a página de login e registo */}
        <Route path="/login-register" element={<LoginRegister />} />
        
        {/* Defina uma rota protegida para o componente de utilizadores, acesso exclusivo só para administradores autenticados */}
        <Route
          path="/utilizadores"
          element={
            <Protected isAuth={auth.isAuthenticated} isAdmin={auth.isAdmin} adminOnly>
              <Utilizadores />
            </Protected>
          }
        />
        {/* Defina uma rota protegida para o componente de categorias, acesso exclusivo só para administradores autenticados */}
        <Route
          path="/categorias"
          element={
            <Protected isAuth={auth.isAuthenticated} isAdmin={auth.isAdmin} adminOnly>
              <Category />
            </Protected>
          }
        />
        {/* Defina uma rota protegida para o componente que lista as vagas, acesso exclusivo só para utilizadores autenticados */}
        <Route
          path="/vagas"
          element={
            <Protected isAuth={auth.isAuthenticated}>
              <VagasList />
            </Protected>
          }
        />
        {/* Defina uma rota protegida para o componente de detalhes da vaga, acesso exclusivo só para utilizadores autenticados */}
        <Route
          path="/vagas/:id"
          element={
            <Protected isAuth={auth.isAuthenticated}>
              <VagaDetalhes />
            </Protected>
          }
        />
        {/* Defina uma rota protegida para o componente que lista as candidaturas, acesso exclusivo só para administradores autenticados */}
        <Route
          path="/candidaturas"
          element={
            <Protected isAuth={auth.isAuthenticated} isAdmin={auth.isAdmin} adminOnly>
              <CandidaturasList />
            </Protected>
          }
        />
        {/* Defina a rota para a página de acesso negado */}
        <Route path="/acesso-negado" element={<AcessoNegado />} />
      </Routes>
    </div>
  );
}

export default App;
