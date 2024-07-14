// Home.js
import React, { useState } from 'react';
import Hero from '../componentes/Hero';
import VagasGrid from '../componentes/VagasGrid';
import '../styles/Home.css'; // Importe o CSS para os estilos personalizados

function Home() {
  const [searchCriteria, setSearchCriteria] = useState({ destination: '', category: '' });

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <>
      <Hero />
      <div className="vagas-grid-container">
        <VagasGrid searchCriteria={searchCriteria} />
      </div>
    </>
  );
}

export default Home;