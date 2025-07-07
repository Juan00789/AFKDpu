'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, writeBatch, increment } from 'firebase/firestore';
import { User } from '@/lib/mock-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


const addConnectionSchema = z.object({
  purpose: z.string().min(3, { message: 'El propósito debe tener al menos 3 caracteres.' }),
  providerId: z.string().min(1, { message: "Debes seleccionar un proveedor." }),
  duration: z.string().min(1, { message: "Debes especificar una duración." }),
  rules: z.string().min(5, { message: "Debes definir al menos una regla." }),
});

type AddConnectionForm = z.infer<typeof addConnectionSchema>;

export function AddConnectionDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [providers, setProviders] = useState<User[]>([]);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const { toast } = useToast();
  const { appUser, setAppUser } = useAuth();
  
  const form = useForm<AddConnectionForm>({
    resolver: zodResolver(addConnectionSchema),
    defaultValues: {
      purpose: '',
      providerId: '',
      duration: '',
      rules: '',
    },
  });

  useEffect(() => {
    if (isOpen && appUser) {
      const fetchProviders = async () => {
        setLoadingProviders(true);
        try {
          const q = query(collection(db, 'users'), where('role', '==', 'Proveedor'));
          const querySnapshot = await getDocs(q);
          const providersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
          // A user cannot create a connection with themselves, so filter them out.
          setProviders(providersData.filter(provider => provider.id !== appUser.id));
        } catch (error) {
          console.error('Error fetching providers:', error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'No se pudieron cargar los proveedores.',
          });
        } finally {
          setLoadingProviders(false);
        }
      };
      fetchProviders();
    }
  }, [isOpen, appUser, toast]);

  const onSubmit = async (data: AddConnectionForm) => {
    if (!appUser) {
        toast({
            variant: 'destructive',
            title: 'Error de autenticación',
            description: 'Debes iniciar sesión para crear una conexión.',
        });
        return;
    }
    
    const selectedProvider = providers.find(p => p.id === data.providerId);
    if (!selectedProvider) {
        toast({ variant: 'destructive', title: 'Error', description: 'Proveedor no válido.' });
        return;
    }

    const participants = [appUser, selectedProvider];
    const userIds = participants.map(p => p.id);
    const batch = writeBatch(db);

    try {
        const connectionsQuery = query(collection(db, "connections"), where("creatorId", "==", appUser.id));
        const userConnections = await getDocs(connectionsQuery);
        const isFirstService = userConnections.empty;

        const connectionRef = doc(collection(db, 'connections'));
        batch.set(connectionRef, {
            ...data,
            provider: {
                id: selectedProvider.id,
                name: selectedProvider.name,
                avatar: selectedProvider.avatar,
            },
            creatorId: appUser.id,
            status: 'Activo',
            participants: participants.map(({ objectives, points, profileCompleted, ...rest }) => rest),
            userIds,
            createdAt: serverTimestamp(),
        });
        
        if (isFirstService) {
            const userRef = doc(db, 'users', appUser.id);
            batch.update(userRef, { points: increment(10) });
        }

        await batch.commit();

        if (isFirstService) {
            setAppUser(prev => prev ? ({ ...prev, points: prev.points + 10 }) : null);
            toast({
                title: '¡Portal Abierto y Puntos Ganados!',
                description: `Has ganado 10 puntos por tu primer viaje.`,
            });
        } else {
             toast({
                title: '¡Portal Abierto!',
                description: `El portal "${data.purpose}" ha sido abierto.`,
            });
        }

        setIsOpen(false);
        form.reset();
    } catch (error) {
        console.error('Error al crear la conexión: ', error);
        toast({
            variant: 'destructive',
            title: 'Error en la base de datos',
            description: 'No se pudo crear la conexión. Revisa las reglas de Firestore.',
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
            form.reset();
        }
    }}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Abrir Portal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Abrir un Nuevo Portal</DialogTitle>
          <DialogDescription>
            Define el propósito de esta nueva conexión para abrir un portal con otro ser.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Propósito del Portal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Exploración de colaboración creativa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="providerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seleccionar Viajero</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loadingProviders}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={loadingProviders ? "Cargando viajeros..." : "Elige un viajero"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {providers.map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duración Estimada del Viaje</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 3 días" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intención o Contexto del Viaje</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ej: Se requiere presencia y respuesta en 24h." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                  <Button type="button" variant="secondary" disabled={form.formState.isSubmitting}>Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting || loadingProviders}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Abrir Portal
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
