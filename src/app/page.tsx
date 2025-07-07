
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Users, MessageSquare, Clock, History, Bell, PlusCircle, Activity, Wand2, ShieldCheck, Heart } from "lucide-react";
import { Logo } from "@/components/Logo";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Logo href="/" />
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Button variant="ghost" asChild>
            <Link href="/publicidad-sana">Publicidad Sana</Link>
          </Button>
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
                    AFKDpu: Un Portal para Conexiones Conscientes
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Gestiona tus interacciones como viajes simbólicos. Cada conexión es un portal que se abre, se transita y se cierra, dejando una memoria. Un espacio para la comunicación asíncrona y la transformación personal.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register">Inicia tu Viaje</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="AFKDpu Portal"
                width={600}
                height={400}
                className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-contain sm:w-full lg:order-last"
                data-ai-hint="duality connection"
                priority
              />
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">¿Qué es AFKDpu?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AFKDpu es un ecosistema para la comunicación consciente. Facilita la coordinación entre roles a través de un sistema de portales de conexión asíncronos. Cada portal es un espacio sagrado para el diálogo y la colaboración, respetando el ritmo y la presencia de cada participante.
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
                <h3 className="text-lg font-bold font-headline">Portal Unificado de Viajes</h3>
                <p className="text-sm text-muted-foreground">Centraliza tus viajes con clientes, proveedores y empleados en una única plataforma.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <MessageSquare className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Conversaciones Trascendentes</h3>
                <p className="text-sm text-muted-foreground">Envía mensajes que se guardan de forma segura hasta que el destinatario pueda leerlos, sin la presión del tiempo real.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Clock className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Ciclos de Interacción</h3>
                <p className="text-sm text-muted-foreground">Clasifica tus portales en "Activo", "En espera" o "Cerrado" para un seguimiento claro y ordenado.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <History className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Memoria del Viaje</h3>
                <p className="text-sm text-muted-foreground">Accede a la memoria de cada portal para tener siempre a mano el contexto de cada interacción.</p>
              </div>
               <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Bell className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Ecos del Portal</h3>
                <p className="text-sm text-muted-foreground">Recibe avisos cuando tengas nuevos mensajes, sin sobrecargarte de información.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                 <ShieldCheck className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Santuario Seguro</h3>
                <p className="text-sm text-muted-foreground">Toda la comunicación está protegida, garantizando la confidencialidad de tu viaje.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="user-flow" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Flujo de Viaje</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Simple y Efectivo</h2>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
                     <Card className="p-6 text-center">
                        <PlusCircle className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle className="font-headline mb-2">1. Abre un Portal</CardTitle>
                        <CardContent className="p-0 text-muted-foreground">
                            Inicia un nuevo viaje, definiendo un propósito claro para la travesía que comienza.
                        </CardContent>
                    </Card>
                     <Card className="p-6 text-center">
                        <Activity className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle className="font-headline mb-2">2. Transita el Viaje</CardTitle>
                         <CardContent className="p-0 text-muted-foreground">
                            Utiliza el chat para un diálogo profundo. Todo se guarda como memoria del viaje.
                        </CardContent>
                    </Card>
                     <Card className="p-6 text-center">
                        <Wand2 className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle className="font-headline mb-2">3. Cierra el Ciclo</CardTitle>
                         <CardContent className="p-0 text-muted-foreground">
                            Mueve el portal a través de sus estados para mantener tu espacio interior en armonía.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <section id="why-us" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">¿Por Qué AFKDpu?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                En un mundo de inmediatez, AFKDpu te invita a la presencia. Fomenta una comunicación más reflexiva y menos reactiva, transformando la productividad en un acto de conciencia y reduciendo el estrés.
              </p>
            </div>
          </div>
        </section>

        <section id="join" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container text-center">
                <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Entra al Portal</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed mt-4">
                    Transforma la manera en que te conectas. Fomenta la claridad, la organización y el respeto por tu propio tiempo y el de los demás.
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
