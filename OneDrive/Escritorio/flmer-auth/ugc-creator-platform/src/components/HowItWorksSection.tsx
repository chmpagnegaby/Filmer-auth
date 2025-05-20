
import { Card, CardContent } from "@/components/ui/card";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Regístrate",
      description: "Crea tu cuenta como creador o marca y completa tu perfil con toda la información relevante.",
      color: "bg-ugc-blue"
    },
    {
      number: "02",
      title: "Conecta",
      description: "Busca creadores o marcas según tus necesidades y establece contacto directo.",
      color: "bg-ugc-indigo"
    },
    {
      number: "03",
      title: "Colabora",
      description: "Negocia los términos, define los entregables y establece plazos para la colaboración.",
      color: "bg-ugc-violet"
    },
    {
      number: "04",
      title: "Crea",
      description: "Desarrolla contenido de calidad y mantén comunicación constante durante el proceso.",
      color: "bg-ugc-teal"
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cómo Funciona
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Una plataforma simple e intuitiva diseñada para facilitar todo el proceso
            de colaboración entre creadores y marcas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-4`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
