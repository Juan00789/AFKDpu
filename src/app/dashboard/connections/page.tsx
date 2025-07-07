
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
import Link from "next/link";

function ConnectionCard({ connection }: { connection: Connection }) {
  return (
    <Link href={`/dashboard/connections/${connection.id}`} className="block">
        <Card className="hover:shadow-md transition-shadow bg-card h-full">
        <CardContent className="p-4 flex flex-col justify-between h-full">
            <div>
                <p className="font-medium pr-2 mb-2">{connection.purpose}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <Clock className="h-3 w-3" />
                    <span>{connection.duration}</span>
                </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
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
    </Link>
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
  
  const activeConnections = connections.filter(c => c.status === "Activo");
  const waitingConnections = connections.filter(c => c.status === "En espera");
  const closedConnections = connections.filter(c => c.status === "Cerrado");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-headline">Tablero de Conexiones</h2>
          <p className="text-muted-foreground">Gestiona tus conversaciones y tareas por estado.</p>
        </div>
        <AddConnectionDialog />
      </div>
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Activo ({activeConnections.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeConnections.map(conn => <ConnectionCard key={conn.id} connection={conn} />)}
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>En espera ({waitingConnections.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {waitingConnections.map(conn => <ConnectionCard key={conn.id} connection={conn} />)}
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Cerrado ({closedConnections.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {closedConnections.map(conn => <ConnectionCard key={conn.id} connection={conn} />)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
