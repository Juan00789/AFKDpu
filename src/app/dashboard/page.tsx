'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Connection } from "@/lib/mock-data"
import { ArrowRight, History as HistoryIcon, Loader2 } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AddConnectionDialog } from "@/components/AddServiceDialog";

function ActiveConnectionsSummary() {
  const { appUser } = useAuth();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appUser) return;

    const q = query(
      collection(db, "connections"),
      where("userIds", "array-contains", appUser.id),
      where("status", "in", ["Activo", "En espera"]),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const connectionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Connection));
      setConnections(connectionsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching active connections:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [appUser]);


  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conexiones Activas</CardTitle>
          <CardDescription>Un resumen de tus conversaciones y tareas actuales.</CardDescription>
        </CardHeader>
        <CardContent className="flex h-48 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Conexiones Activas</CardTitle>
            <CardDescription>Un resumen de tus conversaciones y tareas actuales.</CardDescription>
        </div>
        {appUser?.role === "Cliente" && <AddConnectionDialog />}
      </CardHeader>
      <CardContent>
        {connections.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propósito</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead><span className="sr-only">Acciones</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {connections.map(conn => (
                <TableRow key={conn.id}>
                  <TableCell className="font-medium">{conn.purpose}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{conn.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center -space-x-2">
                      {conn.participants.map(p => (
                        <Avatar key={p.id} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={p.avatar} />
                          <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{conn.duration}</TableCell>
                  <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/connections/${conn.id}`}>
                              <ArrowRight className="h-4 w-4" />
                              <span className="sr-only">Ver conexión</span>
                          </Link>
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No tienes conexiones activas en este momento.</p>
        )}
      </CardContent>
    </Card>
  )
}


export default function DashboardPage() {
  const { appUser } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">¡Bienvenido, {appUser?.name}!</h1>
        <p className="text-muted-foreground">Aquí tienes un resumen de tu actividad reciente en AFKDpu.</p>
      </div>
      <ActiveConnectionsSummary />
       <Card>
        <CardHeader>
            <CardTitle>Historial Reciente</CardTitle>
            <CardDescription>Los últimos eventos importantes en tus conexiones.</CardDescription>
        </CardHeader>
        <CardContent>
             <div className="text-center text-muted-foreground py-8">
                <HistoryIcon className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4">El historial de eventos aparecerá aquí.</p>
                <Button variant="secondary" className="mt-4" asChild>
                    <Link href="/dashboard/history">Ver todo el historial</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
