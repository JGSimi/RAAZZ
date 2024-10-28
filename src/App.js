// src/App.js
import Header from './components/Header';
import Hero from './components/Hero';
import CarModels from './components/CarModels';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-neutralWhite min-h-screen flex flex-col">
      <Header/>
      <main className="flex-grow">
        <section className="max-w-5xl mx-auto px-4">
          <Hero/>
        </section>
        <section className="mx-auto px-4">
          <CarModels/>
        </section>
        <section>

        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
