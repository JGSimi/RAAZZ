// src/components/Header.js
import UserDropdown from './UserDropdown';

function Header() {

  return (
    <>
      <header className="bg-neutralBlack text-neutralWhite p-4 flex justify-around items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-center flex-1">Projeto Raazz</h1>
        <div>
          <UserDropdown />
        </div>
      </header>
      <aside className="bg-black p-2">
        <nav>
          <ul className="flex flex-row justify-around gap-2">
            <li><a href="#" className="text-neutralWhite hover:underline">Home</a></li>
            <li><a href="#" className="text-neutralWhite hover:underline">Sobre</a></li>
            <li><a href="#" className="text-neutralWhite hover:underline">Serviços</a></li>
            <li><a href="#" className="text-neutralWhite hover:underline">Contato</a></li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Header;
