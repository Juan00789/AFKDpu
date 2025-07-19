import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Help = () => {
  return (
    <section 
      id="help" 
      className="flex min-h-[80vh] items-center justify-center text-center text-white bg-gradient-to-br from-blue-900 via-gray-800 to-orange-700"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Tu tecnología. Tu historia. Nuestro compromiso.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-200 md:text-xl">
          Traduzco lo complejo en soluciones accesibles para que emprendas con seguridad. En AFKDpu, tu idea importa, tu éxito nos inspira.
        </p>
        <div className="mt-8 flex justify-center">
           <Button asChild size="lg">
            <Link href="#services">
              Ver mis servicios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Help;
