import type { Story, TimelineEvent, Manual, CardContent } from './types';

export const stories: Story[] = [
  {
    title: 'De QuickieRapidito a Ledpop',
    category: 'Evolución',
    audioUrl: null,
    quote: 'A veces, algo debe morir para que algo nuevo pueda nacer.',
    content: 'QuickieRapidito no fue un fracaso, fue un sacrificio. Su estructura y aprendizaje fueron la semilla que permitió el nacimiento de Ledpop, enseñándonos que la verdadera innovación a menudo requiere dejar ir lo que funciona para construir algo que transforma.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'phoenix rising',
  },
  {
    title: 'La Meta: El Resurgimiento',
    category: 'Meta',
    audioUrl: null,
    quote: 'Las cenizas no son el final, son el fertilizante para lo que vendrá.',
    content: 'El objetivo ahora es claro: reconstruir y relanzar tanto Ledpop como QuickieRapidito. No como eran antes, sino como siempre debieron ser. Con la lección aprendida, la comunidad como pilar y un propósito inquebrantable.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'sprout growing',
  },
  {
    title: 'Conexiones Inesperadas',
    category: 'Comunidad',
    audioUrl: null,
    quote: 'Las mejores colaboraciones no se buscan, se encuentran en el camino.',
    content: 'Historias de cómo las amistades y alianzas fortuitas se convirtieron en el pilar de nuestros proyectos más significativos.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'linked hands',
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

export const goodNews: CardContent[] = [
  {
    title: 'De Fracaso a Mentoría',
    category: 'Impacto Social',
    description: 'Ex-fundadores de startups fallidas ahora dedican su tiempo a guiar a nuevos emprendedores, transformando su experiencia en un activo para la comunidad.',
    tags: ['Renacimiento', 'Comunidad'],
  },
  {
    title: 'Código Abierto para Causas Nobles',
    category: 'Innovación',
    description: 'Un proyecto que nació de un "hackathon" interno se ha convertido en una herramienta de código abierto utilizada por ONGs para gestionar voluntariado.',
    tags: ['Código', 'Impacto Social'],
  },
  {
    title: 'El Jardín Comunitario Digital',
    category: 'Comunidad',
    description: 'Una aplicación para conectar vecinos y cuidar espacios verdes urbanos, nacida de la necesidad de reconectar con la naturaleza tras un burnout.',
    tags: ['Bienestar', 'Tecnología'],
  },
];
