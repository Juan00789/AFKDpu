import type { Story, TimelineEvent, Manual } from './types';

export const stories: Story[] = [
  {
    title: 'El Nacimiento de QuickieRapidito',
    category: 'Emprendimiento',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'startup office',
    audioUrl: '',
    quote: 'La necesidad es la madre de la invención, pero la frustración es el padre.',
    content: 'Una idea que surgió de la simple necesidad de resolver un problema cotidiano, convirtiéndose en una lección sobre velocidad y eficiencia.',
  },
  {
    title: 'La Caída de Ledpop',
    category: 'Aprendizaje',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'broken lightbulb',
    audioUrl: '',
    quote: 'A veces, para ver la luz, primero todo tiene que apagarse.',
    content: 'El fracaso más grande nos enseñó sobre la importancia de la resiliencia y cómo encontrar oportunidades en la adversidad.',
  },
  {
    title: 'Conexiones Inesperadas',
    category: 'Comunidad',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'friends talking',
    audioUrl: '',
    quote: 'Las mejores colaboraciones no se buscan, se encuentran en el camino.',
    content: 'Historias de cómo las amistades y alianzas fortuitas se convirtieron en el pilar de nuestros proyectos más significativos.',
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    phase: 'Ignición',
    year: '2018',
    title: 'La Chispa Inicial',
    description: 'Nace QuickieRapidito. Una idea simple con un potencial enorme. La energía del comienzo y la creencia de que todo es posible.',
  },
  {
    phase: 'Fractura',
    year: '2020',
    title: 'El Punto de Quiebre',
    description: 'Ledpop se desvanece. La dura realidad del mercado y los errores internos nos obligan a detenernos y reevaluar todo.',
  },
  {
    phase: 'Transformación',
    year: '2021',
    title: 'Recogiendo los Pedazos',
    description: 'Comenzamos a documentar nuestros aprendizajes. Nace la idea de los "manuales invisibles", convirtiendo el fracaso en conocimiento.',
  },
  {
    phase: 'Renacimiento',
    year: '2023',
    title: 'Nace AFKDpu',
    description: 'Lo que era un archivo personal se convierte en una plataforma para compartir. El propósito se reconstruye desde las cenizas.',
  },
];

export const manuals: Manual[] = [
  {
    title: 'Diseño Emocional',
    category: 'Diseño',
    description: 'Cómo crear interfaces que no solo funcionen bien, sino que también conecten emocionalmente con el usuario.',
    tags: ['aprendimos perdiendo'],
  },
  {
    title: 'Código Resiliente',
    category: 'Código',
    description: 'Estrategias para escribir código que sobrevive al caos, a los cambios de equipo y a los giros inesperados del proyecto.',
    tags: ['nos pasó sin querer'],
  },
  {
    title: 'La Comunidad como Red de Apoyo',
    category: 'Comunidad',
    description: 'Lecciones sobre cómo construir y mantener una comunidad que sostiene, apoya e impulsa en los momentos difíciles.',
    tags: ['aprendimos perdiendo'],
  },
  {
    title: 'Gestionar la Incertidumbre',
    category: 'Emoción',
    description: 'Un manual no técnico sobre cómo navegar la montaña rusa emocional de emprender y crear.',
    tags: ['aprendimos perdiendo'],
  },
  {
    title: 'El Arte de Pivotar',
    category: 'Código',
    description: 'Cuándo y cómo cambiar de dirección sin perder el alma del proyecto. Una guía técnica y estratégica.',
    tags: ['nos pasó sin querer'],
  },
  {
    title: 'Feedback que Construye',
    category: 'Diseño',
    description: 'Cómo dar y recibir críticas de diseño que eleven el producto en lugar de destruir la moral del equipo.',
    tags: ['aprendimos perdiendo'],
  },
];
