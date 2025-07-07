import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

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
              <Label htmlFor="status-change-email" className="text-base">Nuevos mensajes por correo</Label>
              <p className="text-sm text-muted-foreground">
                Recibir un correo cuando recibes un nuevo mensaje.
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
    </div>
  )
}
