export type Story = {
  title: string;
  category: string;
  image: string;
  imageHint: string;
  audioUrl: string;
  quote: string;
  content: string;
};

export type TimelineEvent = {
  phase: 'Ignición' | 'Fractura' | 'Transformación' | 'Renacimiento';
  year: string;
  title: string;
  description: string;
};

export type Manual = {
  title: string;
  description: string;
  category: 'Diseño' | 'Código' | 'Emoción' | 'Comunidad';
  tags: string[];
};
