import { Link } from 'react-router-dom';
import { Globe, Instagram } from 'lucide-react'; 

export default function Footer() {
  // 1. ZAKTUALIZOWANE LINKI W STOPCE
  const navLinks = [
    { href: "/#o-nas", label: "O nas" },
    { href: "/#historia", label: "Historia" },
    { href: "/#wystawy", label: "Wystawy" }, 
    { href: "/#artysci", label: "Artyści" }, // POPRAWKA
  ];

  const websiteUrl = "#"; 
  const instagramUrl = "#";

  return (
    <footer className="bg-slate-800 text-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold whitespace-nowrap">
              Nowa <span className="text-red-500">Ekspresja</span>
            </h3>
            <p className="mt-4 text-slate-400">
              Strona poświęcona kierunkowi<br/>
              Nowa Ekspresja oraz sylwetkom<br/>
              33 powiązanych z nim artystów.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold tracking-wider uppercase text-slate-300">Menu</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-slate-400 hover:text-red-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-lg font-semibold tracking-wider uppercase text-slate-300">Social Media</h4>
            <div className="flex flex-row md:flex-col items-center gap-4 md:items-end md:space-y-4 mt-4">
              <a 
                href={websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-red-500 transition-colors"
                aria-label="Strona internetowa"
              >
                <Globe size={24} />
              </a>
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-red-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-700 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Nowa Ekspresja. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}