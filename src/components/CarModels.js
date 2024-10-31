// src/components/CarModels.js
import { useEffect, useState } from 'react';
import CarCard from './CarCard';
import CarSearch from './CarSearch';
import CarFilters from './CarFilters';

function CarModels() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const carsPerPage = 21;
  const pageRange = 5;

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

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    setCurrentPage(1);
  };

  const handleStartYearChange = (value) => {
    setStartYear(value);
    setCurrentPage(1);
  };

  const handleEndYearChange = (value) => {
    setEndYear(value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

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

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const uniqueBrands = [...new Set(cars.map((car) => car.car))];
  const uniqueYears = [...new Set(cars.map((car) => car.car_model_year))].sort((a, b) => a - b);

  return (
    <div className="w-full bg-gradient-to-b from-black to-gray-900">
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <section id="cars" className="py-16 bg-white border-8 rounded-xl flex flex-col justify-center self-center w-full sm:w-full md:w-12/12 lg:w-11/12">
            <h3 className="text-3xl font-bold text-neutralBlack text-center mb-10">Destaques de Carros</h3>
            
            <div className="flex justify-center p-5">
            <CarSearch searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
            </div>
            <div className="flex justify-center p-5" >
            <CarFilters
              brands={uniqueBrands}
              years={uniqueYears}
              selectedBrand={selectedBrand}
              startYear={startYear}
              endYear={endYear}
              sortOrder={sortOrder}
              onBrandChange={handleBrandChange}
              onStartYearChange={handleStartYearChange}
              onEndYearChange={handleEndYearChange}
              onSortOrderChange={handleSortOrderChange}
            />
            </div>

            {loading ? (
              <p className="text-center">Carregando...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-full mx-auto px-4">
                  {currentCars.map((car) => (
                    <CarCard
                      key={car.id}
                      name={car.car}
                      model={car.car_model}
                      year={car.car_model_year}
                      price={car.price}
                    />
                  ))}
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                  <button
                    onClick={prevPage}
                    className="px-4 py-2 border rounded-md bg-gray-200"
                    disabled={currentPage === 1}
                  >
                    &lt; Anterior
                  </button>

                  {visiblePages.map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 border rounded-md ${
                        currentPage === number ? "bg-blue-500 text-white" : "bg-white text-black"
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={nextPage}
                    className="px-4 py-2 border rounded-md bg-gray-200"
                    disabled={currentPage === totalPages}
                  >
                    Próxima &gt;
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default CarModels;