import { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom'; // Usunięto
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Przykładowe dane do slidera
const placesArtworks = [
  {
    src: 'https://placehold.co/600x400/10b981/white?text=Warszawa',
    alt: 'Warszawska ASP',
  },
  {
    src: 'https://placehold.co/600x400/3b82f6/white?text=Wrocław',
    alt: 'Wrocławska ASP',
  },
  {
    src: 'https://placehold.co/600x400/6366f1/white?text=Trójmiasto',
    alt: 'BWA Sopot',
  },
];

export default function PlacesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Używamy useCallback, aby funkcja była stabilna
  // i nie powodowała resetowania interwału w useEffect
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === placesArtworks.length - 1 ? 0 : prevIndex + 1
    );
  }, [placesArtworks.length]); // Zależność od długości tablicy

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      // POPRAWKA: Było prevIndex + 1, co jest błędem
      prevIndex === 0 ? placesArtworks.length - 1 : prevIndex - 1
    );
  }, [placesArtworks.length]); // Zależność od długości tablicy

  // Efekt do automatycznego przewijania
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Zmieniaj co 5 sekund
    
    // Czyścimy interwał przy odmontowaniu komponentu
    return () => clearInterval(interval);
    
    // POPRAWKA: Zależność od stabilnej funkcji nextSlide
  }, [nextSlide]);

  return (
    // ID sekcji, do której przewijamy
    <section id="miejsca" className="bg-gray-50 py-20 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* NOWA STRUKTURA: 
          - 'items-start' wyrównuje wszystko do góry.
          - 'lg:gap-x-16' (odstęp poziomy) i 'lg:gap-y-4' (odstęp pionowy)
          - Zmieniono 'gap-12' na 'gap-4' dla mniejszego odstępu na mobile
        */}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-4 items-start">
          
          {/* === 1. TYTUŁ === */}
          {/* Mobile: order-1 (Pierwszy) */}
          {/* Desktop: Kolumna 1, Wiersz 1 */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-1 lg:col-start-1 lg:row-start-1">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-800 leading-tight">
              Kluczowe Ośrodki
            </h2>
            <div className="w-24 h-1 bg-red-600 my-6"></div>
          </div>

          {/* === 2. SLIDER === */}
          {/* Mobile: order-2 (Drugi) */}
          {/* Desktop: Kolumna 2, Wiersz 1 (i rozciąga się na 2 wiersze) */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {placesArtworks.map((art, index) => (
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
              {placesArtworks.map((_, index) => (
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
                Chociaż Nowa Ekspresja była ruchem ogólnopolskim, jego siła koncentrowała się w kilku kluczowych ośrodkach akademickich i artystycznych.
              </p>
              <p>
                <strong>Dzieło 1: Warszawa</strong> - Serce ruchu, z Akademią Sztuk Pięknych i kluczowymi wystawami, jak "Arsenał '88".
                <br />
                <strong>Dzieło 2: Wrocław</strong> - Niezwykle silny ośrodek skupiony wokół tamtejszej ASP, miejsce debiutu wielu artystów.
                <br />
                <strong>Dzieło 3: Trójmiasto</strong> - Niezależna scena Gdańska i Sopotu, gdzie odbyła się słynna "Ekspresja lat 80."
              </p>
            </div>
            
            {/* POPRAWKA: Zastąpiono <Link> tagiem <a> */}
            <a
              href="/#miejsca"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 font-semibold text-white shadow-sm transition-all hover:bg-red-700 focus-visible:outline-none hover:-translate-y-1"
            >
              Poznaj te miejsca
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

