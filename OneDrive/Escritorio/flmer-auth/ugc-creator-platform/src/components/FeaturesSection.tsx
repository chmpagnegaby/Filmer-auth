
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      title: "Para Creadores",
      description: "Muestra tu talento, encuentra oportunidades que se ajusten a tu estilo y genera ingresos de manera constante",
      items: [
        "Perfil personalizado para destacar tu mejor contenido",
        "Encuentra marcas que buscan exactamente lo que tú ofreces",
        "Negocia precios justos por tu trabajo creativo",
        "Desarrolla relaciones a largo plazo con marcas"
      ],
      color: "from-ugc-blue to-ugc-violet"
    },
    {
      title: "Para Marcas",
      description: "Encuentra creadores auténticos que conecten perfectamente con tu audiencia y tus valores de marca",
      items: [
        "Búsqueda avanzada por industria, estilo y demografía",
        "Gestión completa de proyectos y campañas",
        "Comunicación directa con creadores",
        "Análisis de resultados y métricas de campañas"
      ],
      color: "from-ugc-violet to-ugc-teal"
    }
  ];

  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Una plataforma para todos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            UGCreators facilita la conexión entre creadores de contenido y marcas, 
            creando relaciones profesionales mutuamente beneficiosas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg">
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-ugc-blue mr-2 mt-0.5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
