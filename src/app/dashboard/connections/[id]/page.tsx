import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SmartPromptSuggestions } from "@/components/SmartPromptSuggestions";
import { currentUser, mockConnections } from "@/lib/mock-data";
import { cva } from "class-variance-authority";
import { Send, HeartPulse, Minus, TrendingDown } from "lucide-react";

const statusBadgeVariants = cva(
  "border-transparent text-xs",
  {
    variants: {
      status: {
        Vibrante: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200",
        Neutral: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
        Fading: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200",
      },
    },
  }
);

export default function ConnectionDetailPage({ params }: { params: { id: string } }) {
  const connection = mockConnections.find(c => c.id === params.id) || mockConnections[0];
  const otherParticipant = connection.participants.find(p => p.id !== currentUser.id) || connection.participants[0];

  const connectionInfo = {
      connectionName: connection.name,
      connectionState: connection.status,
      lastInteraction: "La última interacción fue una llamada para revisar el progreso del proyecto hace 2 días.",
      rules: "Si la conexión se vuelve 'Fading' por más de 1 hora, enviar una notificación.",
      userName: currentUser.name,
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">{connection.name}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={statusBadgeVariants({ status: connection.status })}>
                      {connection.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{connection.duration}</span>
              </div>
            </div>
             <div className="flex items-center -space-x-2">
                {connection.participants.map(p => (
                  <Avatar key={p.id} className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={p.avatar} />
                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] flex flex-col">
                 <p className="text-center text-xs text-muted-foreground py-2">Las conversaciones se eliminan cuando la conexión cambia de estado.</p>
                <Separator />
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={otherParticipant.avatar} />
                      <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 max-w-[75%]">
                      <p className="text-sm">¡Hola! Solo para confirmar que recibí los documentos. ¡Gracias!</p>
                      <p className="text-xs text-muted-foreground text-right mt-1">Hace 5 minutos</p>
                    </div>
                  </div>
                   <div className="flex items-end gap-2 justify-end">
                     <div className="rounded-lg bg-primary text-primary-foreground p-3 max-w-[75%]">
                      <p className="text-sm">Perfecto, gracias por confirmar. ¡Seguimos en contacto!</p>
                       <p className="text-xs text-primary-foreground/80 text-right mt-1">Hace 2 minutos</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="relative">
                  <Input placeholder="Escribe un mensaje..." className="pr-12" />
                  <Button variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Estado Emocional</CardTitle>
            <CardDescription>Actualiza el estado para reflejar el sentimiento actual de la conexión.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant={connection.status === 'Vibrante' ? 'default' : 'secondary'} size="sm" className="gap-1.5">
              <HeartPulse className="h-4 w-4" /> Vibrante
            </Button>
            <Button variant={connection.status === 'Neutral' ? 'default' : 'secondary'} size="sm" className="gap-1.5">
              <Minus className="h-4 w-4" /> Neutral
            </Button>
             <Button variant={connection.status === 'Fading' ? 'destructive' : 'secondary'} size="sm" className="gap-1.5">
              <TrendingDown className="h-4 w-4" /> Fading
            </Button>
          </CardContent>
        </Card>

        <SmartPromptSuggestions connectionInfo={connectionInfo} />
      </div>
    </div>
  )
}
