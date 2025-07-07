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
  status: "Activo" | "En espera" | "Cerrado";
  participants: Omit<User, 'objectives'>[];
  userIds: string[];
  duration: string;
  rules: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  }
};

export type Message = {
  id: string;
  text: string;
  createdAt: any; // Firestore Timestamp
  senderId: string;
  senderName: string;
  senderAvatar: string;
};
