
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Clock, Instagram, Star, Loader2, Edit, AlertTriangle, Save, PlusCircle, Trash2, Upload } from "lucide-react";
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';


const businessId = 'miguel-iphone-center';

interface Product {
  name: string;
  price: string;
  category: string;
  imageUrl: string;
  imageHint: string;
}

interface BusinessData {
  name: string;
  tagline: string;
  pageTitle: string;
  pageDescription: string;
  address: string;
  phone: string;
  hours: string;
  instagramUrl: string;
  reviewQuote: string;
  reviewSource: string;
  products: Product[];
}

interface ProductCardProps extends Product {
    businessPhone: string;
}

const ProductCard = ({ name, price, category, imageUrl, imageHint, businessPhone }: ProductCardProps) => {
    const handleWhatsAppClick = () => {
        // Sanitize phone number: remove spaces, parentheses, dashes, and plus signs
        const cleanPhoneNumber = businessPhone.replace(/[\s()+-]/g, '');
        const message = encodeURIComponent(`Hola, estoy interesado en el producto: ${name}`);
        window.open(`https://wa.me/${cleanPhoneNumber}?text=${message}`, '_blank');
    };

    return (
        <Card>
            <CardHeader>
                <div className="aspect-square relative w-full mb-4">
                    <Image
                        src={imageUrl || 'https://placehold.co/400x400.png'}
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
                <Button className="w-full mt-4" onClick={handleWhatsAppClick}>
                    <Phone className="mr-2 h-4 w-4" />
                    Contactar por WhatsApp
                </Button>
            </CardContent>
        </Card>
    );
};


export default function PublicidadSanaPage() {
    const [businessData, setBusinessData] = useState<BusinessData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const { appUser } = useAuth();

    useEffect(() => {
        const fetchBusinessData = async () => {
            setLoading(true);
            try {
                const businessRef = doc(db, 'businesses', businessId);
                const docSnap = await getDoc(businessRef);
                if (docSnap.exists()) {
                    const data = docSnap.data() as BusinessData;
                    const sanitizedData = { ...data, products: Array.isArray(data.products) ? data.products : [] };
                    setBusinessData(sanitizedData);
                } else {
                    setBusinessData(null); // No data found
                }
            } catch (err) {
                console.error("Error fetching business data:", err);
                setError("No se pudo cargar la información del negocio. Revisa tu conexión y los permisos de la base de datos.");
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessData();
    }, []);

    if (loading) {
        return (
             <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin" />
             </div>
        )
    }

     if (error) {
        return (
            <div className="flex flex-col h-screen items-center justify-center text-center p-4">
                <AlertTriangle className="h-12 w-12 mb-4 text-destructive" />
                <h2 className="text-xl font-semibold">Error al Cargar</h2>
                <p className="text-muted-foreground mt-2">{error}</p>
                 {appUser && appUser.email === 'alcantara00789@gmail.com' && (
                     <Button asChild className="mt-6">
                        <Link href="/dashboard/advertising">Ir al Editor para Inicializar</Link>
                    </Button>
                )}
            </div>
        );
    }
    
    if (!businessData) {
        return (
            <div className="flex flex-col h-screen items-center justify-center text-center p-4">
                <AlertTriangle className="h-12 w-12 mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Página no disponible</h2>
                <p className="text-muted-foreground mt-2">No se encontró información para este negocio en este momento.</p>
                {appUser && appUser.email === 'alcantara00789@gmail.com' && (
                     <Button asChild className="mt-6">
                        <Link href="/dashboard/advertising">Ir al Editor para Inicializar</Link>
                    </Button>
                )}
            </div>
        )
    }

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
              {businessData.pageTitle}
            </h1>
            <p className="mt-4 text-center text-muted-foreground md:text-xl max-w-2xl mx-auto">
              {businessData.pageDescription}
            </p>
            
            <Separator className="my-12" />

            <div className="grid md:grid-cols-[2fr_1fr] gap-8">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl font-headline mb-6">
                    Productos Ofrecidos con Claridad
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {businessData.products.map((product, index) => (
                      <ProductCard key={index} {...product} businessPhone={businessData.phone} />
                    ))}
                  </div>
                </section>
                
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
                                        <span className="ml-2 text-sm text-muted-foreground">{businessData.reviewSource}</span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <blockquote className="border-l-2 pl-6 italic text-muted-foreground">
                            {businessData.reviewQuote}
                            </blockquote>
                        </CardContent>
                    </Card>
                </section>
              </div>

              <aside className="space-y-6 sticky top-24 h-min">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{businessData.name}</CardTitle>
                    <CardDescription>{businessData.tagline}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-1 shrink-0" />
                      <span>{businessData.address}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 mt-1 shrink-0" />
                      <span>{businessData.phone}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-1 shrink-0" />
                      <span>{businessData.hours}</span>
                    </div>
                    <Separator />
                     <div className="flex items-start gap-3">
                        <Instagram className="h-4 w-4 mt-1 shrink-0"/>
                        <a href={businessData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Ver perfil en Instagram
                        </a>
                     </div>
                  </CardContent>
                </Card>
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
