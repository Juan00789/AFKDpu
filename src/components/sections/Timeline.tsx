import { timelineEvents } from '@/lib/data';
import { Flame, HeartCrack, Layers, Flower2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const phaseIcons: { [key: string]: LucideIcon } = {
  'Ignición': Flame,
  'Fractura': HeartCrack,
  'Transformación': Layers,
  'Renacimiento': Flower2,
};

const phaseColors: { [key: string]: string } = {
    'Ignición': 'text-[hsl(var(--chart-1))]',
    'Fractura': 'text-[hsl(var(--chart-2))]',
    'Transformación': 'text-[hsl(var(--chart-3))]',
    'Renacimiento': 'text-[hsl(var(--chart-5))]',
};

const Timeline = () => {
  return (
    <section id="timeline" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Mi Trayectoria</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Un viaje a través de las fases que me dieron la experiencia para poder ayudarte hoy.
          </p>
        </div>
        <div className="relative mt-12">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {timelineEvents.map((event, index) => {
            const Icon = phaseIcons[event.phase];
            const color = phaseColors[event.phase];
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className={`relative mb-8 flex w-full items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                <div className={`hidden lg:block w-5/12`}></div>
                <div className="absolute left-1/2 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"></div>
                <div className="w-full rounded-lg bg-card p-6 shadow-md lg:w-5/12">
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`font-bold ${color}`}>{event.phase}</span>
                    <span className="text-sm font-medium text-muted-foreground">{event.year}</span>
                  </div>
                  <h3 className="mb-2 font-headline text-xl font-bold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                   <Icon className={`absolute top-4 ${isLeft ? 'lg:right-[-4.5rem]' : 'lg:left-[-4.5rem]'} hidden lg:block h-12 w-12 p-2 rounded-full bg-card shadow-md ${color}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
