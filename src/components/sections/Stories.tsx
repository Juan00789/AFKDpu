'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, Loader, XCircle } from 'lucide-react';
import { stories as initialStories } from '@/lib/data';
import type { Story } from '@/lib/types';
import { generateAudio } from '@/ai/flows/generate-audio-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Stories = () => {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [loadingStory, setLoadingStory] = useState<string | null>(null);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePlayAudio = async (story: Story) => {
    if (activeAudio === story.title) {
      setActiveAudio(null);
      // Stop any browser-based speech synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }
    
    if (story.audioUrl) {
      setActiveAudio(story.title);
      return;
    }

    setLoadingStory(story.title);
    setActiveAudio(null);
    const textToSynthesize = `${story.title}. ${story.quote}. ${story.content}`;

    try {
      const response = await generateAudio(textToSynthesize);
      
      if (response.media) {
        const updatedStories = stories.map(s => 
          s.title === story.title ? { ...s, audioUrl: response.media } : s
        );
        setStories(updatedStories);
        setActiveAudio(story.title);
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
      // Fallback to browser's Speech Synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSynthesize);
        utterance.lang = 'es-ES';
        utterance.onend = () => {
           setActiveAudio(null);
           setLoadingStory(null);
        };
        window.speechSynthesis.speak(utterance);
        setActiveAudio(story.title); // Visually activate while browser speaks
      } else {
         toast({
          title: 'Error Crítico',
          description: 'Tu navegador no soporta la síntesis de voz. No se pudo reproducir la historia.',
          variant: 'destructive',
        });
      }
    } finally {
      // For Genkit flow, loading is stopped inside the try/catch.
      // For browser synthesis, it's stopped onend.
      if (!( 'speechSynthesis' in window)) {
         setLoadingStory(null);
      }
    }
  };

  return (
    <section id="stories" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Mi Experiencia a tu Servicio</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Estas no son solo historias, son la base de mi conocimiento. Cada lección aprendida es una herramienta que ahora puedo usar para ayudarte.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1">
          {stories.map((story, index) => (
            <Card key={index} className={cn("flex flex-col overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl", {
              'border-primary shadow-lg': activeAudio === story.title,
            })}>
              <div className="flex flex-col">
                <CardHeader>
                  <CardTitle className="mt-4 font-headline text-2xl">{story.title}</CardTitle>
                  <Badge variant="outline" className="mt-1 w-fit bg-accent text-accent-foreground">{story.category}</Badge>
                </CardHeader>
                <CardContent className="flex-grow">
                  <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
                    "{story.quote}"
                  </blockquote>
                  <p className="mt-4 text-sm">{story.content}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <Button
                    onClick={() => handlePlayAudio(story)}
                    disabled={loadingStory === story.title}
                    variant="ghost"
                    className="p-0 h-auto text-muted-foreground hover:text-primary"
                  >
                    {loadingStory === story.title ? (
                      <>
                        <Loader className="h-5 w-5 mr-2 animate-spin" />
                        <span>Generando audio...</span>
                      </>
                    ) : activeAudio === story.title ? (
                      <>
                        <XCircle className="h-5 w-5 mr-2 text-primary" />
                        <span>Detener la historia</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-5 w-5 mr-2 text-primary" />
                        <span>Escuchar la historia</span>
                      </>
                    )}
                  </Button>
                  {activeAudio === story.title && story.audioUrl && (
                    <audio controls autoPlay src={story.audioUrl} onEnded={() => setActiveAudio(null)} className="w-full h-10">
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;
