'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Clock, Instagram, Star, Loader2, Edit } from "lucide-react";
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { DialogClose } from '@radix-ui/react-dialog';

const businessId = 'miguel-iphone-center';

const ProductCard = ({ name, price, category, imageUrl, imageHint }: { name: string; price: string; category: string; imageUrl: string; imageHint: string }) => (
  <Card>
    <CardHeader>
      <div className="aspect-square relative w-full mb-4">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="rounded-t-lg object-cover"
          data-ai-hint={imageHint}
        />
      </div>
      <CardTitle className="text-xl font-headline">{name}</CardTitle>
      <CardDescription>{category}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-lg font-semibold">{price}</p>
      <Button className="w-full mt-4">Ver Producto</Button>
    </CardContent>
  </Card>
);

function ClaimBusinessButton() {
    const { appUser, setAppUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleClaim = async () => {
        if (!appUser) return;
        setIsLoading(true);
        try {
            const userRef = doc(db, 'users', appUser.id);
            await updateDoc(userRef, {
                claimedBusinessId: businessId
            });
            // Update user state in context
            setAppUser(prevUser => prevUser ? { ...prevUser, claimedBusinessId: businessId } : null);
            toast({
                title: "¡Negocio Reclamado!",
                description: "Ahora puedes gestionar esta página.",
            });
        } catch (error) {
            console.error("Error claiming business:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo reclamar el negocio. Inténtalo de nuevo."
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!appUser || appUser.role !== 'Proveedor') {
        return null; // Don't show the button if not a logged-in provider
    }

    if (appUser.claimedBusinessId === businessId) {
        return (
            <Button className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Gestionar Publicidad
            </Button>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">¿Eres el propietario?</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reclamar "Miguel iPhone Center"</DialogTitle>
                    <DialogDescription>
                        Al confirmar, tu perfil de proveedor se asociará con este negocio. Podrás gestionar esta página de publicidad. ¿Estás seguro?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleClaim} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirmar y Reclamar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function PublicidadSanaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Logo href="/" />
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Registrarse</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-center">
              Publicidad Sana: Un Caso de Estudio
            </h1>
            <p className="mt-4 text-center text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Analizamos cómo "Miguel iPhone Center" aplica los principios de una comunicación honesta y transparente, construyendo confianza con sus clientes.
            </p>
            
            <Separator className="my-12" />

            <div className="grid md:grid-cols-[2fr_1fr] gap-8">
              <div className="space-y-8">
                {/* Products Section */}
                <section>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl font-headline mb-6">
                    Productos Ofrecidos con Claridad
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <ProductCard
                      name="iPhone XR Factory Unlocked"
                      price="RD$13,500.00"
                      category="Telefonos Moviles"
                      imageUrl="https://placehold.co/400x400.png"
                      imageHint="iphone xr"
                    />
                    <ProductCard
                      name="iPhone XS Max 512GB"
                      price="RD$18,500.00"
                      category="Telefonos Moviles"
                      imageUrl="https://placehold.co/400x400.png"
                      imageHint="iphone xs"
                    />
                     <ProductCard
                      name="iPhone XS MAX Factory Unlocked"
                      price="RD$16,000.00 - 18,000.00"
                      category="Telefonos Moviles"
                      imageUrl="https://placehold.co/400x400.png"
                      imageHint="iphone xs"
                    />
                     <ProductCard
                      name="ipad y iPhone"
                      price="RD$4,000.00 - 10,000.00"
                      category="Dispositivos Apple"
                      imageUrl="https://placehold.co/400x400.png"
                      imageHint="ipad iphone"
                    />
                  </div>
                </section>
                
                {/* Opinions Section */}
                <section>
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl font-headline mb-6">
                        La Voz del Cliente
                    </h2>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div>
                                    <CardTitle>Opinión Destacada</CardTitle>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <span className="ml-2 text-sm text-muted-foreground">5.0 (17 opiniones en Google)</span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <blockquote className="border-l-2 pl-6 italic text-muted-foreground">
                            "Miguel iPhone Center es la única tienda dedicada 100% a la marca Apple. Somos lo más parecido a una App Store en cuanto a nuestro servicio (no estética). En todo Puerto Plata es el único lugar donde encontrarás todos los accesorios originales Apple...."
                            </blockquote>
                        </CardContent>
                    </Card>
                </section>
              </div>

              {/* Business Info Sidebar */}
              <aside className="space-y-6 sticky top-24 h-min">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">Miguel iPhone Center</CardTitle>
                    <CardDescription>Tienda especializada en Apple</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-1 shrink-0" />
                      <span>Sosua: La Union, Edificio 79, 1er piso Calle Del Cable, Puerto Plata 57000</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 mt-1 shrink-0" />
                      <span>(829) 399-0735</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-1 shrink-0" />
                      <span>Cerrado ⋅ Abre a las 9 a. m.</span>
                    </div>
                    <Separator />
                     <div className="flex items-start gap-3">
                        <Instagram className="h-4 w-4 mt-1 shrink-0"/>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Ver perfil en Instagram
                        </a>
                     </div>
                  </CardContent>
                </Card>
                <ClaimBusinessButton />
              </aside>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 AFKDpu. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
           <Link href="/publicidad-sana" className="text-xs hover:underline underline-offset-4">
            Publicidad Sana
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Términos y Condiciones
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Política de Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}
