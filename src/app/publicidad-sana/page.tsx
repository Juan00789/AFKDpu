import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Separator } from "@/components/ui/separator";

const Feature = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div>
    <h3 className="text-xl font-bold font-headline mb-2">{title}</h3>
    <p className="text-muted-foreground">{children}</p>
  </div>
);

export default function PublicidadSanaPage() {
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

      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-center">
              Publicidad Sana
            </h1>
            <p className="mt-4 text-center text-muted-foreground md:text-xl">
              Un enfoque que busca construir relaciones auténticas y responsables con los consumidores.
            </p>
            <p className="mt-8 text-lg text-muted-foreground">
              La publicidad sana se refiere a un tipo de publicidad que se aleja de las estrategias manipulativas, engañosas o deshonestas y en su lugar, se enfoca en promover productos, servicios o ideas de manera auténtica, responsable y transparente. Esta forma de publicidad busca establecer una relación más honesta y respetuosa con el consumidor, construyendo confianza y valor a largo plazo, en lugar de generar ganancias rápidas a través de promesas vacías o malentendidos.
            </p>
            
            <Separator className="my-12" />

            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl font-headline mb-8">
              Características de la publicidad sana
            </h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
              <Feature title="Autenticidad">
                La publicidad sana refleja la verdadera esencia de lo que se está promocionando. No exagera ni distorsiona la realidad. Es honesta sobre los beneficios y limitaciones de un producto o servicio.
              </Feature>
              <Feature title="Transparencia">
                Las marcas son claras sobre los detalles del producto o servicio que están ofreciendo, incluyendo precios, condiciones, posibles efectos secundarios o limitaciones. No se ocultan detalles importantes para que los consumidores tomen decisiones informadas.
              </Feature>
              <Feature title="Respeto por el consumidor">
                Se respeta la inteligencia y la autonomía del consumidor. En lugar de manipular las emociones o las decisiones, la publicidad sana le da al público el espacio para tomar sus propias decisiones basadas en información veraz.
              </Feature>
              <Feature title="Ética y responsabilidad social">
                Se evita el uso de técnicas que exploten inseguridades o miedos. La publicidad sana también se aleja de los estereotipos negativos, el sexismo, el racismo o cualquier forma de discriminación.
              </Feature>
              <Feature title="Fomento de valores positivos">
                Muchas veces, las campañas de publicidad sana se centran en valores que benefician al bienestar de la sociedad: sostenibilidad, igualdad, salud, y bienestar, entre otros.
              </Feature>
              <Feature title="Sostenibilidad">
                Es importante que las marcas que se publicitan de esta manera también practiquen lo que predican, es decir, que sus prácticas sean sostenibles, tanto en el ámbito ambiental como en el social. De nada sirve tener una publicidad sana si el comportamiento de la marca no respalda esos mensajes.
              </Feature>
            </div>
            
            <Separator className="my-12" />

            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl font-headline mb-8">
              Ejemplos de publicidad sana
            </h2>
            <div className="space-y-8">
              <Feature title="Marketing Transparente">
                Una marca que ofrece un servicio o producto, y es clara con las características del mismo. Por ejemplo, una marca de cosméticos que publica sus ingredientes y explica cómo afectan a la piel de forma honesta, sin hacer promesas milagrosas.
              </Feature>
              <Feature title="Publicidad que promueve el bienestar">
                Muchas campañas hoy en día están comenzando a alejarse del concepto de belleza convencional y se enfocan en promover una belleza natural y saludable, sin presionar a los consumidores para que se ajusten a estándares poco realistas.
              </Feature>
              <Feature title="Publicidad inclusiva y diversa">
                Las marcas que muestran a personas de todas las razas, tamaños y géneros, promoviendo un mensaje inclusivo y aceptante en lugar de promover un ideal único de belleza o éxito.
              </Feature>
              <Feature title="Publicidad ecológica">
                Las marcas que promueven productos que son ecológicamente responsables, que se enfocan en la sostenibilidad y el respeto por el medio ambiente, asegurándose de que lo que ofrecen sea realmente positivo para el planeta.
              </Feature>
            </div>

            <Separator className="my-12" />

             <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl font-headline mb-8">
              ¿Por qué es importante la publicidad sana?
            </h2>
            <div className="space-y-8">
              <Feature title="Genera confianza">
                La honestidad y la transparencia son clave para construir una relación genuina entre la marca y el consumidor. Los consumidores de hoy en día buscan autenticidad, y las marcas que se alinean con este valor pueden fortalecer su lealtad.
              </Feature>
              <Feature title="Promueve un consumo responsable">
                Fomenta la toma de decisiones basadas en el bienestar personal y colectivo, en lugar de seguir modas pasajeras o caer en las trampas del consumismo.
              </Feature>
              <Feature title="Mejora la reputación de la marca">
                Las marcas que practican la publicidad sana y ética a menudo son vistas como más responsables y confiables. Esto puede mejorar la imagen de la marca y diferenciarla de sus competidores.
              </Feature>
              <Feature title="Impacto positivo en la sociedad">
                La publicidad sana puede influir positivamente en la sociedad al promover valores como la inclusión, la equidad, la sostenibilidad y la empatía, en lugar de contribuir a la perpetuación de estereotipos negativos.
              </Feature>
            </div>

            <Separator className="my-12" />

            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl font-headline mb-4">
                Conclusión
                </h2>
                <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
                La publicidad sana es un enfoque que busca construir relaciones auténticas y responsables con los consumidores. A través de la transparencia, la honestidad y el respeto, no solo se genera un impacto positivo en la marca, sino que también se contribuye al bienestar colectivo y la creación de una sociedad más ética. En un mundo cada vez más consciente de los valores, las marcas que eligen ser auténticas y responsables probablemente se verán más favorecidas por los consumidores.
                </p>
            </div>
          </div>
        </div>
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
