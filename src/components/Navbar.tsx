import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/#o-nas", label: "O nas" },
    { href: "/#historia", label: "Historia" },
    { href: "/#wystawy", label: "Wystawy główne" }, 
    { href: "/#miejsca", label: "Miejsca" }, 
    { href: "/#ekspresje", label: "Wschodnie ekspresje" }, 
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}
    >
      <div className="container mx-auto flex h-20 max-w-7xl items-center px-4">
        
        <Link 
          to="/" 
          className="text-3xl font-bold text-slate-900 whitespace-nowrap" 
          onClick={closeMenu}
        >
          Nowa <span className="text-red-600">Ekspresja</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex ml-auto mr-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="font-medium text-slate-800 transition-colors hover:text-red-600 text-sm whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ===========================================================
          POPRAWKA: Przycisk "Artyści" teraz przewija do sekcji #artysci
          ===========================================================
        */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/#artysci"
            className="inline-flex h-11 items-center justify-center rounded-full bg-red-600 px-8 font-semibold text-white shadow-sm transition-all hover:bg-red-700 focus-visible:outline-none"
          >
            Artyści
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden ml-auto">
          <button
            className="text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
            <span className="sr-only">Otwórz menu</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full border-t border-slate-200 bg-white shadow-lg xl:hidden">
          <nav className="flex flex-col items-center gap-8 p-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                className="text-lg font-bold text-slate-800 text-center" 
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            {/* POPRAWKA: Przycisk mobilny "Artyści" też przewija do sekcji */}
            <Link 
              to="/#artysci"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3 text-center font-semibold text-white"
              onClick={closeMenu}
            >
              Artyści
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}