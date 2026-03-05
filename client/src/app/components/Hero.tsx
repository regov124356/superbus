import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Hero() {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/booking');
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
          Twój cel, nasza wspólna droga
        </h1>
        <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
          SuperBus - Profesjonalny transport autobusowy dla firm, grup i eventów
        </p>
        <button
          onClick={handleBookingClick}
          className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          Zapytaj o Transport
          <ArrowRight size={20} />
        </button>
        <p className="mt-6 text-lg">
          Lub zadzwoń na numer <span className="font-semibold">601-481-319</span>
        </p>
      </div>
    </section>
  );
}