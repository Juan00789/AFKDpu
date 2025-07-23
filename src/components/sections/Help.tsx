import { Button } from '@/components/ui/button';
import { ArrowRight, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

const Help = () => {
  return (
    <section 
      id="help" 
      className="relative flex min-h-[70vh] items-center justify-center text-center bg-background overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/50 filter blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-accent/50 filter blur-3xl animate-[float-reverse_10s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/2 -right-20 h-56 w-56 rounded-full bg-primary/30 filter blur-2xl animate-[float_12s_ease-in-out_infinite_2s]"></div>
         <div className="absolute bottom-1/4 -left-20 h-48 w-48 rounded-full bg-accent/30 filter blur-2xl animate-[float-reverse_9s_ease-in-out_infinite_1s]"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Cada idea tiene el poder de transformar vidas.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
          En AFKDpu, te damos las herramientas para que lo logres.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
           <Button asChild size="lg" variant="outline">
            <Link href="#services">
              Ver mis servicios
              <ArrowRight className="ml-2 h-5 w-5" />
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
