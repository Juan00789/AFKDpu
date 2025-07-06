import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferencias de Notificaciones</CardTitle>
          <CardDescription>Gestiona cómo y cuándo quieres recibir notificaciones.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="status-change-email" className="text-base">Cambios de estado por correo</Label>
              <p className="text-sm text-muted-foreground">
                Recibir un correo cuando el estado de una conexión cambia.
              </p>
            </div>
            <Switch id="status-change-email" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="task-reminders-push" className="text-base">Recordatorios de tareas</Label>
              <p className="text-sm text-muted-foreground">
                Recibir notificaciones push para tareas pendientes.
              </p>
            </div>
            <Switch id="task-reminders-push" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Reglas</CardTitle>
          <CardDescription>Define reglas automáticas para cada conexión para recibir sugerencias o recordatorios.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4 rounded-lg border p-4">
                 <h3 className="font-medium">Nueva Regla</h3>
                <div className="grid md:grid-cols-3 gap-4 items-end">
                    <div className="grid gap-2">
                        <Label>Si una conexión se vuelve...</Label>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Seleccionar estado..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="neutral">Neutral</SelectItem>
                                <SelectItem value="fading">Fading</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Por más de...</Label>
                        <div className="flex gap-2">
                            <Input type="number" placeholder="3" className="w-1/2" />
                            <Select defaultValue="dias">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="horas">hora(s)</SelectItem>
                                    <SelectItem value="dias">día(s)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Entonces...</Label>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Seleccionar acción..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="notify">Enviar una notificación</SelectItem>
                                <SelectItem value="suggest">Enviar una sugerencia</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <Button>Añadir Regla</Button>
            </div>

            <Separator />

            <div className="space-y-4">
                <h3 className="font-medium">Reglas Existentes</h3>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="text-sm">Si una conexión se vuelve <strong>"Neutral"</strong> por más de <strong>3 días</strong>, enviar una <strong>sugerencia</strong>.</p>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="text-sm">Si una conexión se vuelve <strong>"Fading"</strong> por más de <strong>1 hora</strong>, enviar una <strong>notificación</strong>.</p>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
