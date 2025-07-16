import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';
import { stories } from '@/lib/data';

const Stories = () => {
  return (
    <section id="stories" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Historias Reales</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Fragmentos de QuickieRapidito, Ledpop, experiencias con amigos y aprendizajes personales.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl">
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
              <CardFooter>
                 {story.audioUrl && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <PlayCircle className="h-5 w-5 text-primary" />
                        <span>Escuchar la historia</span>
                        <audio src={story.audioUrl} className="hidden"></audio>
                    </div>
                  )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;