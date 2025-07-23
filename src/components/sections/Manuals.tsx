'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { manuals as initialManuals } from '@/lib/data';
import type { Manual } from '@/lib/types';
import { PlayCircle, Loader, XCircle } from 'lucide-react';
import { generateAudio } from '@/ai/flows/generate-audio-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const allFilters = ['Todos', 'Diseño', 'Código', 'Emoción', 'Comunidad', 'Filosofía', 'nos pasó sin querer', 'aprendimos perdiendo'];

const Manuals = () => {
  const [manuals, setManuals] = useState<Manual[]>(initialManuals);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [loadingManual, setLoadingManual] = useState<string | null>(null);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredManuals = activeFilter === 'Todos' 
    ? manuals 
    : manuals.filter(manual => manual.category === activeFilter || manual.tags.includes(activeFilter));

  const handlePlayAudio = async (manual: Manual) => {
    if (activeAudio === manual.title) {
      setActiveAudio(null);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }
    
    if (manual.audioUrl) {
      setActiveAudio(manual.title);
      return;
    }

    setLoadingManual(manual.title);
    setActiveAudio(null);

    let textToSynthesize = manual.title + ". ";
    if (typeof manual.description === 'string') {
      textToSynthesize += manual.description;
    } else {
      textToSynthesize += manual.description.premise + " ";
      manual.description.sections.forEach(section => {
        textToSynthesize += section.title + ". " + section.points.join('. ') + ". ";
      });
      textToSynthesize += manual.description.lema;
    }


    try {
      const response = await generateAudio(textToSynthesize);
      
      if (response.media) {
        const updatedManuals = manuals.map(m => 
          m.title === manual.title ? { ...m, audioUrl: response.media } : m
        );
        setManuals(updatedManuals);
        setActiveAudio(manual.title);
      } else {
        throw new Error('No se pudo generar el audio a través de la API.');
      }
    } catch (error) {
      console.error('Error generando audio con Genkit:', error);
      toast({
        title: 'Voz Principal No Disponible',
        description: 'Intentando con una voz alternativa del sistema. La experiencia puede variar.',
        variant: 'destructive',
      });
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSynthesize);
        utterance.lang = 'es-ES';
        utterance.onend = () => {
           setActiveAudio(null);
           setLoadingManual(null);
        };
        window.speechSynthesis.speak(utterance);
        setActiveAudio(manual.title);
      } else {
         toast({
          title: 'Error Crítico',
          description: 'Tu navegador no soporta la síntesis de voz. No se pudo reproducir la filosofía.',
          variant: 'destructive',
        });
      }
    } finally {
      if (!( 'speechSynthesis' in window)) {
         setLoadingManual(null);
      }
    }
  };

  return (
    <section id="manuals" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Mi Filosofía de Trabajo</h2>
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
            <Card key={index} className={cn(
              "flex flex-col transform transition-transform duration-300 hover:-translate-y-1 bg-secondary/50 border-border hover:border-primary/50 hover:shadow-primary/10 shadow-lg",
              { 'border-primary shadow-primary/20': activeAudio === manual.title }
            )}>
              <CardHeader>
                <CardTitle className="font-headline text-xl text-foreground">{manual.title}</CardTitle>
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
               <CardFooter className="flex flex-col items-start gap-4 pt-4">
                  <Button
                    onClick={() => handlePlayAudio(manual)}
                    disabled={loadingManual === manual.title}
                    variant="ghost"
                    className="p-0 h-auto text-muted-foreground hover:text-primary"
                  >
                    {loadingManual === manual.title ? (
                      <>
                        <Loader className="h-5 w-5 mr-2 animate-spin" />
                        <span>Generando audio...</span>
                      </>
                    ) : activeAudio === manual.title ? (
                      <>
                        <XCircle className="h-5 w-5 mr-2 text-primary" />
                        <span>Detener la filosofía</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-5 w-5 mr-2 text-primary" />
                        <span>Escuchar la filosofía</span>
                      </>
                    )}
                  </Button>
                  {activeAudio === manual.title && manual.audioUrl && (
                    <audio controls autoPlay src={manual.audioUrl} onEnded={() => setActiveAudio(null)} className="w-full h-10">
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manuals;
