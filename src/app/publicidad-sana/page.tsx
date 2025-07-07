
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


const ProductCard = ({ name, price, category, imageUrl, imageHint }: Product) => (
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
      <Button className="w-full mt-4">Ver Producto</Button>
    </CardContent>
  </Card>
);

const EditBusinessDialog = ({ businessData, setBusinessData }: { businessData: BusinessData, setBusinessData: (data: BusinessData) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState<BusinessData>(businessData);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        setEditData(businessData);
    }, [businessData]);

    const handleFieldChange = (field: keyof BusinessData, value: string) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleProductChange = (index: number, field: keyof Product, value: string) => {
        const newProducts = [...editData.products];
        newProducts[index] = { ...newProducts[index], [field]: value };
        setEditData(prev => ({ ...prev, products: newProducts }));
    };
    
    const handleProductImageUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadingIndex(index);
        try {
            const imageRef = storageRef(storage, `business_products/${businessId}/${Date.now()}-${file.name}`);
            await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(imageRef);
            handleProductChange(index, 'imageUrl', downloadURL);
        } catch (error) {
            console.error("Error al subir la imagen del producto:", error);
            toast({
                variant: "destructive",
                title: "Error de Carga",
                description: "No se pudo subir la imagen del producto.",
            });
        } finally {
            setUploadingIndex(null);
        }
    };

    const addProduct = () => {
        const newProducts = [...editData.products, { name: '', price: '', category: '', imageUrl: 'https://placehold.co/400x400.png', imageHint: 'new product' }];
        setEditData(prev => ({...prev, products: newProducts}));
    };

    const removeProduct = (index: number) => {
        const newProducts = editData.products.filter((_, i) => i !== index);
        setEditData(prev => ({...prev, products: newProducts}));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const businessRef = doc(db, 'businesses', businessId);
            await setDoc(businessRef, editData, { merge: true });
            setBusinessData(editData);
            toast({
                title: "¡Éxito!",
                description: "La página de publicidad ha sido actualizada.",
            });
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating business:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo guardar la información. Revisa los permisos de la base de datos.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Gestionar Publicidad
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Editar Página de Publicidad</DialogTitle>
                    <DialogDescription>
                        Modifica el contenido que se muestra en la página de "Miguel iPhone Center".
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] p-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del Negocio</Label>
                            <Input id="name" value={editData.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="tagline">Lema / Subtítulo</Label>
                            <Input id="tagline" value={editData.tagline} onChange={(e) => handleFieldChange('tagline', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Dirección</Label>
                            <Input id="address" value={editData.address} onChange={(e) => handleFieldChange('address', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input id="phone" value={editData.phone} onChange={(e) => handleFieldChange('phone', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hours">Horario</Label>
                            <Input id="hours" value={editData.hours} onChange={(e) => handleFieldChange('hours', e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="reviewQuote">Cita de Reseña</Label>
                            <Textarea id="reviewQuote" value={editData.reviewQuote} onChange={(e) => handleFieldChange('reviewQuote', e.target.value)} />
                        </div>
                        <Separator />
                        <h3 className="text-lg font-semibold">Productos</h3>
                        {editData.products.map((product, index) => (
                             <Card key={index} className="p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label>Producto {index + 1}</Label>
                                    <Button variant="destructive" size="icon" onClick={() => removeProduct(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <Image
                                            src={product.imageUrl || 'https://placehold.co/100x100.png'}
                                            alt={product.name || 'Product Image'}
                                            width={80}
                                            height={80}
                                            className="rounded-md object-cover aspect-square"
                                        />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Input placeholder="Nombre del producto" value={product.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)} />
                                        <Input placeholder="Precio (ej: RD$10,000)" value={product.price} onChange={(e) => handleProductChange(index, 'price', e.target.value)} />
                                        <Input placeholder="Categoría" value={product.category} onChange={(e) => handleProductChange(index, 'category', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <Input
                                        id={`product-image-upload-${index}`}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleProductImageUpload(index, e)}
                                        className="hidden"
                                        ref={(el) => { if(fileInputRefs.current) fileInputRefs.current[index] = el; }}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => fileInputRefs.current?.[index]?.click()}
                                        disabled={uploadingIndex === index}
                                    >
                                        {uploadingIndex === index ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Subiendo...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Cambiar Imagen
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                         <Button variant="outline" onClick={addProduct} className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Añadir Producto
                        </Button>
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleSave} disabled={isSaving || uploadingIndex !== null}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Guardar Cambios
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default function PublicidadSanaPage() {
    const { appUser } = useAuth();
    const [businessData, setBusinessData] = useState<BusinessData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const canEdit = appUser && (appUser.email === 'alcantara00789@gmail.com' || appUser.claimedBusinessId === businessId);

    const initializeBusinessData = async () => {
        if (!appUser || appUser.email !== 'alcantara00789@gmail.com') return; // Only admin can initialize
        const defaultData: BusinessData = {
            name: "Miguel iPhone Center",
            tagline: "Tienda especializada en Apple",
            pageTitle: "Publicidad Sana: Un Caso de Estudio",
            pageDescription: "Analizamos cómo \"Miguel iPhone Center\" aplica los principios de una comunicación honesta y transparente, construyendo confianza con sus clientes.",
            address: "Sosua: La Union, Edificio 79, 1er piso Calle Del Cable, Puerto Plata 57000",
            phone: "(829) 399-0735",
            hours: "Cerrado ⋅ Abre a las 9 a. m.",
            instagramUrl: "https://instagram.com",
            reviewQuote: "Miguel iPhone Center es la única tienda dedicada 100% a la marca Apple. Somos lo más parecido a una App Store en cuanto a nuestro servicio (no estética). En todo Puerto Plata es el único lugar donde encontrarás todos los accesorios originales Apple....",
            reviewSource: "5.0 (17 opiniones en Google)",
            products: [
              { name: "iPhone XR Factory Unlocked", price: "RD$13,500.00", category: "Telefonos Moviles", imageUrl: "https://placehold.co/400x400.png", imageHint: "iphone xr" },
              { name: "iPhone XS Max 512GB", price: "RD$18,500.00", category: "Telefonos Moviles", imageUrl: "https://placehold.co/400x400.png", imageHint: "iphone xs" },
              { name: "iPhone XS MAX Factory Unlocked", price: "RD$16,000.00 - 18,000.00", category: "Telefonos Moviles", imageUrl: "https://placehold.co/400x400.png", imageHint: "iphone xs" },
              { name: "ipad y iPhone", price: "RD$4,000.00 - 10,000.00", category: "Dispositivos Apple", imageUrl: "https://placehold.co/400x400.png", imageHint: "ipad iphone" }
            ]
        };
        try {
            const businessRef = doc(db, 'businesses', businessId);
            await setDoc(businessRef, defaultData);
            setBusinessData(defaultData);
            toast({
                title: "Página inicializada",
                description: "Se han creado los datos iniciales para la página de publicidad."
            });
        } catch (error) {
            console.error(error);
            setError("No se pudieron inicializar los datos. Revisa los permisos de Firestore.");
        }
    };

    useEffect(() => {
        const fetchBusinessData = async () => {
            setLoading(true);
            try {
                const businessRef = doc(db, 'businesses', businessId);
                const docSnap = await getDoc(businessRef);
                if (docSnap.exists()) {
                    setBusinessData(docSnap.data() as BusinessData);
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
            <div className="flex flex-col h-screen items-center justify-center text-destructive">
                <AlertTriangle className="h-12 w-12 mb-4" />
                <h2 className="text-xl font-semibold">Error al cargar</h2>
                <p>{error}</p>
            </div>
        );
    }
    
    if (!businessData) {
        return (
            <div className="flex flex-col h-screen items-center justify-center text-center p-4">
                <AlertTriangle className="h-12 w-12 mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Página de Publicidad no encontrada</h2>
                <p className="text-muted-foreground mt-2">No se encontró información para este negocio.</p>
                {appUser && appUser.email === 'alcantara00789@gmail.com' && (
                    <Button onClick={initializeBusinessData} className="mt-6">
                        Inicializar Página de Ejemplo
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
                      <ProductCard key={index} {...product} />
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
                {canEdit && (
                    <EditBusinessDialog businessData={businessData} setBusinessData={setBusinessData} />
                )}
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
