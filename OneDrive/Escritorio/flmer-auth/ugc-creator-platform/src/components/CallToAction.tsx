
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-ugc-blue to-ugc-violet text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Empieza a crear conexiones valiosas hoy
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Únete a la comunidad de UGCreators y revoluciona la forma en que generas 
          o contratas contenido para tu marca.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
      </div>
    </section>
  );
};

export default CallToAction;
