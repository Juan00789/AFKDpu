
'use client';

import { useState } from 'react';
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
import { PlusCircle } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const addConnectionSchema = z.object({
  purpose: z.string().min(3, { message: 'El propósito debe tener al menos 3 caracteres.' }),
  duration: z.string().min(1, { message: "Debes especificar una duración." }),
  rules: z.string().min(5, { message: "Debes definir al menos una regla." }),
});

type AddConnectionForm = z.infer<typeof addConnectionSchema>;

export function AddConnectionDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { appUser } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddConnectionForm>({
    resolver: zodResolver(addConnectionSchema),
    defaultValues: {
      purpose: '',
      duration: '',
      rules: '',
    },
  });

  const onSubmit = async (data: AddConnectionForm) => {
    if (!appUser) {
        toast({
            variant: 'destructive',
            title: 'Error de autenticación',
            description: 'Debes iniciar sesión para crear una conexión.',
        });
        return;
    }
    
    const participants = [appUser];
    const userIds = participants.map(p => p.id);

    try {
        await addDoc(collection(db, 'connections'), {
            ...data,
            status: 'Activo',
            participants: participants.map(({objectives, ...rest}) => rest), // Firestore doesn't like undefined fields
            userIds,
            createdAt: serverTimestamp(),
        });

        toast({
            title: '¡Conexión Creada!',
            description: `La conexión "${data.purpose}" ha sido creada.`,
        });
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
          Crear Conexión
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Crear Nueva Conexión</DialogTitle>
            <DialogDescription>
              Define el propósito y las reglas para este nuevo vínculo de comunicación.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="purpose">Propósito de la Conexión</Label>
              <Controller
                name="purpose"
                control={control}
                render={({ field }) => <Input id="purpose" placeholder="Ej: Revisión de contrato" {...field} />}
              />
              {errors.purpose && <p className="text-sm font-medium text-destructive">{errors.purpose.message}</p>}
            </div>
            
             <div className="grid gap-2">
              <Label htmlFor="duration">Duración Estimada</Label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => <Input id="duration" placeholder="Ej: 7 días" {...field} />}
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
                <Button type="button" variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar Conexión</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
