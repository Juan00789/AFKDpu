'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { goodNews } from '@/lib/data';
import { Award, Lightbulb, Users, HeartHandshake, Palette, Code2 } from 'lucide-react';

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Impacto Social': <Users className="h-6 w-6 text-primary" />,
  'Innovación': <Lightbulb className="h-6 w-6 text-primary" />,
  'Comunidad': <HeartHandshake className="h-6 w-6 text-primary" />,
  'Diseño': <Palette className="h-6 w-6 text-primary" />,
  'Código': <Code2 className="h-6 w-6 text-primary" />,
  'Emoción': <Award className="h-6 w-6 text-primary" />,
};


const GoodNews = () => {
  return (
    <section id="good-news" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Buenas Noticias</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Celebrando los renacimientos y las transformaciones positivas que surgieron de las cenizas.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goodNews.map((item, index) => (
            <Card key={index} className="flex flex-col transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {categoryIcons[item.category] || <Award className="h-6 w-6 text-primary" />}
                  <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                </div>
                 <Badge variant="secondary" className="w-fit mt-2">{item.category}</Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="border-primary/50 text-primary">{tag}</Badge>
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

export default GoodNews;
