
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
import { mockConnections, type Connection } from '@/lib/mock-data';

const addServiceSchema = z.object({
  title: z.string().min(3, { message: 'El título debe tener al menos 3 caracteres.' }),
  connectionId: z.string({ required_error: 'Debes seleccionar una conexión.' }),
});

type AddServiceForm = z.infer<typeof addServiceSchema>;

export function AddServiceDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddServiceForm>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (data: AddServiceForm) => {
    console.log('Nuevo servicio:', data);
    // Here you would typically add the service to your data source.
    // For this mock app, we'll just show a success toast.
    toast({
      title: '¡Servicio agregado!',
      description: `El servicio "${data.title}" ha sido creado.`,
    });
    setIsOpen(false);
    reset();
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
            <DialogTitle>Agregar Nuevo Servicio</DialogTitle>
            <DialogDescription>
              Completa los detalles para crear un nuevo servicio asociado a una conexión.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título del Servicio</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => <Input id="title" placeholder="Ej: Revisión de diseño inicial" {...field} />}
              />
              {errors.title && <p className="text-sm font-medium text-destructive">{errors.title.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="connectionId">Asociar a Conexión</Label>
               <Controller
                name="connectionId"
                control={control}
                render={({ field }) => (
                   <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="connectionId">
                      <SelectValue placeholder="Selecciona una conexión..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockConnections.map((connection: Connection) => (
                        <SelectItem key={connection.id} value={connection.id}>
                          {connection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
               {errors.connectionId && <p className="text-sm font-medium text-destructive">{errors.connectionId.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar Servicio</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
