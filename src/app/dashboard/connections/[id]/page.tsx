'use client';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Connection } from "@/lib/mock-data";
import { Send, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React from 'react';

export default function ConnectionDetailPage({ params }: { params: { id: string } }) {
  const { appUser } = useAuth();
  const [connection, setConnection] = useState<Connection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!params.id) return;

    const fetchConnection = async () => {
      setLoading(true);
      setError(null);
      try {
        const connectionRef = doc(db, 'connections', params.id);
        const connectionSnap = await getDoc(connectionRef);

        if (connectionSnap.exists()) {
          setConnection({ id: connectionSnap.id, ...connectionSnap.data() } as Connection);
        } else {
          setError("No se encontró la conexión.");
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar la conexión.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnection();
  }, [params.id]);

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen items-center justify-center text-destructive">
          <AlertTriangle className="h-12 w-12 mb-4" />
          <h2 className="text-xl font-semibold">Error</h2>
          <p>{error}</p>
      </div>
    );
  }
  
  if (!appUser || !connection) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  const otherParticipant = connection.participants.find(p => p.id !== appUser.id) || connection.participants[0];

  return (
    <div className="grid md:grid-cols-1 gap-6">
      <div>
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">{connection.purpose}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{connection.status}</Badge>
                  <span className="text-sm text-muted-foreground">{connection.duration}</span>
              </div>
            </div>
             <div className="flex items-center -space-x-2">
                {connection.participants.map(p => (
                  <Avatar key={p.id} className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={p.avatar} />
                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
          </CardHeader>
          <CardContent>
            <div className="h-[60vh] flex flex-col">
                 <p className="text-center text-xs text-muted-foreground py-2">Los mensajes se guardan hasta que el destinatario los vea.</p>
                <Separator />
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={otherParticipant.avatar} />
                      <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 max-w-[75%]">
                      <p className="text-sm">Hola, te escribo para confirmar que hemos recibido el pago. Quedamos a la espera de la documentación pendiente.</p>
                      <p className="text-xs text-muted-foreground text-right mt-1">Ayer a las 4:30 PM</p>
                    </div>
                  </div>
                   <div className="flex items-end gap-2 justify-end">
                     <div className="rounded-lg bg-primary text-primary-foreground p-3 max-w-[75%]">
                      <p className="text-sm">Perfecto, gracias por confirmar. Enviaré los documentos mañana por la mañana.</p>
                       <p className="text-xs text-primary-foreground/80 text-right mt-1">Hace 2 minutos</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={appUser.avatar} />
                      <AvatarFallback>{appUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                   <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={otherParticipant.avatar} />
                      <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 max-w-[75%]">
                      <p className="text-sm">Entendido, estaré atento.</p>
                      <p className="text-xs text-muted-foreground text-right mt-1">Ahora</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="relative">
                  <Input placeholder="Escribe un mensaje..." className="pr-12" />
                  <Button variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
