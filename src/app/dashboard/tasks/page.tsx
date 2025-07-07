import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockServices, Service } from "@/lib/mock-data";
import { Users } from "lucide-react";
import { AddServiceDialog } from "@/components/AddServiceDialog";

function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-card">
      <CardContent className="p-4">
        <p className="text-sm font-medium">{service.title}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{service.connectionName}</span>
            </div>
          <div className="flex items-center -space-x-1">
             {service.participants.map(p => (
                <Avatar key={p.id} className="h-5 w-5 border-2 border-card">
                  <AvatarImage src={p.avatar} />
                  <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TasksPage() {
  const openServices = mockServices.filter(t => t.status === "Abierto");
  const inProgressServices = mockServices.filter(t => t.status === "En Progreso");
  const doneServices = mockServices.filter(t => t.status === "Terminadas");

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                 <h1 className="text-2xl font-bold tracking-tight font-headline">Mis Servicios</h1>
                 <p className="text-muted-foreground">Gestiona tus servicios pendientes y completados.</p>
            </div>
            <AddServiceDialog />
        </div>
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Abierto ({openServices.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {openServices.map(service => <ServiceCard key={service.id} service={service} />)}
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>En Progreso ({inProgressServices.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {inProgressServices.map(service => <ServiceCard key={service.id} service={service} />)}
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Terminadas ({doneServices.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {doneServices.map(service => <ServiceCard key={service.id} service={service} />)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
