'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { manuals } from '@/lib/data';
import { Paintbrush, Code, Users } from 'lucide-react';

const categoryIcons = {
  'Diseño': <Paintbrush className="h-8 w-8 text-primary" />,
  'Código': <Code className="h-8 w-8 text-primary" />,
  'Comunidad': <Users className="h-8 w-8 text-primary" />,
  'Emoción': <Users className="h-8 w-8 text-primary" />,
};


const Services = () => {
  const services = manuals.filter(manual => ['Diseño', 'Código', 'Comunidad'].includes(manual.category));

  return (
    <section id="services" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Servicios</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Desde la conceptualización de un producto hasta la creación de una comunidad. Te ayudo a construir con propósito.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
              <CardHeader className="items-center text-center">
                {categoryIcons[service.category]}
                <CardTitle className="font-headline text-2xl mt-4">{service.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-muted-foreground">{service.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {service.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
