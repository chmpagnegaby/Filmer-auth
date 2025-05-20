
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "UGCreators ha transformado mi carrera como creadora de contenido, conectándome con marcas que realmente entienden mi estilo y valores.",
      name: "Ana García",
      role: "Creadora de Contenido",
      image: "/placeholder.svg"
    },
    {
      quote: "Encontrar creadores auténticos que resuenen con nuestra marca nunca había sido tan fácil. La calidad del talento en esta plataforma es excepcional.",
      name: "Carlos Rodríguez",
      role: "Director de Marketing, Marca Líder",
      image: "/placeholder.svg"
    },
    {
      quote: "La plataforma simplifica todo el proceso desde la búsqueda hasta la contratación. He duplicado mis ingresos desde que me uní hace 6 meses.",
      name: "Laura Sánchez",
      role: "Creadora de Lifestyle",
      image: "/placeholder.svg"
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que dicen de nosotros
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Creadores y marcas comparten sus experiencias en UGCreators.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex-grow">
                  <svg className="h-8 w-8 text-ugc-indigo opacity-50 mb-2" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                  </svg>
                  <p className="text-gray-600 italic">{testimonial.quote}</p>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
