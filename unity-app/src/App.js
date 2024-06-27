import React from 'react';
import './styles/App.css';
import NavBar from './componentes/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './paginas/Home';
import Sobre from './paginas/Sobre';
import Contacto from './paginas/Contacto';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/sobre" element= {<Sobre/>}/>
        <Route path="/contacto" element= {<Contacto/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
