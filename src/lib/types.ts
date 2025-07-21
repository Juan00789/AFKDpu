export type Story = {
  title: string;
  category: string;
  audioUrl: string | null;
  quote: string;
  content: string;
};

export type TimelineEvent = {
  phase: 'Ignición' | 'Fractura' | 'Transformación' | 'Renacimiento';
  year: string;
  title: string;
  description: string;
};

type ManualDescriptionSimple = string;

type ManualDescriptionRich = {
  premise: string;
  sections: {
    title: string;
    points: string[];
  }[];
  lema: string;
};

export type Manual = {
  title: string;
  category: 'Diseño' | 'Código' | 'Emoción' | 'Comunidad' | 'Filosofía';
  description: ManualDescriptionSimple | ManualDescriptionRich;
  tags: string[];
};

export type Feature = {
  title: string;
  description: string;
};
