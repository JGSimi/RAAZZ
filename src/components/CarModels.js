// src/components/CarModels.js
import { useEffect, useState } from 'react';
import CarCard from './CarCard';

function CarModels() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Para busca de marca e modelo
  const [selectedBrand, setSelectedBrand] = useState(''); // Para filtro de marca
  const [startYear, setStartYear] = useState(''); // Ano inicial do intervalo
  const [endYear, setEndYear] = useState(''); // Ano final do intervalo
  const [sortOrder, setSortOrder] = useState('asc'); // Ordenação (ascendente ou descendente)

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://myfakeapi.com/api/cars");
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Erro na resposta da API:", errorText);
          return;
        }
        
        const data = await response.json();
        console.log("Carros recebidos:", data);

        if (data.cars) {
          setCars(data.cars);
        } else {
          console.warn("Nenhum carro encontrado na resposta.");
          setCars([]);
        }
      } catch (error) {
        console.error("Erro ao buscar carros da API", error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Funções de manipulação dos filtros e da barra de pesquisa
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleBrandChange = (event) => setSelectedBrand(event.target.value);
  const handleStartYearChange = (event) => setStartYear(event.target.value);
  const handleEndYearChange = (event) => setEndYear(event.target.value);
  const handleSortOrderChange = (event) => setSortOrder(event.target.value);

  // Filtra e ordena os carros com base nos critérios selecionados
  const filteredCars = cars
    .filter((car) => {
      const matchesSearch = car.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            car.car_model.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand = selectedBrand === '' || car.car === selectedBrand;

      const matchesStartYear = startYear === '' || car.car_model_year >= parseInt(startYear);
      const matchesEndYear = endYear === '' || car.car_model_year <= parseInt(endYear);

      return matchesSearch && matchesBrand && matchesStartYear && matchesEndYear;
    })
    .sort((a, b) => {
      return sortOrder === 'asc'
        ? a.car_model_year - b.car_model_year
        : b.car_model_year - a.car_model_year;
    });

  // Extrai listas únicas de marcas e anos para os filtros
  const uniqueBrands = [...new Set(cars.map((car) => car.car))];
  const uniqueYears = [...new Set(cars.map((car) => car.car_model_year))].sort((a, b) => a - b);

  return (
    <section id="cars" className="py-16 bg-lightGray">
      <h3 className="text-3xl font-bold text-neutralBlack text-center mb-10">Destaques de Carros</h3>
      
      {/* Filtros e barra de pesquisa */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Buscar por marca ou modelo"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md"
        />

        <select
          value={selectedBrand}
          onChange={handleBrandChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Todas as marcas</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          value={startYear}
          onChange={handleStartYearChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Ano inicial</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={endYear}
          onChange={handleEndYearChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Ano final</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="asc">Mais velho para mais novo</option>
          <option value="desc">Mais novo para mais velho</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              name={car.car}
              model={car.car_model}
              year={car.car_model_year}
              price={car.price}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CarModels;
