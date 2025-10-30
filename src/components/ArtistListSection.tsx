import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

// Definicja typu dla obiektu artysty
interface ArtistType {
  id: number;
  name: string;
  slug: string; // Do linku URL, np. /artysci/wojciech-tracewski
  description: string;
  imageUrl: string;
}

// --- BAZA DANYCH 33 ARTYSTÓW ---
const allArtists: ArtistType[] = [
  {
    id: 1,
    name: 'Wojciech Tracewski',
    slug: 'wojciech-tracewski',
    description: 'Pionier nurtu, znany z odważnych form i głębokiej analizy emocjonalnej. Jego prace definiują wczesne lata Nowej Ekspresji.',
    imageUrl: 'https://placehold.co/400x300/333/white?text=Wojciech+Tracewski',
  },
  {
    id: 2,
    name: 'Anna Kowalska',
    slug: 'anna-kowalska',
    description: 'Artystka multimedialna, łącząca malarstwo z instalacją cyfrową. Jej prace badają granice percepcji.',
    imageUrl: 'https://placehold.co/400x300/e11d48/white?text=Anna+Kowalska',
  },
  {
    id: 3,
    name: 'Piotr Nowak',
    slug: 'piotr-nowak',
    description: 'Rzeźbiarz, którego surowe, industrialne formy stały się manifestem pokolenia. Używa stali i betonu.',
    imageUrl: 'https://placehold.co/400x300/1d4ed8/white?text=Piotr+Nowak',
  },
  // Dodajemy 30 kolejnych przykładowych artystów
  { id: 4, name: 'Ewa Wiśniewska', slug: 'ewa-wisniewska', description: 'Mistrzyni koloru i światła, jej abstrakcyjne płótna pulsują energią.', imageUrl: 'https://placehold.co/400x300/4d7c0f/white?text=Ewa+Wiśniewska' },
  { id: 5, name: 'Tomasz Dąbrowski', slug: 'tomasz-dabrowski', description: 'Jego twórczość to mroczny komentarz do współczesnej konsumpcji.', imageUrl: 'https://placehold.co/400x300/7c2d12/white?text=Tomasz+Dąbrowski' },
  { id: 6, name: 'Maria Lewandowska', slug: 'maria-lewandowska', description: 'Delikatne akwarele kontrastujące z mocnym, feministycznym przekazem.', imageUrl: 'https://placehold.co/400x300/be185d/white?text=Maria+Lewandowska' },
  { id: 7, name: 'Krzysztof Wójcik', slug: 'krzysztof-wojcik', description: 'Fotograf portretowy, uchwycił twarze całego pokolenia Nowej Ekspresji.', imageUrl: 'https://placehold.co/400x300/1e293b/white?text=Krzysztof+Wójcik' },
  { id: 8, name: 'Agnieszka Kamińska', slug: 'agnieszka-kaminska', description: 'Tworzy monumentalne murale, przenosząc ekspresję na ulice miast.', imageUrl: 'https://placehold.co/400x300/581c87/white?text=Agnieszka+Kamińska' },
  { id: 9, name: 'Marcin Jankowski', slug: 'marcin-jankowski', description: 'Jego performance artystyczny przekracza granice komfortu widza.', imageUrl: 'https://placehold.co/400x300/b45309/white?text=Marcin+Jankowski' },
  { id: 10, name: 'Zofia Zielińska', slug: 'zofia-zielinska', description: 'Minimalistka, która w prostocie formy znajduje najgłębsze emocje.', imageUrl: 'https://placehold.co/400x300/065f46/white?text=Zofia+Zielińska' },
  { id: 11, name: 'Grzegorz Szymański', slug: 'grzegorz-szymanski', description: 'Inspirowany mitologią, tworzy współczesne ikony na drewnianych panelach.', imageUrl: 'https://placehold.co/400x300/9f1239/white?text=Grzegorz+Szymański' },
  { id: 12, name: 'Elżbieta Woźniak', slug: 'elzbieta-wozniak', description: 'Jej instalacje z tkanin opowiadają o pamięci i przemijaniu.', imageUrl: 'https://placehold.co/400x300/1e40af/white?text=Elżbieta+Woźniak' },
  { id: 13, name: 'Jan Kozłowski', slug: 'jan-kozlowski', description: 'Surrealista, którego obrazy są jak sny pełne niepokojących symboli.', imageUrl: 'https://placehold.co/400x300/854d0e/white?text=Jan+Kozłowski' },
  { id: 14, name: 'Barbara Mazur', slug: 'barbara-mazur', description: 'Ceramika artystyczna o organicznych, niemal żywych kształtach.', imageUrl: 'https://placehold.co/400x300/166534/white?text=Barbara+Mazur' },
  { id: 15, name: 'Andrzej Kwiatkowski', slug: 'andrzej-kwiatkowski', description: 'Grafik, mistrz plakatu, którego prace stały się ikonami epoki.', imageUrl: 'https://placehold.co/400x300/312e81/white?text=Andrzej+Kwiatkowski' },
  { id: 16, name: 'Katarzyna Grabowska', slug: 'katarzyna-grabowska', description: 'Ekspresyjne autoportrety malowane grubą warstwą farby (impasto).', imageUrl: 'https://placehold.co/400x300/831843/white?text=Katarzyna+Grabowska' },
  { id: 17, name: 'Paweł Piotrowski', slug: 'pawel-piotrowski', description: 'Twórca wideo-artu, badający relacje człowieka z technologią.', imageUrl: 'https://placehold.co/400x300/0f766e/white?text=Paweł+Piotrowski' },
  { id: 18, name: 'Magdalena Zając', slug: 'magdalena-zajac', description: 'Jej prace to poetyckie kolaże ze starych fotografii i listów.', imageUrl: 'https://placehold.co/400x300/a16207/white?text=Magdalena+Zając' },
  { id: 19, name: 'Marek Pawlak', slug: 'marek-pawlak', description: 'Konceptualista, który pyta o definicję sztuki i artysty.', imageUrl: 'https://placehold.co/400x300/4a044e/white?text=Marek+Pawlak' },
  { id: 20, name: 'Joanna Michalska', slug: 'joanna-michalska', description: 'Abstrakcyjne pejzaże malowane na jedwabiu, pełne lekkości.', imageUrl: 'https://placehold.co/400x300/1e3a8a/white?text=Joanna+Michalska' },
  { id: 21, name: 'Adam Sikora', slug: 'adam-sikora', description: 'Mistrz rysunku węglem, jego prace cechuje niezwykły dramatyzm.', imageUrl: 'https://placehold.co/400x300/3f3f46/white?text=Adam+Sikora' },
  { id: 22, name: 'Monika Nowicka', slug: 'monika-nowicka', description: 'Jej neonowe instalacje krytykują kulturę masową i reklamę.', imageUrl: 'https://placehold.co/400x300/f43f5e/white?text=Monika+Nowicka' },
  { id: 23, name: 'Łukasz Głowacki', slug: 'lukasz-glowacki', description: 'Artysta street-artowy, który przeniósł graffiti na płótna galeryjne.', imageUrl: 'https://placehold.co/400x300/d97706/white?text=Łukasz+Głowacki' },
  { id: 24, name: 'Teresa Walczak', slug: 'teresa-walczak', description: 'Specjalizuje się w land-arcie, tworząc efemeryczne dzieła w naturze.', imageUrl: 'https://placehold.co/400x300/14532d/white?text=Teresa+Walczak' },
  { id: 25, name: 'Robert Brzeziński', slug: 'robert-brzezinski', description: 'Klasyczne malarstwo olejne połączone z elementami cyberpunku.', imageUrl: 'https://placehold.co/400x300/083344/white?text=Robert+Brzeziński' },
  { id: 26, name: 'Kinga Kaczmarek', slug: 'kinga-kaczmarek', description: 'Jej prace to małe, precyzyjne światy zamknięte w szklanych gablotach.', imageUrl: 'https://placehold.co/400x300/4c1d95/white?text=Kinga+Kaczmarek' },
  { id: 27, name: 'Michał Sokołowski', slug: 'michal-sokolowski', description: 'Autor wielkoformatowych, hiperrealistycznych portretów.', imageUrl: 'https://placehold.co/400x300/57534e/white?text=Michał+Sokołowski' },
  { id: 28, name: 'Alicja Dudek', slug: 'alicja-dudek', description: 'W jej pracach dominuje motyw snu i oniryczne wizje.', imageUrl: 'https://placehold.co/400x300/155e75/white?text=Alicja+Dudek' },
  { id: 29, name: 'Rafał Sawicki', slug: 'rafal-sawicki', description: 'Tworzy kinetyczne rzeźby poruszane siłami natury.', imageUrl: 'https://placehold.co/400x300/9a3412/white?text=Rafał+Sawicki' },
  { id: 30, name: 'Patrycja Lis', slug: 'patrycja-lis', description: 'Bio-art. Wykorzystuje żywe organizmy do tworzenia sztuki.', imageUrl: 'https://placehold.co/400x300/047857/white?text=Patrycja+Lis' },
  { id: 31, name: 'Damian Wójtowicz', slug: 'damian-wojtowicz', description: 'Jego prace to geometryczna abstrakcja inspirowana architekturą.', imageUrl: 'https://placehold.co/400x300/172554/white?text=Damian+Wójtowicz' },
  { id: 32, name: 'Aleksandra Jasińska', slug: 'aleksandra-jasinska', description: 'Artystka tekstylna, tworząca współczesne gobeliny.', imageUrl: 'https://placehold.co/400x300/701a75/white?text=Aleksandra+Jasińska' },
  { id: 33, name: 'Mateusz Krawczyk', slug: 'mateusz-krawczyk', description: 'Jego malarstwo to dialog z mistrzami renesansu w nowoczesnej formie.', imageUrl: 'https://placehold.co/400x300/a21caf/white?text=Mateusz+Krawczyk' },
];

