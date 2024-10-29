// src/components/Hero.js
function Hero() {
    return (
      <section className="bg-neutralBlack text-neutralWhite py-20 text-center">
        <h2 className="text-5xl font-extrabold mb-4">Bem-vindo ao Raazz!</h2>
        <p className="text-lg mb-8 text-lightGray">Seu hub de informações automotivas, onde entusiastas se encontram.</p>
        <button className="px-6 py-3 bg-neutralWhite text-neutralBlack font-semibold rounded-full hover:bg-lightGray transition-colors duration-300">
          Explore Carros
        </button>
      </section>
    );
  }
  
  export default Hero;
  