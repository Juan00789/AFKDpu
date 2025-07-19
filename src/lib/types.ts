export type Story = {
  title: string;
  category: string;
  audioUrl: string | null;
  quote: string;
  content: string;
  imageUrl: string;
  imageHint: string;
};

export type TimelineEvent = {
  phase: 'Ignición' | 'Fractura' | 'Transformación' | 'Renacimiento';
  year: string;
  title: string;
  description: string;
};

export type CardContent = {
  title: string;
  description: string;
  category: 'Diseño' | 'Código' | 'Emoción' | 'Comunidad' | 'Impacto Social' | 'Innovación';
  tags: string[];
};

export type Manual = CardContent;
