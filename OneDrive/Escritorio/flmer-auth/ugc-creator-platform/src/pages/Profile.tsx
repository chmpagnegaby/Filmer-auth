import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/components/AppLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

// URL base para las peticiones API - usando import.meta.env en lugar de process.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Estado para perfiles
  const [creatorProfile, setCreatorProfile] = useState({
    nombre: "",
    apellido: "",
    pais: "",
    ciudad: "",
    idiomas: [] as string[],
    precio: "",
    industrias: [] as string[],
    genero: "",
    edad: "",
    color_ojos: "",
    color_cabello: "",
    largo_cabello: "",
    altura: "",
    complexion: ""
  });
  
  // Estado para perfil de marca
  const [brandProfile, setBrandProfile] = useState({
    nombre: "",
    contacto: "",
    industria: [] as string[]
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Cargar datos del perfil al iniciar
  useEffect(() => {
    const fetchProfileData = async () => {
      if (user && user.profileId) {
        try {
          const response = await axios.get(`${API_URL}/profile/${user.tipo_usuario}/${user.profileId}`, {
            withCredentials: true
          });
          
          if (response.data.success) {
            if (user.tipo_usuario === 'creador') {
              setCreatorProfile({
                ...creatorProfile,
                ...response.data.profile,
                precio: response.data.profile.precio?.toString() || "",
                edad: response.data.profile.edad?.toString() || ""
              });
            } else if (user.tipo_usuario === 'marca') {
              setBrandProfile({
                ...brandProfile,
                ...response.data.profile
              });
            }
          }
        } catch (error) {
          console.error('Error al cargar datos del perfil:', error);
          toast({
            title: "Error",
            description: "No se pudieron cargar los datos del perfil",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user]);
  
  const handleCreatorChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreatorProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleBrandChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBrandProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (value: string, field: string) => {
    if (user?.tipo_usuario === "creador") {
      setCreatorProfile(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setBrandProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };
  
  const handleIndustryChange = (industry: string, checked: boolean) => {
    if (user?.tipo_usuario === "creador") {
      setCreatorProfile(prev => {
        const industries = [...(prev.industrias || [])];
        if (checked && !industries.includes(industry)) {
          industries.push(industry);
        } else if (!checked && industries.includes(industry)) {
          const index = industries.indexOf(industry);
          industries.splice(index, 1);
        }
        return {
          ...prev,
          industrias: industries
        };
      });
    } else {
      setBrandProfile(prev => {
        const industries = [...(prev.industria || [])];
        if (checked && !industries.includes(industry)) {
          industries.push(industry);
        } else if (!checked && industries.includes(industry)) {
          const index = industries.indexOf(industry);
          industries.splice(index, 1);
        }
        return {
          ...prev,
          industria: industries
        };
      });
    }
  };
  
  const handleSaveProfile = async () => {
    if (!user || !user.profileId) return;
    
    try {
      const profileData = user.tipo_usuario === 'creador' ? creatorProfile : brandProfile;
      
      const response = await axios.put(
        `${API_URL}/profile/${user.tipo_usuario}/${user.profileId}`,
        profileData,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        toast({
          title: "Perfil actualizado",
          description: "Tu información ha sido guardada correctamente",
        });
      }
    } catch (error) {
      console.error('Error al guardar perfil:', error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive"
      });
    }
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tu Perfil</h1>
          <p className="text-muted-foreground">
            Administra tu información de perfil y cómo te ven los demás en la plataforma.
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="account">Cuenta</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información personal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user?.tipo_usuario === "creador" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre</Label>
                          <Input
                            id="nombre"
                            name="nombre"
                            value={creatorProfile.nombre}
                            onChange={handleCreatorChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apellido">Apellido</Label>
                          <Input
                            id="apellido"
                            name="apellido"
                            value={creatorProfile.apellido}
                            onChange={handleCreatorChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pais">País</Label>
                          <Input
                            id="pais"
                            name="pais"
                            value={creatorProfile.pais}
                            onChange={handleCreatorChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ciudad">Ciudad</Label>
                          <Input
                            id="ciudad"
                            name="ciudad"
                            value={creatorProfile.ciudad}
                            onChange={handleCreatorChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="genero">Género</Label>
                          <Select
                            value={creatorProfile.genero}
                            onValueChange={(value) => handleSelectChange(value, "genero")}
                          >
                            <SelectTrigger id="genero">
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="masculino">Masculino</SelectItem>
                              <SelectItem value="femenino">Femenino</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                              <SelectItem value="prefiero_no_decir">Prefiero no decir</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edad">Edad</Label>
                          <Input
                            id="edad"
                            name="edad"
                            type="number"
                            value={creatorProfile.edad}
                            onChange={handleCreatorChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="precio">Tarifa base (€ por proyecto)</Label>
                        <Input
                          id="precio"
                          name="precio"
                          type="number"
                          value={creatorProfile.precio}
                          onChange={handleCreatorChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Industrias de especialización</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {["Moda", "Belleza", "Tecnología", "Alimentos", "Viajes", "Fitness", "Lifestyle", "Gaming"].map((industry) => (
                            <div key={industry} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`industry-${industry}`}
                                className="rounded border-gray-300 text-ugc-blue focus:ring-ugc-blue"
                                checked={creatorProfile.industrias.includes(industry)}
                                onChange={(e) => handleIndustryChange(industry, e.target.checked)}
                              />
                              <label htmlFor={`industry-${industry}`} className="text-sm">
                                {industry}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Perfil para marca
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre de la marca</Label>
                        <Input
                          id="nombre"
                          name="nombre"
                          value={brandProfile.nombre}
                          onChange={handleBrandChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contacto">Información de contacto</Label>
                        <Textarea
                          id="contacto"
                          name="contacto"
                          value={brandProfile.contacto}
                          onChange={handleBrandChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Industria</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {["Moda", "Belleza", "Tecnología", "Alimentos", "Viajes", "Fitness", "Lifestyle", "Gaming"].map((industry) => (
                            <div key={industry} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`industry-${industry}`}
                                className="rounded border-gray-300 text-ugc-blue focus:ring-ugc-blue"
                                checked={brandProfile.industria.includes(industry)}
                                onChange={(e) => handleIndustryChange(industry, e.target.checked)}
                              />
                              <label htmlFor={`industry-${industry}`} className="text-sm">
                                {industry}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button onClick={handleSaveProfile} className="bg-ugc-blue hover:bg-ugc-blue/90">
                      Guardar cambios
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="portfolio" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-ugc-blue hover:text-ugc-blue/90"
                      >
                        <span>Sube tus archivos</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="bg-ugc-blue hover:bg-ugc-blue/90">
                      Guardar portfolio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de cuenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" disabled value="usuario@ejemplo.com" />
                  <p className="text-xs text-muted-foreground">
                    Este es tu correo de contacto principal.
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium">Cambiar contraseña</h3>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña actual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="bg-ugc-blue hover:bg-ugc-blue/90">
                      Actualizar contraseña
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