// --- Komponent Kafelka Artysty ---
function ArtistCard({ artist }: { artist: ArtistType }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5">
      {/* Obraz */}
      <div className="relative w-full h-64">
        <img
          src={artist.imageUrl}
          alt={`Portret artysty ${artist.name}`}
          className="w-full h-full object-cover"
          loading="lazy" // Leniwe ładowanie dla lepszej wydajności
        />
      </div>

      {/* Treść karty */}
      <div className="flex flex-col grow p-6">
        <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">
          {artist.name}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed grow line-clamp-3">
          {artist.description}
        </p>
        <Link
          to={`/artysci/${artist.slug}`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition-all duration-300 hover:bg-red-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-600 group"
        >
          Zobacz więcej
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

// --- Główny Komponent Sekcji ---
export default function ArtistListSection() {
  const [searchTerm, setSearchTerm] = useState('');

  // Logika filtrowania
  const filteredArtists = allArtists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="artysci" className="bg-white py-20 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Nagłówek i Wyszukiwarka */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Poznaj Artystów Nowej Ekspresji
          </h2>
          <div className="w-24 h-1 bg-red-600 my-6"></div>
          <p className="max-w-2xl text-lg text-slate-600 mb-8">
            Odkryj 33 twórców, którzy zdefiniowali na nowo polską sztukę.
            Użyj wyszukiwarki, aby znaleźć artystę po imieniu lub nazwisku.
          </p>

          {/* Stylowa Wyszukiwarka */}
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Wpisz imię lub nazwisko..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-300 bg-gray-50 py-4 pl-14 pr-6 text-lg text-slate-900 shadow-inner transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/50 focus:outline-none"
            />
            <Search
              size={24}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* Siatka z Artystami */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          // Wiadomość, gdy nic nie znaleziono
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-slate-700">
              Nie znaleziono artystów
            </h3>
            <p className="text-slate-500 mt-2">
              Spróbuj zmienić frazę wyszukiwania.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}