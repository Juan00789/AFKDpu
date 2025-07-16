'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { manuals } from '@/lib/data';

const allFilters = ['Todos', 'Diseño', 'Código', 'Emoción', 'Comunidad', 'nos pasó sin querer', 'aprendimos perdiendo'];

const Manuals = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredManuals = activeFilter === 'Todos' 
    ? manuals 
    : manuals.filter(manual => manual.category === activeFilter || manual.tags.includes(activeFilter));

  return (
    <section id="manuals" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Manuales Invisibles</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Fragmentos de conocimiento que creamos sin saberlo.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {allFilters.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter)}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredManuals.map((manual, index) => (
            <Card key={index} className="transform transition-transform duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{manual.title}</CardTitle>
                <Badge variant="secondary" className="w-fit">{manual.category}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{manual.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {manual.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
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

export default Manuals;
