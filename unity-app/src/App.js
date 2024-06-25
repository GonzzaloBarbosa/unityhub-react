import React from 'react';
import './styles/App.css';
import Header from './componentes/Header';
import SearchBar from './componentes/SearchBar';
import OpportunityList from './componentes/OpportunityList';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <SearchBar />
        <OpportunityList />
      </div>
    </div>
  );
}

export default App;
