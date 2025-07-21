'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { manuals } from '@/lib/data';
import type { Manual } from '@/lib/types';

const allFilters = ['Todos', 'Diseño', 'Código', 'Emoción', 'Comunidad', 'Filosofía', 'nos pasó sin querer', 'aprendimos perdiendo'];

const Manuals = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredManuals = activeFilter === 'Todos' 
    ? manuals 
    : manuals.filter(manual => manual.category === activeFilter || manual.tags.includes(activeFilter));

  return (
    <section id="manuals" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Mi Filosofía de Trabajo</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Estos no son dogmas, son los principios que guían mi forma de crear, nacidos de la experiencia.
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
        <div className="mt-12 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredManuals.map((manual: Manual, index: number) => (
            <Card key={index} className="flex flex-col transform transition-transform duration-300 hover:-translate-y-1 bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{manual.title}</CardTitle>
                <Badge variant="secondary" className="w-fit">{manual.category}</Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                {typeof manual.description === 'string' ? (
                  <p className="text-muted-foreground">{manual.description}</p>
                ) : (
                  <div className="space-y-4 text-sm">
                    {manual.description.premise && <p className="italic text-muted-foreground">{manual.description.premise}</p>}
                    {manual.description.sections && manual.description.sections.map((section, sIndex) => (
                      <div key={sIndex}>
                        <h4 className="font-bold text-foreground">{section.title}</h4>
                        <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                          {section.points.map((point, pIndex) => <li key={pIndex}>{point}</li>)}
                        </ul>
                      </div>
                    ))}
                    {manual.description.lema && <blockquote className="mt-4 border-l-2 border-primary pl-4 font-bold text-foreground">{manual.description.lema}</blockquote>}
                  </div>
                )}
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
