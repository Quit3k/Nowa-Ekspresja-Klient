import { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom'; // Usunięto, aby naprawić błąd kontekstu routera
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Przykładowe dane do slidera historii
const historyArtworks = [
  {
    src: 'https://placehold.co/600x400/1e293b/white?text=Archiwum+1',
    alt: 'Archiwalne zdjęcie 1',
  },
  {
    src: 'https://placehold.co/600x400/475569/white?text=Archiwum+2',
    alt: 'Archiwalne zdjęcie 2',
  },
  {
    src: 'https://placehold.co/600x400/64748b/white?text=Archiwum+3',
    alt: 'Archiwalne zdjęcie 3',
  },
];

export default function HistorySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Używamy useCallback dla stabilności w useEffect
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === historyArtworks.length - 1 ? 0 : prevIndex + 1
    );
  }, [historyArtworks.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      // POPRAWKA: Było prevIndex + 1, co jest błędem
      prevIndex === 0 ? historyArtworks.length - 1 : prevIndex - 1
    );
  }, [historyArtworks.length]);

  // Efekt do automatycznego przewijania
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Zmieniaj co 5 sekund
    
    return () => clearInterval(interval);
    
    // POPRAWKA: Zależność od stabilnej funkcji nextSlide
  }, [nextSlide]);

  return (
    // ID sekcji, do której przewijamy
    <section id="historia" className="bg-gray-50 py-20 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* NOWA STRUKTURA: 
          Mobile: flex flex-col (kolejność sterowana przez 'order-')
          Desktop: grid grid-cols-2 (układ sterowany przez 'lg:col-start-' i 'lg:row-start-')
          
          POPRAWKA: 
          - 'items-start' wyrównuje wszystko do góry.
          - 'lg:gap-x-16' (odstęp poziomy)
          - POPRAWKA: Zmniejszono odstęp pionowy z 'lg:gap-y-8' na 'lg:gap-y-4'
        */}
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-4 items-start">
          
          {/* === 1. TYTUŁ === */}
          {/* Mobile: order-1 (Pierwszy) */}
          {/* Desktop: Kolumna 1, Wiersz 1 */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-1 lg:col-start-1 lg:row-start-1">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-800 leading-tight">
              Korzenie Buntu: Krótka Historia
            </h2>
            <div className="w-24 h-1 bg-red-600 my-6"></div>
          </div>

          {/* === 2. SLIDER === */}
          {/* Mobile: order-2 (Drugi) */}
          {/* Desktop: Kolumna 2, Wiersze 1 + 2 */}
          {/* POPRAWKA: Przywrócono 'lg:row-span-2' aby slider zajął pełną wysokość obok tekstu */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {historyArtworks.map((art, index) => (
                <img
                  key={index}
                  src={art.src}
                  alt={art.alt}
                  // POPRAWKA: z flex-shrink-0 na shrink-0 (sugestia Tailwind)
                  className="w-full h-full object-cover shrink-0"
                />
              ))}
            </div>

            {/* Strzałki */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 p-2 rounded-full text-slate-800 hover:bg-white transition-opacity duration-300 opacity-70 hover:opacity-100"
              aria-label="Poprzedni slajd"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 p-2 rounded-full text-slate-800 hover:bg-white transition-opacity duration-300 opacity-70 hover:opacity-100"
              aria-label="Następny slajd"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Kropki na dole */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {historyArtworks.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)} // Dodana opcja klikania kropek
                  className={`h-2 w-2 rounded-full cursor-pointer ${
                    currentIndex === index ? 'bg-white' : 'bg-white/50'
                  } transition-all`}
                />
              ))}
            </div>
          </div>

          {/* === 3. TEKST + PRZYCISK === */}
          {/* Mobile: order-3 (Trzeci) */}
          {/* Desktop: Kolumna 1, Wiersz 2 */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-3 lg:col-start-1 lg:row-start-2">
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Lata 80. w Polsce to nie tylko czas politycznych przełomów, 
                ale także artystycznej rewolucji. Nowa Ekspresja 
                narodziła się jako głos pokolenia, które miało dość 
                skostniałych form i akademickiej powagi.
              </p>
              <p>
                Był to ruch surowy, autentyczny i często brutalny w swoim 
                przekazie. Artyści odrzucili kalkulację na rzecz 
                instynktownego, "dzikiego" malarstwa, czerpiąc 
                inspiracje z niemieckiego neoekspresjonizmu i własnych, 
                wewnętrznych demonów.
              </p>
            </div>
            
            {/* POPRAWKA: Zastąpiono <Link> zwykłym tagiem <a>, aby uniknąć błędu kontekstu routera */}
            <a
              href="/#historia"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 font-semibold text-white shadow-sm transition-all hover:bg-red-700 focus-visible:outline-none hover:-translate-y-1"
            >
              Dowiedz się więcej
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

