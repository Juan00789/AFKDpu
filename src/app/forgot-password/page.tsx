'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { sendPasswordReset } = useAuth();
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, ingresa tu correo electrónico.",
      });
      return;
    }
    setLoading(true);
    try {
      await sendPasswordReset(email);
      toast({
        title: "Correo Enviado",
        description: "Si tu cuenta existe, recibirás un enlace para restablecer tu contraseña.",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar el correo. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/50">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
           <Link href="/" className="flex items-center gap-2 justify-center mb-4">
             <Share2 className="h-6 w-6 text-primary" />
             <span className="text-2xl font-bold font-headline text-primary">AFKDpu</span>
           </Link>
          <CardTitle className="text-2xl font-headline">¿Olvidaste tu Contraseña?</CardTitle>
          <CardDescription>Ingresa tu correo y te enviaremos un enlace para restablecerla.</CardDescription>
        </CardHeader>
        <form onSubmit={handleResetPassword}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="nombre@ejemplo.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Enviar enlace"}
            </Button>
             <p className="text-xs text-center text-muted-foreground">
              ¿Recordaste tu contraseña?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Iniciar sesión
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
