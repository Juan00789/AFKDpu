'use client';
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Connection, Message, User } from "@/lib/mock-data";
import { Send, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, updateDoc, writeBatch, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React from 'react';
import { formatRelative } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

export default function ConnectionDetailPage({ params }: { params: { id: string } }) {
  const { appUser } = useAuth();
  const [connection, setConnection] = useState<Connection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [connectionLoading, setConnectionLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.id) {
      const connectionRef = doc(db, 'connections', params.id);
      const unsubscribeConn = onSnapshot(connectionRef, (doc) => {
        if (doc.exists()) {
          setConnection({ id: doc.id, ...doc.data() } as Connection);
        } else {
          setError("No se encontró la conexión.");
        }
        setConnectionLoading(false);
      }, (err) => {
        console.error(err);
        setError("Error al cargar la conexión.");
        setConnectionLoading(false);
      });

      const messagesQuery = query(collection(db, 'connections', params.id, 'messages'), orderBy('createdAt', 'asc'));
      const unsubscribeMsgs = onSnapshot(messagesQuery, (querySnapshot) => {
        const messagesData: Message[] = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() } as Message);
        });
        setMessages(messagesData);
        setMessagesLoading(false);
      }, (err) => {
        console.error("Error fetching messages:", err);
        setError("Error al cargar los mensajes.");
        setMessagesLoading(false);
      });

      return () => {
        unsubscribeConn();
        unsubscribeMsgs();
      };
    }
  }, [params.id]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !appUser || !params.id) return;

    try {
      await addDoc(collection(db, 'connections', params.id, 'messages'), {
        text: newMessage,
        createdAt: serverTimestamp(),
        senderId: appUser.id,
        senderName: appUser.name,
        senderAvatar: appUser.avatar,
      });
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("No se pudo enviar el mensaje. Revisa los permisos.");
    }
  };

  const handleStatusChange = async (newStatus: "Activo" | "En espera" | "Cerrado") => {
    if (!connection || connection.status === newStatus) return;

    const connectionRef = doc(db, 'connections', params.id);

    try {
      await updateDoc(connectionRef, { status: newStatus });
      
      if (newStatus === "Cerrado") {
        toast({
          title: "¡Conexión Cerrada!",
          description: "La conexión ha sido marcada como completada."
        });
      }

    } catch (err) {
      console.error("Error updating status:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el estado de la conexión."
      });
    }
  };


  const isLoading = connectionLoading;

  if (isLoading) {
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

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Ahora';
    const date = timestamp.toDate();
    return formatRelative(date, new Date(), { locale: es });
  };


  return (
    <div className="grid md:grid-cols-1 gap-6">
      <div>
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">{connection.purpose}</CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <Select value={connection.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cambiar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="En espera">En espera</SelectItem>
                    <SelectItem value="Cerrado">Cerrado</SelectItem>
                  </SelectContent>
                </Select>
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
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messagesLoading ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : messages.length === 0 ? (
                     <div className="text-center text-muted-foreground py-16">
                      <p>No hay mensajes todavía.</p>
                      <p className="text-sm">¡Sé el primero en iniciar la conversación!</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === appUser.id ? 'justify-end' : ''}`}>
                         {msg.senderId !== appUser.id && (
                           <Avatar className="h-8 w-8">
                             <AvatarImage src={msg.senderAvatar} />
                             <AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback>
                           </Avatar>
                         )}
                        <div className={`rounded-lg p-3 max-w-[75%] ${msg.senderId === appUser.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-xs mt-1 text-right ${msg.senderId === appUser.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                            {formatTimestamp(msg.createdAt)}
                          </p>
                        </div>
                         {msg.senderId === appUser.id && (
                           <Avatar className="h-8 w-8">
                             <AvatarImage src={msg.senderAvatar} />
                             <AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback>
                           </Avatar>
                         )}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
              <form className="p-4 border-t" onSubmit={handleSendMessage}>
                <div className="relative">
                  <Input 
                    placeholder="Escribe un mensaje..." 
                    className="pr-12"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
