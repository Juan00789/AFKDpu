
export type User = {
  id: string;
  name: string;
  email: string;
  role: "Cliente" | "Proveedor" | "Empleado";
  avatar: string;
  objectives?: string;
  points: number;
  profileCompleted: boolean;
  claimedBusinessId?: string;
  bankName?: string;
  bankAccountNumber?: string;
};

export type Connection = {
  id: string;
  purpose: string;
  status: "Activo" | "En espera" | "Cerrado";
  participants: Omit<User, 'objectives' | 'points' | 'profileCompleted' | 'claimedBusinessId'>[];
  userIds: string[];
  duration: string;
  rules: string;
  creatorId: string;
  provider: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  reviewsGiven?: { [key: string]: boolean };
};

export type Message = {
  id: string;
  text: string;
  createdAt: any; // Firestore Timestamp
  senderId: string;
  senderName: string;
  senderAvatar: string;
};

export type Review = {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  reviewedUserId: string;
  connectionId: string;
  rating: number;
  comment: string;
  createdAt: any; // Firestore Timestamp
};
