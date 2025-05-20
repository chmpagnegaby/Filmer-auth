
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { RegisterForm } from "@/types";

const Register = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<RegisterForm>({
    email: "",
    password: "",
    userType: (searchParams.get("type") as "creador" | "marca") || "creador",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const type = searchParams.get("type") as "creador" | "marca" | null;
    if (type && (type === "creador" || type === "marca")) {
      setFormData(prev => ({
        ...prev,
        userType: type
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      userType: value as "creador" | "marca" | "admin",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí se implementará el registro real
      console.log("Registrando usuario:", formData);
      
      // Simulamos registro correcto
      setTimeout(() => {
        toast({
          title: "Registro exitoso",
          description: "¡Bienvenido a UGCreators!",
        });
        navigate("/dashboard");
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error de registro:", error);
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: "No se pudo completar el registro. Intente nuevamente.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-ugc-blue to-ugc-violet bg-clip-text text-transparent">
            UGCreators
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Crear cuenta</h1>
          <p className="mt-2 text-gray-600">
            Únete a UGCreators y empieza a crear conexiones valiosas
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Tipo de cuenta</Label>
                  <RadioGroup
                    defaultValue={formData.userType}
                    value={formData.userType}
                    onValueChange={handleUserTypeChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="creador" id="creador" />
                      <Label htmlFor="creador" className="cursor-pointer">Soy Creador de Contenido</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="marca" id="marca" />
                      <Label htmlFor="marca" className="cursor-pointer">Represento a una Marca</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-ugc-blue hover:bg-ugc-blue/90"
                disabled={isLoading}
              >
                {isLoading ? "Procesando..." : "Crear Cuenta"}
              </Button>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">o continúa con</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full" type="button">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                        fill="#0077B5"
                      />
                    </svg>
                    LinkedIn
                  </Button>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="font-medium text-ugc-blue hover:underline">
                  Iniciar sesión
                </Link>
              </p>

              <p className="mt-4 text-center text-xs text-gray-500">
                Al registrarte, aceptas nuestros{" "}
                <Link to="/terminos" className="text-ugc-blue hover:underline">
                  Términos y Condiciones
                </Link>{" "}
                y{" "}
                <Link to="/privacidad" className="text-ugc-blue hover:underline">
                  Política de Privacidad
                </Link>
                .
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
