import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

// DŁUŻSZY OPIS DLA DESKTOPU
const longDescription = `
  Nowa Ekspresja to przełomowy polski nurt artystyczny lat 80., który narodził się jako 
  ostra reakcja na estetyczną stagnację i zjawiska socrealizmu. 
  Kierunek ten, charakteryzujący się intensywną emocjonalnością, powrotem do figuracji 
  i surowym kolorem, był głosem sprzeciwu i poszukiwania autentyczności. 
  Nasza strona jest dedykowana tej dynamicznej epoce, prezentując sylwetki 33 
  kluczowych artystów, których połączyła wspólna idea odnowy twórczej i potrzeba 
  bezpośredniego wyrazu.
`;

// KRÓTKI OPIS DLA MOBILE/DEFAULT
const shortDescription = `
  Strona poświęcona kierunkowi Nowa Ekspresja, 
  przedstawiająca sylwetki 33 artystów, których 
  połączyła ta wspólna idea i potrzeba twórcza.
`;

export default function Hero() {
  return (
    <section className="flex items-center bg-white py-20 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEWA STRONA: OPIS (nowa treść) */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-slate-800 leading-tight">
              Nowa <span className="text-red-600">Ekspresja</span>
            </h1>

            <div className="w-24 h-0.5 bg-red-500 my-6 lg:my-8"></div>

            {/* 2. Nowy opis (warunkowo wyświetlany) */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl lg:hidden">
              {/* Krótki opis dla mobile/tablet */}
              {shortDescription.trim()}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl hidden lg:block">
              {/* Dłuższy opis dla desktopu */}
              {longDescription.trim()}
            </p>
            
            {/* 3. POPRAWIONE PRZYCISKI (jako Linki do sekcji) */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                // Zmieniono na link do sekcji 'O nas'
                to="/#o-nas" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              >
                <span>O nas</span>
                <ArrowRight size={20} />
              </Link>

              <Link
                // Zmieniono na link do sekcji 'Historia'
                to="/#historia" 
                className="border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <Users size={20} />
                <span>Historia</span> 
              </Link>
            </div>
          </div>
          
          {/* PRAWA STRONA: OBRAZ (nowe logo) */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {/* 4. Ścieżka do logo - upewnij się, że plik jest w public/assets/Logo.jpg */}
            <img
              src="/assets/Logo.jpg"
              alt="Logo Nowa Ekspresja"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
              <p className="text-slate-800 text-sm font-semibold">
                Kierunek artystyczny lat 80.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}