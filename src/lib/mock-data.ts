export type User = {
  id: string;
  name: string;
  email: string;
  role: "Cliente" | "Proveedor" | "Empleado";
  avatar: string;
  objectives?: string;
};

export type Connection = {
  id: string;
  purpose: string;
  status: "Abierto" | "En Progreso" | "Terminadas";
  participants: User[];
  userIds: string[];
  emotionalState: "Vibrante" | "Neutral" | "Fading" | "Sereno" | "Difuso";
  duration: string;
  rules: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  }
};

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Alicia Keys', email: 'alicia@email.com', role: 'Cliente', avatar: 'https://placehold.co/100x100.png' },
  { id: 'user-2', name: 'Bruno Mars', email: 'bruno@email.com', role: 'Proveedor', avatar: 'https://placehold.co/100x100.png' },
  { id: 'user-3', name: 'Carlos Santana', email: 'carlos@email.com', role: 'Cliente', avatar: 'https://placehold.co/100x100.png' },
  { id: 'user-4', name: 'Diana Ross', email: 'diana@email.com', role: 'Proveedor', avatar: 'https://placehold.co/100x100.png' },
  { id: 'user-5', name: 'Eric Clapton', email: 'eric@email.com', role: 'Empleado', avatar: 'https://placehold.co/100x100.png', objectives: 'Buscar proveedores para proyectos a corto plazo en tecnología sostenible. Mantener conexiones auténticas sin comprometer la privacidad.' },
];
