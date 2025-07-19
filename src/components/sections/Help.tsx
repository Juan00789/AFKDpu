import { Button } from '@/components/ui/button';
import { ArrowDown, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

const Help = () => {
  return (
    <section id="help" className="flex min-h-[70vh] items-center justify-center text-center bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          ¿Cómo puedo ayudarte?
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
          Mi experiencia, nacida de la prueba y el error, está a tu disposición. Si tienes una idea, un proyecto atascado o necesitas una nueva perspectiva, conversemos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
           <Button asChild size="lg" variant="outline">
            <Link href="#services">
              Ver mis servicios
              <ArrowDown className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg">
            <a href="https://www.patreon.com/c/afkdpu" target="_blank" rel="noopener noreferrer">
              Únete a la Causa
              <HeartHandshake className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Help;
