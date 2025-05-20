
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-10 bg-white/80 backdrop-blur-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-ugc-blue to-ugc-violet bg-clip-text text-transparent">
          UGCreators
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-ugc-blue transition-colors">
            Inicio
          </Link>
          <Link to="#creators" className="text-gray-700 hover:text-ugc-blue transition-colors">
            Creadores
          </Link>
          <Link to="#brands" className="text-gray-700 hover:text-ugc-blue transition-colors">
            Marcas
          </Link>
          <Link to="#how-it-works" className="text-gray-700 hover:text-ugc-blue transition-colors">
            Cómo funciona
          </Link>
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" className="border-ugc-blue text-ugc-blue hover:text-white hover:bg-ugc-blue">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-ugc-blue hover:bg-ugc-blue/90 text-white">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-ugc-blue transition-colors py-2">
              Inicio
            </Link>
            <Link to="#creators" className="text-gray-700 hover:text-ugc-blue transition-colors py-2">
              Creadores
            </Link>
            <Link to="#brands" className="text-gray-700 hover:text-ugc-blue transition-colors py-2">
              Marcas
            </Link>
            <Link to="#how-it-works" className="text-gray-700 hover:text-ugc-blue transition-colors py-2">
              Cómo funciona
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full border-ugc-blue text-ugc-blue hover:text-white hover:bg-ugc-blue">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-ugc-blue hover:bg-ugc-blue/90 text-white">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
