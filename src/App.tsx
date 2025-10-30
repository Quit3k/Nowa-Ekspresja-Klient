import { useEffect } from 'react';
import { Routes, Route, useLocation, useParams, Link } from 'react-router-dom';

// Importujemy komponenty, które stworzyliśmy
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ArtistListSection from './components/ArtistListSection';
import HistorySection from './components/HistorySection';

// --- NOWE IMPORTY ---
import MainExhibitionsSection from './components/MainExhibitionsSection';
import PlacesSection from './components/PlacesSection';
import EasternExpressionsSection from './components/EasternExpressionsSection';

// --- Komponent do obsługi przewijania ---
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Jeśli nie ma hasha, przewiń na górę (np. przy przejściu na /artysci/nazwa)
    if (!hash) {
      window.scrollTo(0, 0);
    }

    // Jeśli w adresie URL jest hash (np. #o-nas), przewiń do tego elementu.
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0); 
    }
  }, [pathname, hash]); 

  return null;
}

// --- Komponent grupujący sekcje strony głównej ---
function HomePageContent() {
  return (
    <main>
      <Hero />
      <AboutSection /> 
      <ArtistListSection />
      <HistorySection />
      {/* --- DODANE NOWE SEKCJE --- */}
      <MainExhibitionsSection />
      <PlacesSection />
      <EasternExpressionsSection />
    </main>
  );
}

// --- Przykładowy komponent podstrony pojedynczego artysty ---
// (Aby linki z listy artystów działały)
function ArtistDetailPage() {
  const { slug } = useParams();
  
  return (
    <main className="pt-32 pb-32 max-w-4xl mx-auto px-6">
      <h1 className="text-5xl font-serif font-bold text-slate-800 mb-4">
        Strona artysty: {slug}
      </h1>
      <p className="text-lg text-slate-600">
        Tutaj znajdą się szczegółowe informacje o artyście, jego biografia
        oraz galeria prac.
      </p>
      {/* Ten Link jest teraz poprawnie zaimportowany */}
      <Link to="/#artysci" className="mt-8 inline-block text-red-600 font-semibold hover:underline">
        &larr; Wróć do listy artystów
      </Link>
    </main>
  );
}


// App() to główny komponent Twojej aplikacji.
export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToHash /> 
      
      <Routes>
        {/* Ścieżka główna (teraz zawiera listę artystów) */}
        <Route path="/" element={<HomePageContent />} />
        
        {/* Ścieżki dla pojedynczych artystów */}
        <Route path="/artysci/:slug" element={<ArtistDetailPage />} />
      </Routes>

      <Footer />
    </>
  );
}
