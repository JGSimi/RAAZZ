// src/components/Header.js
function Header() {
    return (
      <header className="bg-neutralBlack text-neutralWhite p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Projeto Raazz</h1>
        <nav>
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <li><a href="#home" className="hover:text-lightGray">Início</a></li>
            <li><a href="#cars" className="hover:text-lightGray">Carros</a></li>
            <li><a href="#about" className="hover:text-lightGray">Sobre</a></li>
            <li><a href="#contact" className="hover:text-lightGray">Contato</a></li>
          </ul>
        </nav>
      </header>
    );
  }  
  
  export default Header;
  