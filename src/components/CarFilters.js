// src/components/CarFilters.js
import React from 'react';

function CarFilters({
  brands,
  years,
  selectedBrand,
  startYear,
  endYear,
  sortOrder,
  onBrandChange,
  onStartYearChange,
  onEndYearChange,
  onSortOrderChange,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg shadow-sm w-full h-full">
      <select
        value={selectedBrand}
        onChange={(e) => onBrandChange(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      >
        <option value="">Todas as marcas</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select
        value={startYear}
        onChange={(e) => onStartYearChange(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      >
        <option value="">Ano inicial</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={endYear}
        onChange={(e) => onEndYearChange(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      >
        <option value="">Ano final</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      >
        <option value="asc">Mais velho para mais novo</option>
        <option value="desc">Mais novo para mais velho</option>
      </select>
    </div>
  );
}

export default CarFilters;