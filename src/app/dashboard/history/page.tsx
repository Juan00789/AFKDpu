import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, HeartPulse, Edit3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/lib/mock-data";

const historyEvents = [
  {
    type: "status_change",
    icon: HeartPulse,
    color: "text-green-500",
    title: "El estado de 'Proyecto Phoenix' cambió a Vibrante",
    description: "La conexión fue actualizada por Alicia Keys.",
    timestamp: "hace 2 horas",
  },
  {
    type: "task_completed",
    icon: Edit3,
    color: "text-blue-500",
    title: "Servicio completado: 'Revisión de wireframes'",
    description: "En la conexión 'Desarrollo App Móvil'.",
    timestamp: "hace 1 día",
  },
  {
    type: "new_connection",
    icon: Users,
    color: "text-purple-500",
    title: "Nueva conexión iniciada: 'Integración API'",
    description: "Participantes: Carlos Santana, Bruno Mars.",
    timestamp: "hace 3 días",
  },
  {
    type: "status_change",
    icon: HeartPulse,
    color: "text-red-500",
    title: "El estado de 'Desarrollo App Móvil' cambió a Fading",
    description: "La conexión fue actualizada por Diana Ross.",
    timestamp: "hace 4 días",
  },
];

export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Interacciones</CardTitle>
        <CardDescription>Un registro de todos los eventos y cambios importantes en tus conexiones.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>
          {historyEvents.map((event, index) => (
            <div key={index} className="relative mb-8 flex items-start gap-4">
                <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-background flex items-center justify-center -translate-x-1/2">
                    <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <event.icon className={`h-3 w-3 ${event.color}`} />
                    </div>
                </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
