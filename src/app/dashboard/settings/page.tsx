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
          <CardTitle>Configuración de Reglas Automáticas</CardTitle>
          <CardDescription>Define reglas automáticas para cada conexión y recibe sugerencias o recordatorios según el estado de la conexión.</CardDescription>
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
                                <SelectItem value="vibrante">Vibrante</SelectItem>
                                <SelectItem value="sereno">Sereno</SelectItem>
                                <SelectItem value="difuso">Difuso</SelectItem>
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
                                <SelectItem value="notify">Enviar notificación</SelectItem>
                                <SelectItem value="suggest_update">Sugerir actualización</SelectItem>
                                <SelectItem value="activate_timer">Activar temporizador</SelectItem>
                                <SelectItem value="suggest_end">Sugerir terminar la conexión</SelectItem>
                                <SelectItem value="suggest_feedback">Sugerir feedback positivo</SelectItem>
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
                    <p className="text-sm">Si una conexión se vuelve <strong>"Neutral"</strong> por más de <strong>3 días</strong>, enviar una <strong>sugerencia de actualización</strong>.</p>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="text-sm">Si una conexión se vuelve <strong>"Fading"</strong> por más de <strong>1 hora</strong>, enviar una <strong>notificación</strong>.</p>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="text-sm">Si una conexión es <strong>"Vibrante"</strong> por más de <strong>24 horas</strong>, <strong>activar un temporizador</strong> de 12 horas.</p>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="text-sm">Si una conexión se vuelve <strong>"Sereno"</strong> por más de <strong>48 horas</strong>, <strong>sugerir que se termine la conexión</strong>.</p>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="text-sm">Si una conexión se vuelve <strong>"Difusa"</strong> por más de <strong>1 hora</strong>, <strong>enviar una notificación</strong> a la parte interesada para que actualice su estado.</p>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="text-sm">Si una conexión es <strong>"Buena" (Vibrante)</strong> por más de <strong>6 horas</strong>, <strong>sugerir compartir feedback positivo</strong> o una recomendación.</p>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Cómo se aplican las reglas</CardTitle>
          <CardDescription>
            Cada estado de conexión tiene una intención y acción específica en AFKDpu, y se pueden configurar reglas basadas en el tipo de interacción que deseas fomentar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">Neutral</h4>
            <p className="text-sm text-muted-foreground">Un estado de "Neutral" sugiere que la conexión no tiene un desarrollo significativo. Las reglas aquí pueden ser para sugerir actualizaciones o incluso terminar la conexión si no hay progreso.</p>
          </div>
          <div>
            <h4 className="font-semibold">Fading (Desvanecida)</h4>
            <p className="text-sm text-muted-foreground">Cuando una conexión se vuelve "Fading", indica que está perdiendo intensidad. Las reglas aquí podrían ser para enviar recordatorios o alertas sobre la importancia de renovar la interacción.</p>
          </div>
          <div>
            <h4 className="font-semibold">Vibrante</h4>
            <p className="text-sm text-muted-foreground">Este estado indica que la conexión es muy activa. Las reglas para "Vibrante" pueden implicar activar temporalizadores o enviar notificaciones para no dejar que se prolongue demasiado sin un cierre o renovación de compromiso.</p>
          </div>
          <div>
            <h4 className="font-semibold">Sereno</h4>
            <p className="text-sm text-muted-foreground">Un estado tranquilo y estable. Las reglas pueden sugerir simplemente mantener la conexión, o finalizarla si no se reaviva después de cierto tiempo.</p>
          </div>
          <div>
            <h4 className="font-semibold">Difuso</h4>
            <p className="text-sm text-muted-foreground">Una conexión que está perdiendo claridad. Es probable que se necesite enviar notificaciones o sugerir una actualización para que los usuarios puedan reconectar o avanzar.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
