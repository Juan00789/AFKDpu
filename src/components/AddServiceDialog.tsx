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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Loader2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, writeBatch, increment } from 'firebase/firestore';
import { User } from '@/lib/mock-data';


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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddConnectionForm>({
    resolver: zodResolver(addConnectionSchema),
    defaultValues: {
      purpose: '',
      providerId: '',
      duration: '',
      rules: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      const fetchProviders = async () => {
        setLoadingProviders(true);
        try {
          const q = query(collection(db, 'users'), where('role', '==', 'Proveedor'));
          const querySnapshot = await getDocs(q);
          const providersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
          setProviders(providersData);
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
  }, [isOpen, toast]);

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
        // 1. Check if it's the user's first service
        const connectionsQuery = query(collection(db, "connections"), where("creatorId", "==", appUser.id));
        const userConnections = await getDocs(connectionsQuery);
        const isFirstService = userConnections.empty;

        // 2. Add connection document
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
        
        // 3. Award points for first service
        if (isFirstService) {
            const userRef = doc(db, 'users', appUser.id);
            batch.update(userRef, { points: increment(10) });
        }

        await batch.commit();

        if (isFirstService) {
            setAppUser(prev => prev ? ({ ...prev, points: prev.points + 10 }) : null);
            toast({
                title: '¡Conexión Creada y Puntos Ganados!',
                description: `Has ganado 10 puntos por tu primer servicio.`,
            });
        } else {
             toast({
                title: '¡Conexión Creada!',
                description: `La conexión "${data.purpose}" ha sido creada.`,
            });
        }

        setIsOpen(false);
        reset();
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
            reset();
        }
    }}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Servicio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Servicio</DialogTitle>
            <DialogDescription>
              Define el propósito y selecciona un proveedor para iniciar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="purpose">Propósito del Servicio</Label>
              <Controller
                name="purpose"
                control={control}
                render={({ field }) => <Input id="purpose" placeholder="Ej: Consulta técnica de producto" {...field} />}
              />
              {errors.purpose && <p className="text-sm font-medium text-destructive">{errors.purpose.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="providerId">Seleccionar Proveedor</Label>
              <Controller
                name="providerId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} disabled={loadingProviders}>
                    <SelectTrigger id="providerId">
                      <SelectValue placeholder={loadingProviders ? "Cargando proveedores..." : "Elige un proveedor"} />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.providerId && <p className="text-sm font-medium text-destructive">{errors.providerId.message}</p>}
            </div>
            
             <div className="grid gap-2">
              <Label htmlFor="duration">Duración Estimada</Label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => <Input id="duration" placeholder="Ej: 3 días" {...field} />}
              />
              {errors.duration && <p className="text-sm font-medium text-destructive">{errors.duration.message}</p>}
            </div>
             <div className="grid gap-2">
                <Label htmlFor="rules">Contexto o Reglas</Label>
                <Controller
                    name="rules"
                    control={control}
                    render={({ field }) => <Textarea id="rules" placeholder="Ej: Se requiere respuesta en 24h hábiles." {...field} />}
                />
                {errors.rules && <p className="text-sm font-medium text-destructive">{errors.rules.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isSubmitting}>Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting || loadingProviders}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Conexión
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
