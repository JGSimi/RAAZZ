// src/components/Hero.js
function Hero() {
    return (
      <section className="bg-neutralWhite text-neutralBlack py-20 text-center">
        <h2 className="text-5xl font-extrabold mb-4">Bem-vindo ao Raazz!</h2>
        <p className="text-lg mb-8 text-darkGray">Seu hub de informações automotivas, onde entusiastas se encontram.</p>
        <button className="px-6 py-3 bg-neutralBlack text-neutralWhite font-semibold rounded-full hover:bg-darkGray transition-colors duration-300">
          Explore Carros
        </button>
      </section>
    );
  }
  
  export default Hero;
  