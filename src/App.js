// src/App.js
import Header from './components/Header';
import Hero from './components/Hero';
import CarModels from './components/CarModels';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-neutralWhite min-h-screen flex flex-col">
      <Header/>
      <main className="flex-grow bg-neutralBlack p-0 sm:p-0 md:p-12 lg:p-16 flex flex-col justify-center">
        <section className="max-w-5xl mx-auto px-4">
          <Hero/>
        </section>
        <section className="min-w-full flex flex-col justify-center">
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
