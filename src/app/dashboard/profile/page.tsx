
'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { type User } from "@/lib/mock-data"
import { Edit, Upload, Loader2, Save, Megaphone, UserPlus, AlertTriangle } from "lucide-react"
import { storage, db } from '@/lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, increment, collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CurrencyIcon } from '@/components/CurrencyIcon';
import Link from 'next/link';

function ReputationCard({ user }: { user: User }) {
    const getReputationLevel = (points: number) => {
        if (points < 20) return { level: "Novato", color: "bg-gray-400" };
        if (points < 50) return { level: "Confiable", color: "bg-blue-500" };
        if (points < 100) return { level: "Responsable", color: "bg-green-500" };
        return { level: "Experto", color: "bg-purple-600" };
    };

    const { level, color } = getReputationLevel(user.points);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reputación</CardTitle>
                <CardDescription>Tu nivel de confianza en la plataforma basado en tus acciones.</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <div className="text-5xl font-bold text-primary flex items-center justify-center gap-2">
                    <CurrencyIcon className="h-10 w-10" />
                    <span>{user.points}</span>
                </div>
                <Badge className={`${color} text-white text-lg`}>{level}</Badge>
            </CardContent>
        </Card>
    )
}

const AssignBusinessDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const businessId = 'miguel-iphone-center';

    const handleAssign = async () => {
        if (!email) {
            toast({ variant: "destructive", title: "Error", description: "Por favor, introduce un correo." });
            return;
        }
        setIsLoading(true);
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where("email", "==", email), where("role", "==", "Proveedor"));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                toast({
                    variant: "destructive",
                    title: "No encontrado",
                    description: "No se encontró un proveedor con ese correo electrónico.",
                });
                setIsLoading(false);
                return;
            }

            const batch = writeBatch(db);
            const providerDoc = querySnapshot.docs[0];
            batch.update(doc(db, 'users', providerDoc.id), {
                claimedBusinessId: businessId
            });
            await batch.commit();

            toast({
                title: "¡Asignación Exitosa!",
                description: `El negocio se ha asignado a ${email}.`,
            });
            setIsOpen(false);
            setEmail('');

        } catch (error) {
            console.error("Error asignando negocio:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo asignar el negocio. Revisa los permisos.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Asignar Publicidad
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Asignar Gestión de Publicidad</DialogTitle>
                    <DialogDescription>
                        Introduce el correo del proveedor para darle acceso a la gestión de la página "Miguel iPhone Center".
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                    <Label htmlFor="provider-email">Correo del Proveedor</Label>
                    <Input 
                        id="provider-email" 
                        type="email" 
                        placeholder="proveedor@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleAssign} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirmar Asignación"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


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
        if (!formData || !user) return;

        setIsSaving(true);
        try {
            const userRef = doc(db, 'users', user.id);
            const updatePayload: { [key: string]: any } = {};

            if (formData.name !== user.name) updatePayload.name = formData.name;
            if (formData.role !== user.role) updatePayload.role = formData.role;
            if (formData.avatar !== user.avatar) updatePayload.avatar = formData.avatar;
            if ((formData.objectives || '') !== (user.objectives || '')) {
                updatePayload.objectives = formData.objectives || '';
            }
            
            let pointsAwarded = 0;

            const profileIsNowComplete = !user.profileCompleted &&
                                         formData.avatar && !formData.avatar.includes('placehold.co') &&
                                         formData.objectives && formData.objectives.trim().length > 10;

            if (profileIsNowComplete) {
                updatePayload.profileCompleted = true;
                updatePayload.points = increment(7);
                pointsAwarded = 7;
            }

            if (Object.keys(updatePayload).length > 0) {
                await updateDoc(userRef, updatePayload);
            } else {
                 toast({
                    title: "Sin cambios",
                    description: "No se detectaron cambios para guardar.",
                });
                setIsSaving(false);
                setDialogOpen(false);
                return;
            }
            
            const updatedUserInState: User = {
                ...formData,
                points: user.points + pointsAwarded,
                profileCompleted: profileIsNowComplete || user.profileCompleted
            };
            setAppUser(updatedUserInState);
            setUser(updatedUserInState);

            if (pointsAwarded > 0) {
                toast({
                    title: "¡Perfil Guardado y Puntos Ganados!",
                    description: `Has ganado ${pointsAwarded} puntos por completar tu perfil.`,
                });
            } else {
                toast({
                    title: "¡Perfil Guardado!",
                    description: "Tus cambios han sido guardados exitosamente.",
                });
            }

            setDialogOpen(false);

        } catch (error) {
            console.error("Error al guardar el perfil:", error);
            toast({
                variant: "destructive",
                title: "Error al guardar",
                description: "No se pudieron guardar los cambios. Revisa los permisos de la base de datos.",
            });
        } finally {
            setIsSaving(false);
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
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
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
                 {user.email === 'alcantara00789@gmail.com' ? (
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Megaphone className="h-6 w-6" />
                                Gestión de Publicidad (Admin)
                            </CardTitle>
                            <CardDescription>
                                Asigna la gestión de páginas de publicidad a los proveedores.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <AssignBusinessDialog />
                           <Button asChild variant="outline" className="w-full">
                                <Link href="/publicidad-sana">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar "Miguel iPhone Center"
                                </Link>
                           </Button>
                        </CardContent>
                    </Card>
                ) : user.role === 'Proveedor' && user.claimedBusinessId && (
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Megaphone className="h-6 w-6" />
                                Gestión de Publicidad
                            </CardTitle>
                            <CardDescription>
                                Desde aquí puedes editar el contenido de la página que se te ha asignado.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Button asChild className="w-full">
                                <Link href="/publicidad-sana">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar "Miguel iPhone Center"
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
            <div>
                <ReputationCard user={user} />
            </div>
        </div>
    )
}
