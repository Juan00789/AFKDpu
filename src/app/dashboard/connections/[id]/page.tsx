
'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Connection, Message, User } from "@/lib/mock-data";
import { Send, Loader2, AlertTriangle, Banknote, Star } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, updateDoc, writeBatch, increment } from 'firebase/firestore';
import { db, rtdb } from '@/lib/firebase';
import { ref as rtdbRef, onValue, off, push, serverTimestamp as rtdbServerTimestamp } from 'firebase/database';
import React from 'react';
import { formatRelative } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function LeaveReviewForm({ connection, reviewedUser, appUser }: { connection: Connection; reviewedUser: User; appUser: User }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast({ variant: "destructive", title: "Error", description: "Por favor, selecciona una calificación de estrellas." });
            return;
        }
        if (comment.trim().length < 10) {
            toast({ variant: "destructive", title: "Error", description: "El comentario debe tener al menos 10 caracteres." });
            return;
        }

        setIsSubmitting(true);
        const batch = writeBatch(db);

        try {
            // 1. Create review document
            const reviewRef = doc(collection(db, 'reviews'));
            batch.set(reviewRef, {
                reviewerId: appUser.id,
                reviewerName: appUser.name,
                reviewerAvatar: appUser.avatar,
                reviewedUserId: reviewedUser.id,
                connectionId: connection.id,
                rating,
                comment,
                createdAt: serverTimestamp(),
            });

            // 2. Update reviewed user's points
            const reviewedUserRef = doc(db, 'users', reviewedUser.id);
            batch.update(reviewedUserRef, { points: increment(rating) });

            // 3. Mark review as given in the connection
            const connectionRef = doc(db, 'connections', connection.id);
            batch.update(connectionRef, {
                [`reviewsGiven.${appUser.id}`]: true
            });
            
            await batch.commit();

            toast({ title: "¡Reseña Enviada!", description: `Has calificado a ${reviewedUser.name} con ${rating} estrellas.` });
        } catch (error) {
            console.error("Error submitting review:", error);
            toast({ variant: "destructive", title: "Error", description: "No se pudo enviar la reseña." });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <Card className="mt-6 bg-secondary/50">
            <CardHeader>
                <CardTitle>Dejar una Reseña para {reviewedUser.name}</CardTitle>
                <CardDescription>Tu opinión ayuda a construir una comunidad de confianza.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Calificación</Label>
                        <div className="flex items-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-8 w-8 cursor-pointer transition-colors ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground hover:text-yellow-300'}`}
                                    onClick={() => setRating(i + 1)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="comment">Comentario</Label>
                        <Textarea 
                            id="comment" 
                            placeholder={`Describe tu experiencia con ${reviewedUser.name}...`} 
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-2"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        Enviar Reseña
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}


export default function ConnectionDetailPage() {
  const params = useParams<{ id: string }>();
  const { appUser } = useAuth();
  const [connection, setConnection] = useState<Connection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [providerDetails, setProviderDetails] = useState<User | null>(null);

  const [connectionLoading, setConnectionLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (params.id && appUser) {
      const connectionRef = doc(db, 'connections', params.id);
      const unsubscribeConn = onSnapshot(connectionRef, async (docSnap) => {
        if (docSnap.exists()) {
          const connData = { id: docSnap.id, ...docSnap.data() } as Connection;
          setConnection(connData);

          const otherParticipant = connData.participants.find(p => p.id !== appUser.id);
          if (otherParticipant) {
              const userRef = doc(db, 'users', otherParticipant.id);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                  setOtherUser(userSnap.data() as User);
              }
          }

        } else {
          setError("No se encontró el portal.");
        }
        setConnectionLoading(false);
      }, (err) => {
        console.error(err);
        setError("Error al cargar el portal.");
        setConnectionLoading(false);
      });

      // Using Realtime Database for messages
      const messagesRef = rtdbRef(rtdb, `messages/${params.id}`);
      const unsubscribeMsgs = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messagesArray = Object.keys(data)
            .map(key => ({ id: key, ...data[key] }))
            .sort((a, b) => a.createdAt - b.createdAt);
          setMessages(messagesArray);
        } else {
          setMessages([]);
        }
        setMessagesLoading(false);
      }, (err) => {
        console.error("Error fetching messages from RTDB:", err);
        setError("Error al cargar los mensajes.");
        setMessagesLoading(false);
      });


      return () => {
        unsubscribeConn();
        off(messagesRef);
      };
    }
  }, [params.id, appUser]);
  
  useEffect(() => {
    if (!connection?.provider?.id) return;

    const fetchProviderDetails = async () => {
        try {
            const providerRef = doc(db, 'users', connection.provider.id);
            const providerSnap = await getDoc(providerRef);
            if (providerSnap.exists()) {
                setProviderDetails(providerSnap.data() as User);
            }
        } catch (err) {
            console.error("Error fetching provider details:", err);
        }
    };

    fetchProviderDetails();
  }, [connection]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !appUser || !params.id) return;

    try {
      const messagesRef = rtdbRef(rtdb, `messages/${params.id}`);
      await push(messagesRef, {
        text: newMessage,
        createdAt: rtdbServerTimestamp(),
        senderId: appUser.id,
        senderName: appUser.name,
        senderAvatar: appUser.avatar,
      });
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("No se pudo enviar el mensaje. Revisa los permisos de la base de datos.");
    }
  };

  const handleStatusChange = async (newStatus: "Activo" | "En espera" | "Cerrado") => {
    if (!connection || connection.status === newStatus) return;

    const connectionRef = doc(db, 'connections', params.id);

    try {
      await updateDoc(connectionRef, { status: newStatus });
      
      if (newStatus === "Cerrado") {
        toast({
          title: "¡Portal Cerrado!",
          description: "La conexión ha sido marcada como completada."
        });
      }

    } catch (err) {
      console.error("Error updating status:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el estado del portal."
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
    if (!isClient) return '';
    if (!timestamp) return 'Ahora';
    const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp.toDate();
    return formatRelative(date, new Date(), { locale: es });
  };
  
  const hasLeftReview = connection.reviewsGiven && connection.reviewsGiven[appUser.id];

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
                {connection.participants.map((p, index) => {
                    if (p.id === appUser.id) {
                         return (
                            <Avatar key={`${p.id}-${index}`} className="h-10 w-10 border-2 border-background">
                                <AvatarImage src={p.avatar} />
                                <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )
                    }
                    return (
                        <Link href={`/dashboard/users/${p.id}`} key={`${p.id}-${index}`} title={`Ver perfil de ${p.name}`}>
                            <Avatar className="h-10 w-10 border-2 border-background hover:ring-2 hover:ring-primary cursor-pointer transition-all">
                                <AvatarImage src={p.avatar} />
                                <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Link>
                    )
                })}
              </div>
          </CardHeader>
          <CardContent>
            {appUser?.role === 'Cliente' && providerDetails && (providerDetails.bankName || providerDetails.bankAccountNumber) && (
              <Alert className="mb-4">
                  <Banknote className="h-4 w-4" />
                  <AlertTitle>Información de Pago del Proveedor</AlertTitle>
                  <AlertDescription>
                      <p><strong>Banco:</strong> {providerDetails.bankName || 'No especificado'}</p>
                      <p><strong>No. de Cuenta:</strong> {providerDetails.bankAccountNumber || 'No especificado'}</p>
                  </AlertDescription>
              </Alert>
            )}
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
              {connection.status !== 'Cerrado' && (
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
              )}
            </div>
            {connection.status === 'Cerrado' && otherUser && (
                <div className="p-4 border-t">
                    {hasLeftReview ? (
                        <div className="text-center text-muted-foreground py-4">
                            <p className="font-medium">¡Gracias por tu opinión!</p>
                            <p className="text-sm">Ya has dejado una reseña para esta conexión.</p>
                        </div>
                    ) : (
                        <LeaveReviewForm 
                            connection={connection}
                            reviewedUser={otherUser}
                            appUser={appUser}
                        />
                    )}
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
