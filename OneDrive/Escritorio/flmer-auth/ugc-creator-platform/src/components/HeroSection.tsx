
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Conecta con los mejores creadores de contenido
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
          La plataforma definitiva que une marcas con creadores de contenido auténticos. 
          Encuentra el talento perfecto para tu próxima campaña.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link to="/register?type=creador">
            <Button size="lg" variant="default" className="bg-white text-ugc-blue hover:bg-white/90">
              Regístrate como Creador
            </Button>
          </Link>
          <Link to="/register?type=marca">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Regístrate como Marca
            </Button>
          </Link>
        </div>
        
        <div className="flex justify-center mt-12">
          <div className="glass-effect p-3 md:p-6 rounded-xl max-w-4xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">
                Estadísticas de UGCreators
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <div className="p-3 md:p-4">
                  <div className="text-3xl md:text-4xl font-bold">+500</div>
                  <div className="text-white/80 text-sm md:text-base">Creadores Activos</div>
                </div>
                <div className="p-3 md:p-4">
                  <div className="text-3xl md:text-4xl font-bold">+200</div>
                  <div className="text-white/80 text-sm md:text-base">Marcas</div>
                </div>
                <div className="p-3 md:p-4">
                  <div className="text-3xl md:text-4xl font-bold">+1.5K</div>
                  <div className="text-white/80 text-sm md:text-base">Proyectos Completados</div>
                </div>
                <div className="p-3 md:p-4">
                  <div className="text-3xl md:text-4xl font-bold">95%</div>
                  <div className="text-white/80 text-sm md:text-base">Satisfacción</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
