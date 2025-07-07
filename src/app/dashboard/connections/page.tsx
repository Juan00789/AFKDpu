
'use client';
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Connection } from "@/lib/mock-data";
import { Users, Clock, Loader2 } from "lucide-react";
import { AddConnectionDialog } from "@/components/AddServiceDialog";
import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

const emotionalStateBadgeVariants = cva(
  "border-transparent capitalize text-xs",
  {
    variants: {
      status: {
        Vibrante: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200",
        Neutral: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
        Fading: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200",
        Sereno: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200",
        Difuso: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200",
      },
    },
  }
);

function ConnectionCard({ connection }: { connection: Connection }) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-card">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium pr-2">{connection.purpose}</p>
            <Badge variant="outline" className={emotionalStateBadgeVariants({ status: connection.emotionalState })}>{connection.emotionalState}</Badge>
        </div>
         <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Clock className="h-3 w-3" />
            <span>{connection.duration}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center -space-x-1">
             {connection.participants.map(p => (
                <Avatar key={p.id} className="h-5 w-5 border-2 border-card">
                  <AvatarImage src={p.avatar} />
                  <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ConnectionsKanbanPage() {
  const { appUser } = useAuth();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appUser) return;
    setLoading(true);

    const q = query(
      collection(db, "connections"),
      where("userIds", "array-contains", appUser.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const connectionsData: Connection[] = [];
      querySnapshot.forEach((doc) => {
        connectionsData.push({
          id: doc.id,
          ...doc.data()
        } as Connection);
      });
      setConnections(connectionsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching connections: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [appUser]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  const openConnections = connections.filter(c => c.status === "Abierto");
  const inProgressConnections = connections.filter(c => c.status === "En Progreso");
  const doneConnections = connections.filter(c => c.status === "Terminadas");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-headline">Tablero de Conexiones</h2>
          <p className="text-muted-foreground">Gestiona tus vínculos abstractos por estado.</p>
        </div>
        <AddConnectionDialog />
      </div>
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Abierto ({openConnections.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {openConnections.map(conn => <ConnectionCard key={conn.id} connection={conn} />)}
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>En Progreso ({inProgressConnections.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {inProgressConnections.map(conn => <ConnectionCard key={conn.id} connection={conn} />)}
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Terminadas ({doneConnections.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {doneConnections.map(conn => <ConnectionCard key={conn.id} connection={conn} />)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
