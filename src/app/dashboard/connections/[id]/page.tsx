'use client';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SmartPromptSuggestions } from "@/components/SmartPromptSuggestions";
import { Connection } from "@/lib/mock-data";
import { cva } from "class-variance-authority";
import { Send, HeartPulse, Minus, TrendingDown, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React from 'react';
import { useToast } from '@/hooks/use-toast';

const statusBadgeVariants = cva(
  "border-transparent text-xs capitalize",
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

export default function ConnectionDetailPage({ params }: { params: { id: string } }) {
  const { appUser } = useAuth();
  const [connection, setConnection] = useState<Connection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingState, setUpdatingState] = useState<Connection['emotionalState'] | null>(null);
  const { toast } = useToast();

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

  const handleStateUpdate = async (newState: Connection['emotionalState']) => {
    if (!connection) return;
    setUpdatingState(newState);
    try {
        const connectionRef = doc(db, 'connections', connection.id);
        await updateDoc(connectionRef, {
            emotionalState: newState
        });
        setConnection(prev => prev ? { ...prev, emotionalState: newState } : null);
        toast({
            title: "Estado Actualizado",
            description: `La conexión ahora es "${newState}".`,
        });
    } catch (err) {
        console.error("Error updating connection state:", err);
        setError("Error al actualizar la conexión. Revisa los permisos de Firestore.");
        toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudo actualizar el estado de la conexión.",
        });
    } finally {
        setUpdatingState(null);
    }
  };

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

  const connectionInfo = {
      connectionName: connection.purpose,
      connectionState: connection.emotionalState,
      lastInteraction: "La última interacción fue una llamada para revisar el progreso del proyecto hace 2 días.",
      rules: connection.rules,
      userName: appUser.name,
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">{connection.purpose}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={statusBadgeVariants({ status: connection.emotionalState })}>
                      {connection.emotionalState}
                  </Badge>
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
            <div className="h-[500px] flex flex-col">
                 <p className="text-center text-xs text-muted-foreground py-2">Las conversaciones se eliminan cuando la conexión cambia de estado.</p>
                <Separator />
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={otherParticipant.avatar} />
                      <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 max-w-[75%]">
                      <p className="text-sm">¡Hola! Solo para confirmar que recibí los documentos. ¡Gracias!</p>
                      <p className="text-xs text-muted-foreground text-right mt-1">Hace 5 minutos</p>
                    </div>
                  </div>
                   <div className="flex items-end gap-2 justify-end">
                     <div className="rounded-lg bg-primary text-primary-foreground p-3 max-w-[75%]">
                      <p className="text-sm">Perfecto, gracias por confirmar. ¡Seguimos en contacto!</p>
                       <p className="text-xs text-primary-foreground/80 text-right mt-1">Hace 2 minutos</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={appUser.avatar} />
                      <AvatarFallback>{appUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
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

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Estado Emocional</CardTitle>
            <CardDescription>Actualiza el estado para reflejar el sentimiento actual de la conexión.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant={connection.emotionalState === 'Vibrante' ? 'default' : 'secondary'} size="sm" className="gap-1.5" onClick={() => handleStateUpdate('Vibrante')} disabled={!!updatingState}>
              {updatingState === 'Vibrante' ? <Loader2 className="h-4 w-4 animate-spin" /> : <HeartPulse className="h-4 w-4" />} Vibrante
            </Button>
            <Button variant={connection.emotionalState === 'Neutral' ? 'default' : 'secondary'} size="sm" className="gap-1.5" onClick={() => handleStateUpdate('Neutral')} disabled={!!updatingState}>
              {updatingState === 'Neutral' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />} Neutral
            </Button>
             <Button variant={connection.emotionalState === 'Fading' ? 'destructive' : 'secondary'} size="sm" className="gap-1.5" onClick={() => handleStateUpdate('Fading')} disabled={!!updatingState}>
              {updatingState === 'Fading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingDown className="h-4 w-4" />} Fading
            </Button>
          </CardContent>
        </Card>

        <SmartPromptSuggestions connectionInfo={connectionInfo} />
      </div>
    </div>
  )
}
