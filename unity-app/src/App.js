import React from 'react';
import './styles/App.css';
import NavBar from './componentes/NavBar';
import OpportunityList from './componentes/OpportunityList';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <OpportunityList />
      </div>
    </div>
  );
}

export default App;
