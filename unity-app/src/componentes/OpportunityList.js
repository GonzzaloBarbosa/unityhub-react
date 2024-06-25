// src/components/OpportunityList.js
import React from 'react';
import '../styles/OpportunityList.css';

const OpportunityList = () => {
  const opportunities = [
    { id: 1, title: "Oportunidade 1", description: "Descrição da oportunidade 1" },
    { id: 2, title: "Oportunidade 2", description: "Descrição da oportunidade 2" },
    { id: 3, title: "Oportunidade 3", description: "Descrição da oportunidade 3" },
  ];

  return (
    <div className="opportunity-list">
      {opportunities.map(opportunity => (
        <div key={opportunity.id} className="opportunity-item">
          <h3>{opportunity.title}</h3>
          <p>{opportunity.description}</p>
        </div>
      ))}
    </div>
  );
}

export default OpportunityList;
