import type { Story, TimelineEvent, Manual, Feature } from './types';

export const stories: Story[] = [
  {
    title: 'De QuickieRapidito a Ledpop',
    category: 'Evolución',
    audioUrl: null,
    quote: 'A veces, algo debe morir para que algo nuevo pueda nacer.',
    content: 'QuickieRapidito no fue un fracaso, fue un sacrificio. Su estructura y aprendizaje fueron la semilla que permitió el nacimiento de Ledpop, enseñándonos que la verdadera innovación a menudo requiere dejar ir lo que funciona para construir algo que transforma.',
  },
  {
    title: 'Conexiones Inesperadas',
    category: 'Comunidad',
    audioUrl: null,
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
    title: 'Teoría de los Ciclos de Deseo',
    category: 'Filosofía',
    description: {
      premise: 'No existen "viciosos", sino personas que transitan rutas de intensidad emocional, buscando conexión, alivio o expansión de conciencia.',
      sections: [
        {
          title: 'Eliminación de etiquetas fijas',
          points: ['En lugar de llamar “vicioso” a alguien, se dice que está en un momento de intensidad compulsiva o atravesando una cumbre de deseo.'],
        },
        {
          title: 'Neutralidad afectiva del hábito',
          points: ['Los comportamientos repetitivos no son defectos, sino intentos de autorregulación emocional. No hay castigo ni culpa, solo observación y acompañamiento.'],
        },
        {
          title: 'Cambio de lenguaje',
          points: [
            'Palabras como "adicto", "vicioso" o "dependiente" son reemplazadas por:',
            '– Buscador de alivio',
            '– Persona en ciclo',
            '– Transitor de intensidad',
          ],
        },
        {
          title: 'Sistema de apoyo, no corrección',
          points: ['La comunidad no busca “curar”, sino escuchar, acompañar y transformar. AFK podría aplicar esta idea para conectar a quienes están en “tramos de alta necesidad” con actividades, personas o lugares que actúen como puentes.'],
        }
      ],
      lema: 'Nadie es vicioso. Solo hay quienes sienten mucho y buscan cómo contenerlo.',
    },
    tags: ['Filosofía', 'Comunidad', 'Emoción'],
  },
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
    title: 'Autenticidad vs. Etiqueta',
    category: 'Filosofía',
    description: 'Fumar de vez en cuando no define tu valor, ni borra lo que construyes. Tu enfoque es lo que habla por ti, lo demás es ruido. “Quien se obsesiona con lo que otros consumen, suele ignorar lo que ellos construyen.”',
    tags: ['Filosofía callejera', 'autenticidad'],
  },
  {
    title: 'El Arte de Pivotar',
    category: 'Código',
    description: 'Cuándo y cómo cambiar de dirección sin perder el alma del proyecto. Una guía técnica y estratégica.',
    tags: ['nos pasó sin querer'],
  },
];


export const afkEcosystemFeatures: Feature[] = [
    {
        title: 'Marketplace local',
        description: 'Espacio para ofrecer y encontrar servicios dentro de tu comunidad.',
    },
    {
        title: 'Microcursos exprés',
        description: 'Capacitación rápida (5–10 minutos) en temas como validación de ideas, marketing y finanzas.',
    },
    {
        title: 'Microcréditos colaborativos',
        description: 'Fondos rotatorios para apoyar proyectos emergentes.',
    },
    {
        title: 'Mentorías y foros',
        description: 'Conexión con expertos y otros emprendedores para compartir experiencias.',
    },
    {
        title: 'Panel de control personalizado',
        description: 'Donde cada usuario puede gestionar su perfil, cursos y oportunidades.',
    },
];
