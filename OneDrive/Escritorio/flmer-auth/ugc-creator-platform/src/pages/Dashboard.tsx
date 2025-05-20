
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data - en una implementación real vendría de la API
  const stats = [
    { title: "Total de Proyectos", value: "12" },
    { title: "Propuestas Pendientes", value: "5" },
    { title: "Proyectos Activos", value: "3" },
    { title: "Proyectos Finalizados", value: "4" },
  ];

  const recentProjects = [
    { id: 1, name: "Campaña de redes sociales", brand: "SportFit", status: "En progreso", date: "2023-05-10" },
    { id: 2, name: "Sesión fotográfica", brand: "EcoStyle", status: "Pendiente", date: "2023-05-15" },
    { id: 3, name: "Videos para TikTok", brand: "NextTech", status: "Finalizado", date: "2023-05-02" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En progreso":
        return "bg-blue-100 text-blue-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Finalizado":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button className="bg-ugc-blue hover:bg-ugc-blue/90">
            Nuevo Proyecto
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Proyectos Recientes</CardTitle>
              <CardDescription>
                Tus proyectos más recientes y su estado actual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.brand}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(project.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Las últimas actualizaciones en tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-1 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm">
                      Propuesta aceptada por <strong>SportFit</strong>
                    </p>
                    <p className="text-xs text-gray-500">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-1 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm">
                      Proyecto completado con <strong>NextTech</strong>
                    </p>
                    <p className="text-xs text-gray-500">Hace 1 día</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-1 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm">
                      Nueva propuesta de <strong>EcoStyle</strong>
                    </p>
                    <p className="text-xs text-gray-500">Hace 2 días</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
