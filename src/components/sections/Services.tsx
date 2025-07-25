'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { afkEcosystemFeatures } from '@/lib/data';
import type { Feature } from '@/lib/types';
import { Store, GraduationCap, LandPlot, Users, LayoutDashboard, GanttChartSquare } from 'lucide-react';
import Link from 'next/link';

const featureIcons: { [key: string]: React.ReactNode } = {
  'Marketplace local': <Store className="h-8 w-8 text-primary" />,
  'Microcursos exprés': <GraduationCap className="h-8 w-8 text-primary" />,
  'Microcréditos colaborativos': <LandPlot className="h-8 w-8 text-primary" />,
  'Mentorías y foros': <Users className="h-8 w-8 text-primary" />,
  'Panel de control personalizado': <LayoutDashboard className="h-8 w-8 text-primary" />,
  'Default': <GanttChartSquare className="h-8 w-8 text-primary" />,
};

const Services = () => {
  return (
    <section id="services" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Nuestros Servicios</h2>
          <p className="mt-3 max-w-3xl mx-auto text-lg text-muted-foreground">
            AFKEcosystem es una plataforma digital diseñada para empoderar a microemprendedores y fortalecer comunidades locales a través de herramientas tecnológicas, educación exprés y redes colaborativas.
          </p>
        </div>
        <div className="mt-12">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-center mb-8 text-foreground">¿Qué incluye AFKEcosystem?</h3>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {afkEcosystemFeatures.map((feature: Feature, index: number) => (
              <Link href="https://studio--afkecosystem.us-central1.hosted.app" key={index} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="h-full flex flex-col transform transition-transform duration-300 hover:-translate-y-2 bg-background/50 border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader className="items-center text-center">
                      {featureIcons[feature.title] || featureIcons['Default']}
                      <CardTitle className="font-headline text-xl mt-4 text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                      <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
