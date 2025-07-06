import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Users, FileText, Clock, History, Bell, PlusCircle, Activity, Wand2, ShieldCheck, Heart } from "lucide-react";
import { Logo } from "@/components/Logo";
import Image from "next/image";

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
                    Bienvenido a AFKDpu: Conexiones Reales, Sin Compromisos
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    AFKDpu es una plataforma única que te permite crear conexiones efímeras, abstractas y emocionalmente significativas con personas de diferentes roles: clientes, proveedores y empleados. Su diseño está centrado en el aquí y el ahora, priorizando las experiencias genuinas, sin la presión de mantener una relación permanente.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register">Empieza a explorar nuevas formas de conectar</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://firebasestudio.googleapis.com/v0/b/firebase-studio-app.appspot.com/o/project%2Fclvgk0sow0006m90o6b2d2j2d%2Fuploads%2F1722881180155-logo.png?alt=media&token=c2c1c73a-0d9c-49a0-9774-63309c6cd58c"
                width="600"
                height="400"
                alt="AFKDpu Logo"
                data-ai-hint="treehouse logo"
                className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
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
                  AFKDpu es una aplicación que facilita la vinculación entre clientes y proveedores de servicios, así como entre empleados, a través de conexiones temporales, emocionales y auténticas. Olvida la necesidad de almacenar información personal o comprometerte con vínculos duraderos. Cada interacción en AFKDpu está pensada para ser valiosa en el presente, sin ataduras al futuro.
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Diseñado para la interacción humana</h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Users className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Conexión Abstracta de Usuarios</h3>
                <p className="text-sm text-muted-foreground">Conecta con otros sin la necesidad de compartir datos personales. El sistema prioriza los estados emocionales y temporales sobre la información fija.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <FileText className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Reglas y Condiciones Personalizadas</h3>
                <p className="text-sm text-muted-foreground">Establece reglas para cada interacción, basadas en tiempo, estado emocional o cualquier otro criterio que defina el flujo de la conexión.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Clock className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Seguimiento Temporal de Conexiones</h3>
                <p className="text-sm text-muted-foreground">Gestiona y controla la duración de tus interacciones. Recibe recordatorios o alertas conforme cambian los estados de las conexiones.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <History className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Historial de Conexiones Abstractas</h3>
                <p className="text-sm text-muted-foreground">Recuerda el estado de cada interacción sin necesidad de almacenar información rígida. Tu historial es un reflejo de los momentos vividos.</p>
              </div>
               <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Bell className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Notificaciones Contextuales</h3>
                <p className="text-sm text-muted-foreground">Recibe notificaciones basadas en la evolución de tus conexiones, ya sea un cambio de estado emocional o un recordatorio de tiempo.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                 <ShieldCheck className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Privacidad y Foco</h3>
                <p className="text-sm text-muted-foreground">La interacción es valiosa en el presente. La plataforma se asegura de que tus datos no sean un compromiso a futuro.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="user-flow" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Flujo de Usuario</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Simple y Efectivo</h2>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
                     <Card className="p-6 text-center">
                        <PlusCircle className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle className="font-headline mb-2">1. Iniciar Conexión</CardTitle>
                        <CardContent className="p-0 text-muted-foreground">
                            Comienza una nueva conexión eligiendo tu estado emocional y el de la otra persona. Define la duración temporal de la interacción.
                        </CardContent>
                    </Card>
                     <Card className="p-6 text-center">
                        <Activity className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle className="font-headline mb-2">2. Gestionar Conexión Activa</CardTitle>
                         <CardContent className="p-0 text-muted-foreground">
                            AFKDpu supervisa el estado emocional de la interacción, ofreciendo sugerencias y activando las reglas que has definido.
                        </CardContent>
                    </Card>
                     <Card className="p-6 text-center">
                        <Wand2 className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle className="font-headline mb-2">3. Reglas Automáticas</CardTitle>
                         <CardContent className="p-0 text-muted-foreground">
                            Las reglas que determines se activarán según el estado emocional y el progreso de la conexión, manteniendo el flujo sin esfuerzo.
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
                En un mundo digital saturado de interacciones superficiales, AFKDpu se diferencia al ofrecer una plataforma que te permite conectar de forma real, sin la presión de mantener un vínculo eterno. Cada interacción es valiosa en su tiempo, y cada conexión está diseñada para ser relevante y significativa.
              </p>
            </div>
          </div>
        </section>

        <section id="join" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container text-center">
                <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Únete a AFKDpu</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed mt-4">
                    Haz de tus interacciones algo más que simples intercambios. Conéctate sin compromisos, pero con la seguridad de que lo que construyes en el momento es genuino y emocionalmente enriquecedor.
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
