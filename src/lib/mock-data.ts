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
  name: string;
  status: "Vibrante" | "Neutral" | "Fading";
  duration: string;
  participants: User[];
};

export type Task = {
  id: string;
  title: string;
  status: "Abierto" | "En Progreso" | "Terminadas";
  connectionId: string;
  connectionName: string;
  participants: User[];
};

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Alicia Keys', email: 'alicia@email.com', role: 'Cliente', avatar: 'https://placehold.co/100x100.png' },
  { id: 'user-2', name: 'Bruno Mars', email: 'bruno@email.com', role: 'Proveedor', avatar: 'https://placehold.co/100x100.png' },
  { id: 'user-3', name: 'Carlos Santana', email: 'carlos@email.com', role: 'Cliente', avatar: 'https://placehold.co/100x100.png' },
  { id: 'user-4', name: 'Diana Ross', email: 'diana@email.com', role: 'Proveedor', avatar: 'https://placehold.co/100x100.png' },
  { id: 'user-5', name: 'Eric Clapton', email: 'eric@email.com', role: 'Empleado', avatar: 'https://placehold.co/100x100.png', objectives: 'Buscar proveedores para proyectos a corto plazo en tecnología sostenible. Mantener conexiones auténticas sin comprometer la privacidad.' },
];

export const mockConnections: Connection[] = [
  { id: 'conn-1', name: 'Proyecto Phoenix', status: 'Vibrante', duration: '25 días restantes', participants: [mockUsers[0], mockUsers[1]] },
  { id: 'conn-2', name: 'Campaña de Marketing Q3', status: 'Neutral', duration: '10 días restantes', participants: [mockUsers[2], mockUsers[3]] },
  { id: 'conn-3', name: 'Desarrollo App Móvil', status: 'Fading', duration: '3 días restantes', participants: [mockUsers[0], mockUsers[3]] },
  { id: 'conn-4', name: 'Integración API', status: 'Vibrante', duration: '40 días restantes', participants: [mockUsers[2], mockUsers[1]] },
];

export const mockTasks: Task[] = [
  { id: 'task-1', title: 'Definir KPIs de campaña', status: 'En Progreso', connectionId: 'conn-2', connectionName: 'Campaña de Marketing Q3', participants: [mockUsers[2], mockUsers[3]] },
  { id: 'task-2', title: 'Revisión de wireframes', status: 'Terminadas', connectionId: 'conn-3', connectionName: 'Desarrollo App Móvil', participants: [mockUsers[0], mockUsers[3]] },
  { id: 'task-3', title: 'Kick-off del proyecto', status: 'Terminadas', connectionId: 'conn-1', connectionName: 'Proyecto Phoenix', participants: [mockUsers[0], mockUsers[1]] },
  { id: 'task-4', title: 'Configurar entorno de desarrollo', status: 'Abierto', connectionId: 'conn-4', connectionName: 'Integración API', participants: [mockUsers[2], mockUsers[1]] },
  { id: 'task-5', title: 'Crear copys para anuncios', status: 'Abierto', connectionId: 'conn-2', connectionName: 'Campaña de Marketing Q3', participants: [mockUsers[2], mockUsers[3]] },
  { id: 'task-6', title: 'Testing de endpoints', status: 'En Progreso', connectionId: 'conn-4', connectionName: 'Integración API', participants: [mockUsers[2], mockUsers[1]] },
];
