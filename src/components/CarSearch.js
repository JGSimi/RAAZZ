// src/components/CarSearch.js
import React from 'react';

function CarSearch({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar por marca ou modelo"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="p-2 border border-gray-300 rounded-md w-full text-center"
    />
  );
}

export default CarSearch;