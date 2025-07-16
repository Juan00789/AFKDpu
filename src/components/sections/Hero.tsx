import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="flex min-h-[60vh] items-center justify-center text-center bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="group relative inline-block">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Reconstruyendo propósito desde
            <br />
            lo que nunca se vio.
          </h1>
          <Sparkles className="absolute -top-4 -right-8 h-10 w-10 text-accent opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125 motion-safe:animate-pulse" />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Un archivo de sabiduría nacida de la experiencia, la fractura y la transformación.
        </p>
      </div>
    </section>
  );
};

export default Hero;
