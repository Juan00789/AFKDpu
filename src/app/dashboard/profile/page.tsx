'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { type User } from "@/lib/mock-data"
import { Edit, Upload, Loader2, Save } from "lucide-react"
import { storage, db } from '@/lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
    const { appUser, setAppUser } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    
    const [formData, setFormData] = useState<User | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (appUser) {
            setUser(appUser);
            setFormData(appUser);
        }
    }, [appUser]);


    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        setIsUploading(true);
        try {
            const imageRef = storageRef(storage, `avatars/${user.id}/${file.name}`);
            await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(imageRef);
            if (formData) {
              setFormData({ ...formData, avatar: downloadURL });
            }
        } catch (error: any) {
            console.error("Error al subir la imagen:", error);
            let errorMessage = "Ocurrió un error al subir la imagen.";
            if (error.code) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        errorMessage = "Error de permisos. Revisa las reglas de Storage en tu consola de Firebase.";
                        break;
                    case 'auth/invalid-api-key':
                        errorMessage = "La clave de API no es válida. Por favor, verifícala en tu consola de Firebase.";
                        break;
                    default:
                        errorMessage = `Error de Firebase: ${error.code}`;
                }
            }
             toast({
                variant: "destructive",
                title: "Error de Carga",
                description: errorMessage,
            });
        } finally {
            setIsUploading(false);
        }
    };


    const handleSave = async () => {
        if (formData && user) {
            setIsSaving(true);
            try {
                const userRef = doc(db, 'users', user.id);
                await setDoc(userRef, formData);
                setAppUser(formData);
                setUser(formData);
                toast({
                    title: "¡Perfil Guardado!",
                    description: "Tus cambios han sido guardados exitosamente.",
                });
                setDialogOpen(false);
            } catch (error) {
                console.error("Error al guardar el perfil:", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "No se pudieron guardar los cambios en tu perfil.",
                });
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (open) {
            setFormData(user);
        }
        setDialogOpen(open);
    }

    if (!user || !formData) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                    <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{user.role}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 text-sm">
                    <div>
                        <Label className="text-muted-foreground font-semibold">Nivel de Actividad</Label>
                        <div className="flex items-center gap-4 mt-1">
                            <Progress value={85} className="w-full" />
                            <span className="font-bold text-lg">85%</span>
                        </div>
                    </div>
                        <div>
                        <Label className="text-muted-foreground font-semibold">Objetivos</Label>
                        <p className="text-foreground leading-normal mt-1">
                            {user.objectives || 'No se han definido objetivos.'}
                        </p>
                        </div>

                    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
                        <DialogTrigger asChild>
                            <Button className="w-full">
                                <Edit className="mr-2 h-4 w-4" />
                                Editar Perfil
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Editar Perfil</DialogTitle>
                            <DialogDescription>
                                Realiza cambios en tu perfil. Haz clic en guardar cuando hayas terminado.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-col items-center gap-4">
                                    <Avatar className="w-24 h-24">
                                        <AvatarImage src={formData.avatar} />
                                        <AvatarFallback className="text-3xl">{formData.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <Input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        ref={fileInputRef}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Subiendo...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Cambiar Avatar
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">Nombre</Label>
                                    <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData!, name: e.target.value})} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">Email</Label>
                                    <Input id="email" value={formData.email} className="col-span-3" disabled />
                                </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">Rol</Label>
                                    <Select value={formData.role} onValueChange={(value) => setFormData({...formData!, role: value as User['role']})}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Selecciona un rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Cliente">Cliente</SelectItem>
                                            <SelectItem value="Proveedor">Proveedor</SelectItem>
                                            <SelectItem value="Empleado">Empleado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="objectives" className="text-right pt-2">Objetivos</Label>
                                    <Textarea 
                                        id="objectives" 
                                        placeholder="Tus objetivos personales en la plataforma" 
                                        className="col-span-3" 
                                        rows={4}
                                        value={formData.objectives || ''}
                                        onChange={(e) => setFormData({...formData!, objectives: e.target.value})}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancelar</Button>
                                </DialogClose>
                                <Button type="submit" onClick={handleSave} disabled={isUploading || isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Guardar Cambios
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    )
}
