import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    // Jeśli nie jesteśmy na stronie głównej, najpierw tam przejdź
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleBookingClick = () => {
    navigate('/booking');
    setIsMenuOpen(false);
  };

  const handleRoutesClick = () => {
    navigate('/routes');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-bold text-blue-600">SUPERBUS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4">
            <button onClick={() => scrollToSection('home')} className="hover:text-blue-600 transition-colors">
              Start
            </button>
            <button onClick={() => scrollToSection('news')} className="hover:text-blue-600 transition-colors">
              Aktualności
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 transition-colors">
              O nas
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 transition-colors">
              Kontakt
            </button>
            <button onClick={handleRoutesClick} className="hover:text-blue-600 transition-colors">
              Rozkład jazdy
            </button>
            <button onClick={handleBookingClick} className="hover:text-blue-600 transition-colors">
              Zamów bus
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection('home')} className="text-left hover:text-blue-600 transition-colors">
              Start
            </button>
            <button onClick={() => scrollToSection('news')} className="text-left hover:text-blue-600 transition-colors">
              Aktualności
            </button>
            <button onClick={() => scrollToSection('about')} className="text-left hover:text-blue-600 transition-colors">
              O nas
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-left hover:text-blue-600 transition-colors">
              Kontakt
            </button>
            <button onClick={handleRoutesClick} className="text-left hover:text-blue-600 transition-colors">
              Rozkład jazdy
            </button>
            <button onClick={handleBookingClick} className="text-left hover:text-blue-600 transition-colors">
              Zamów bus
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}