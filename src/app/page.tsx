import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { CheckCircle, HeartPulse, MessageSquare, Repeat, Settings, Shield, Waves } from "lucide-react";
import { Logo } from "@/components/Logo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Logo />
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
                    Conecta de manera real y significativa.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Una plataforma para crear conexiones efímeras entre clientes, proveedores y empleados, basadas en emociones y momentos.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register">Descubre cómo conectar ahora</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="abstract connection"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Características Principales</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Hecho para conexiones humanas</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestra plataforma se enfoca en la calidad y la emoción de las interacciones, no en la permanencia de los datos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Waves className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Conexión Abstracta</h3>
                <p className="text-sm text-muted-foreground">Crea lazos sin la necesidad de almacenar datos permanentes. La esencia de la conexión es lo que importa.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <HeartPulse className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Notificaciones Emocionales</h3>
                <p className="text-sm text-muted-foreground">Recibe avisos y sugerencias basadas en el estado emocional de tus conexiones: Vibrante, Neutral, Fading.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Repeat className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Seguimiento Temporal</h3>
                <p className="text-sm text-muted-foreground">Las conexiones tienen un ciclo de vida. Gestiona su duración y decide cuándo es momento de renovar o finalizar.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Settings className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Reglas Personalizadas</h3>
                <p className="text-sm text-muted-foreground">Automatiza acciones y recordatorios con reglas y condiciones que se adaptan a cada tipo de relación.</p>
              </div>
               <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <MessageSquare className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Chat Efímero</h3>
                <p className="text-sm text-muted-foreground">Comunícate en tiempo real con mensajes que desaparecen, manteniendo el foco en el presente.</p>
              </div>
               <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Shield className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Privacidad por Diseño</h3>
                <p className="text-sm text-muted-foreground">Tu privacidad es fundamental. Solo se guarda lo esencial, y tú tienes el control total sobre tus datos.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">El Impacto Emocional de Ephemeral Connect</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre lo que nuestros usuarios dicen sobre crear conexiones más auténticas.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>CL</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Carla L.</CardTitle>
                      <p className="text-sm text-muted-foreground">Cliente</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">"Esta plataforma cambió la forma en que colaboro con mis proveedores. Ahora siento que hay una relación real, no solo una transacción."</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Marcos R.</CardTitle>
                      <p className="text-sm text-muted-foreground">Proveedor</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">"Las notificaciones emocionales me ayudan a saber cuándo un cliente necesita más atención. Es proactivo y muy humano."</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Sofía A.</CardTitle>
                      <p className="text-sm text-muted-foreground">Empleado</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">"Usamos Ephemeral Connect internamente para proyectos cortos. Mantiene la comunicación fluida y sin el desorden de los emails."</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Ephemeral Connect. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
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
