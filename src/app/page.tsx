import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Users, MessageSquare, Clock, History, Bell, PlusCircle, Activity, Wand2, ShieldCheck, Heart } from "lucide-react";
import { Logo } from "@/components/Logo";

const HeroLogo = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 600 400"
    className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-contain sm:w-full lg:order-last"
    aria-label="AFKDpu Logo"
    data-ai-hint="abstract communication"
  >
    <rect width="600" height="400" rx="24" fill="hsl(var(--card))" />
    <g transform="translate(150, 50) scale(2)">
      <path
        d="M75 15 C52.9 15 35 32.9 35 55 C35 77.1 52.9 95 75 95 C97.1 95 115 77.1 115 55 C115 32.9 97.1 15 75 15 Z M75 85 C58.4 85 45 71.6 45 55 C45 38.4 58.4 25 75 25 C91.6 25 105 38.4 105 55 C105 71.6 91.6 85 75 85 Z"
        fill="hsl(var(--primary))"
        opacity="0.1"
      />
      <circle cx="75" cy="55" r="9" fill="hsl(var(--primary))" />
      <circle cx="45" cy="95" r="9" fill="hsl(var(--primary))" />
      <circle cx="105" cy="95" r="9" fill="hsl(var(--primary))" />
      <path
        d="M75 64 L48 90"
        stroke="hsl(var(--primary))"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M75 64 L102 90"
        stroke="hsl(var(--primary))"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.3"
      />
      <text
        x="75"
        y="170"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="hsl(var(--primary))"
        textAnchor="middle"
      >
        AFKDpu
      </text>
    </g>
  </svg>
);


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Logo href="/" />
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Registrarse</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    AFKDpu: Comunicación Asíncrona para tu Empresa
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Gestiona clientes, proveedores y empleados en un solo lugar. Envía mensajes y tareas que se almacenan hasta que el destinatario esté disponible, garantizando una comunicación fluida y sin interrupciones.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register">Empieza a optimizar tu comunicación</Link>
                  </Button>
                </div>
              </div>
              <HeroLogo />
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">¿Qué es AFKDpu?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AFKDpu es una plataforma de comunicación empresarial que facilita la coordinación entre clientes, proveedores y empleados a través de un sistema de mensajería asíncrona. Olvídate de la comunicación instantánea que exige atención inmediata. Cada conversación y tarea se gestiona de forma persistente, permitiendo que cada participante responda a su propio ritmo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Características Clave</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Diseñado para la comunicación efectiva</h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Users className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Gestión Unificada de Contactos</h3>
                <p className="text-sm text-muted-foreground">Centraliza la comunicación con todos tus clientes, proveedores y empleados en una única plataforma.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <MessageSquare className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Chat Asíncrono y Persistente</h3>
                <p className="text-sm text-muted-foreground">Envía mensajes que se guardan de forma segura hasta que el destinatario pueda leerlos y responder, sin la presión del tiempo real.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Clock className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Organización por Estado</h3>
                <p className="text-sm text-muted-foreground">Clasifica tus conversaciones en "Abiertas", "En Progreso" o "Terminadas" para un seguimiento claro y ordenado.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <History className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Historial Completo</h3>
                <p className="text-sm text-muted-foreground">Accede al historial de cada conversación para tener siempre a mano el contexto de cada interacción.</p>
              </div>
               <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Bell className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Notificaciones Inteligentes</h3>
                <p className="text-sm text-muted-foreground">Recibe avisos cuando tengas nuevos mensajes o tareas pendientes, sin sobrecargarte de información.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                 <ShieldCheck className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Privacidad y Seguridad</h3>
                <p className="text-sm text-muted-foreground">Toda la comunicación está protegida, garantizando la confidencialidad de la información de tu empresa.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="user-flow" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Flujo de Trabajo</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Simple y Efectivo</h2>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
                     <Card className="p-6 text-center">
                        <PlusCircle className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle className="font-headline mb-2">1. Crea una Conexión</CardTitle>
                        <CardContent className="p-0 text-muted-foreground">
                            Inicia una nueva conversación con un cliente, proveedor o empleado, definiendo un propósito claro para la interacción.
                        </CardContent>
                    </Card>
                     <Card className="p-6 text-center">
                        <Activity className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle className="font-headline mb-2">2. Comunícate</CardTitle>
                         <CardContent className="p-0 text-muted-foreground">
                            Utiliza el chat para enviar mensajes, compartir archivos y asignar tareas. Todo se guarda para consulta futura.
                        </CardContent>
                    </Card>
                     <Card className="p-6 text-center">
                        <Wand2 className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle className="font-headline mb-2">3. Gestiona y Finaliza</CardTitle>
                         <CardContent className="p-0 text-muted-foreground">
                            Mueve la conexión a través de los estados "En Progreso" y "Terminada" para mantener tu tablero siempre organizado.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <section id="why-us" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">¿Por Qué Elegir AFKDpu?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                En un mundo que exige inmediatez, AFKDpu te devuelve el control sobre tu tiempo. Fomenta una comunicación más reflexiva y menos reactiva, mejorando la productividad y reduciendo el estrés para todo tu equipo.
              </p>
            </div>
          </div>
        </section>

        <section id="join" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container text-center">
                <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Únete a AFKDpu</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed mt-4">
                    Transforma la manera en que tu empresa se comunica. Fomenta la claridad, la organización y el respeto por el tiempo de todos.
                </p>
                <div className="mt-8">
                     <Button size="lg" asChild>
                        <Link href="/register">AFKDpu te está esperando</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 AFKDpu. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/publicidad-sana" className="text-xs hover:underline underline-offset-4">
            Publicidad Sana
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Términos y Condiciones
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Política de Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}
