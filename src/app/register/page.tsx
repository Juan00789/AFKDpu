
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Loader2, ArrowRight, User, Briefcase, UserCog } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { type User as AppUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Logo } from '@/components/Logo';

const roleData: { role: AppUser['role'], icon: React.ElementType, description: string }[] = [
  {
    role: "Cliente",
    icon: User,
    description: "Interactúa con la empresa, recibe actualizaciones y gestiona tareas."
  },
  {
    role: "Proveedor",
    icon: Briefcase,
    description: "Colabora en proyectos, responde a solicitudes y coordina entregas."
  },
  {
    role: "Empleado",
    icon: UserCog,
    description: "Gestiona la comunicación con clientes y proveedores, y colabora en equipos internos."
  }
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AppUser['role'] | null>(null);
  const [language, setLanguage] = useState('es');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { registerUser } = useAuth();
  const { toast } = useToast();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Las contraseñas no coinciden.",
      });
      return;
    }
    if (!username || !email || !password) {
        toast({
            variant: "destructive",
            title: "Campos Incompletos",
            description: "Por favor, completa todos los campos requeridos.",
        });
        return;
    }
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
        toast({
            variant: "destructive",
            title: "Selecciona un Rol",
            description: "Debes elegir un rol para continuar.",
        });
        return;
    }
    if (!termsAccepted) {
      toast({
        variant: "destructive",
        title: "Términos y Condiciones",
        description: "Debes aceptar los términos y condiciones.",
      });
      return;
    }
    setLoading(true);
    try {
      await registerUser(email, password, username, role, phone);
      router.push('/dashboard');
    } catch (error: any) {
      let errorMessage = "Ocurrió un error durante el registro.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Este correo electrónico ya está en uso.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
      }
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/50 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logo href="/" />
          </div>
           {step === 1 && (
            <>
                <CardTitle className="text-2xl font-headline">Iniciar el Viaje (Paso 1 de 2)</CardTitle>
                <CardDescription>Crea tu identidad para entrar al portal.</CardDescription>
            </>
           )}
           {step === 2 && (
            <>
                <CardTitle className="text-2xl font-headline">El Ritual de Entrada (Paso 2 de 2)</CardTitle>
                <CardDescription>Elige tu rol. Esta es la identidad que encarnarás en este ecosistema.</CardDescription>
            </>
           )}
        </CardHeader>
        
        {step === 1 && (
            <form onSubmit={handleNextStep}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Nombre de usuario</Label>
                        <Input id="username" placeholder="Tu nombre" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" placeholder="nombre@ejemplo.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                            <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Teléfono (Opcional)</Label>
                        <Input id="phone" type="tel" placeholder="Ej: 809-123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger id="language">
                                <SelectValue placeholder="Elige un idioma..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full">
                        Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </form>
        )}

        {step === 2 && (
            <form onSubmit={handleRegister}>
                <CardContent className="grid gap-4">
                    <div className="space-y-4">
                      {roleData.map((item) => (
                        <div
                          key={item.role}
                          className={cn(
                            "flex items-center space-x-4 rounded-md border p-4 cursor-pointer transition-all",
                            role === item.role ? "border-primary ring-2 ring-primary" : "border-border"
                          )}
                          onClick={() => setRole(item.role)}
                        >
                          <item.icon className={cn("h-8 w-8", role === item.role ? "text-primary" : "text-muted-foreground")} />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{item.role}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 pt-4">
                        <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(Boolean(checked))} />
                        <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                        Acepto los <Link href="#" className="underline">términos de servicio</Link> y la <Link href="#" className="underline">política de privacidad</Link>.
                        </label>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : "Completar Registro"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                        href="/login"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Cruzar el Umbral
                    </Link>
                    </p>
                </CardFooter>
            </form>
        )}
      </Card>
    </div>
  );
}
