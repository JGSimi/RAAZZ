// src/components/CarCard.js
function CarCard({ name, model, year, price }) {
    return (
      <div className="bg-neutralWhite p-4 border-2 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
        <div className="p-4">
          <h4 className="text-xl font-bold text-darkGray mb-2">{name} {model}</h4>
          <p className="text-mediumGray text-sm">Ano: {year}</p>
          <p className="text-mediumGray text-sm">Preço médio: {price}</p>
        </div>
      </div>
    );
  }
  
  export default CarCard;
  