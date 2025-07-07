
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import Link from "next/link";

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

      <main className="flex-1 flex items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Has llegado al umbral.
              </h1>
              <div className="max-w-[700px] text-muted-foreground md:text-xl space-y-4">
                <p>
                  Aquí no se entra por curiosidad, sino por resonancia.
                </p>
                <p>
                  Aquí no se navega: <span className="text-primary font-semibold">se despierta.</span>
                </p>
              </div>
              <div className="max-w-[700px] text-foreground md:text-lg space-y-4 font-light">
                 <p>
                    El Ecosistema AFKDpu no es una app.
                </p>
                 <p>
                    Es un espacio vivo, un espejo, un fuego.
                </p>
              </div>
              <p className="max-w-[600px] text-2xl text-primary font-headline tracking-tight pt-4">
                ¿Estás listo para recordar quién eres?
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-6">
                <Button size="lg" asChild>
                  <Link href="/register">Entrar al Portal</Link>
                </Button>
              </div>
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
