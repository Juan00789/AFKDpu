
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, AlertTriangle, Save, PlusCircle, Trash2, Upload } from "lucide-react";
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from '@/hooks/use-toast';

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

export default function AdvertisingPage() {
    const { appUser } = useAuth();
    const [businessData, setBusinessData] = useState<BusinessData | null>(null);
    const [editData, setEditData] = useState<BusinessData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { toast } = useToast();

    const canEdit = appUser && (appUser.email === 'alcantara00789@gmail.com' || appUser.claimedBusinessId === businessId);

    useEffect(() => {
        const fetchBusinessData = async () => {
            setLoading(true);
            try {
                const businessRef = doc(db, 'businesses', businessId);
                const docSnap = await getDoc(businessRef);
                if (docSnap.exists()) {
                    const data = docSnap.data() as BusinessData;
                    setBusinessData(data);
                    setEditData(data);
                } else {
                    setEditData(null);
                }
            } catch (err) {
                console.error("Error fetching business data:", err);
                toast({ variant: "destructive", title: "Error", description: "No se pudo cargar la información." });
            } finally {
                setLoading(false);
            }
        };

        if (canEdit) {
            fetchBusinessData();
        } else {
            setLoading(false);
        }
    }, [canEdit, toast]);
    
    if (loading) {
        return (
             <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin" />
             </div>
        )
    }

    if (!canEdit) {
        return (
            <div className="flex flex-col h-[calc(100vh-10rem)] items-center justify-center text-center p-4">
                <AlertTriangle className="h-12 w-12 mb-4 text-destructive" />
                <h2 className="text-xl font-semibold">Acceso Denegado</h2>
                <p className="text-muted-foreground mt-2">No tienes permiso para editar esta página.</p>
            </div>
        )
    }
    
    if (!editData) {
         return (
            <div className="flex flex-col h-[calc(100vh-10rem)] items-center justify-center text-center p-4">
                <AlertTriangle className="h-12 w-12 mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Página de Publicidad no encontrada</h2>
                <p className="text-muted-foreground mt-2">No se encontró información para este negocio. Es posible que un administrador necesite inicializarla.</p>
            </div>
        )
    }

    const handleFieldChange = (field: keyof BusinessData, value: string) => {
        setEditData(prev => prev ? ({ ...prev, [field]: value }) : null);
    };

    const handleProductChange = (index: number, field: keyof Product, value: string) => {
        if (!editData) return;
        const newProducts = [...editData.products];
        newProducts[index] = { ...newProducts[index], [field]: value };
        setEditData(prev => ({ ...prev!, products: newProducts }));
    };
    
    const handleProductImageUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !editData) return;

        setUploadingIndex(index);
        try {
            const imageRef = storageRef(storage, `business_products/${businessId}/${Date.now()}-${file.name}`);
            await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(imageRef);
            handleProductChange(index, 'imageUrl', downloadURL);
        } catch (error) {
            console.error("Error al subir la imagen del producto:", error);
            toast({ variant: "destructive", title: "Error de Carga", description: "No se pudo subir la imagen del producto." });
        } finally {
            setUploadingIndex(null);
        }
    };

    const addProduct = () => {
        if (!editData) return;
        const newProducts = [...editData.products, { name: '', price: '', category: '', imageUrl: 'https://placehold.co/400x400.png', imageHint: 'new product' }];
        setEditData(prev => ({...prev!, products: newProducts}));
    };

    const removeProduct = (index: number) => {
        if (!editData) return;
        const newProducts = editData.products.filter((_, i) => i !== index);
        setEditData(prev => ({...prev!, products: newProducts}));
    };

    const handleSave = async () => {
        if (!editData) return;
        setIsSaving(true);
        try {
            const businessRef = doc(db, 'businesses', businessId);
            await setDoc(businessRef, editData, { merge: true });
            setBusinessData(editData);
            toast({ title: "¡Éxito!", description: "La página de publicidad ha sido actualizada." });
        } catch (error) {
            console.error("Error updating business:", error);
            toast({ variant: "destructive", title: "Error", description: "No se pudo guardar la información." });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Editor de Publicidad</CardTitle>
                    <CardDescription>
                        Gestiona el contenido de la página pública para &quot;{businessData?.name}&quot;.
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                 <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Información General</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
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
                                <Label htmlFor="instagramUrl">URL de Instagram</Label>
                                <Input id="instagramUrl" value={editData.instagramUrl} onChange={(e) => handleFieldChange('instagramUrl', e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="reviewQuote">Cita de Reseña</Label>
                                <Textarea id="reviewQuote" value={editData.reviewQuote} onChange={(e) => handleFieldChange('reviewQuote', e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="reviewSource">Fuente de la Reseña</Label>
                                <Input id="reviewSource" value={editData.reviewSource} onChange={(e) => handleFieldChange('reviewSource', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Contenido de la Página</CardTitle>
                            <CardDescription>Textos para la página pública</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="pageTitle">Título principal</Label>
                                <Input id="pageTitle" value={editData.pageTitle} onChange={(e) => handleFieldChange('pageTitle', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pageDescription">Descripción de la página</Label>
                                <Textarea id="pageDescription" rows={4} value={editData.pageDescription} onChange={(e) => handleFieldChange('pageDescription', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>
                 </div>
                 <div className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1.5">
                                <CardTitle>Productos</CardTitle>
                                <CardDescription>Añade o edita los productos.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={addProduct}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Añadir
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {editData.products.map((product, index) => (
                                 <Card key={index} className="p-4 space-y-4 bg-muted/50">
                                    <div className="flex justify-between items-center">
                                        <Label className="font-semibold">Producto {index + 1}</Label>
                                        <Button variant="destructive" size="icon" onClick={() => removeProduct(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-2">
                                            <Image
                                                src={product.imageUrl || 'https://placehold.co/100x100.png'}
                                                alt={product.name || 'Product Image'}
                                                width={80}
                                                height={80}
                                                className="rounded-md object-cover aspect-square"
                                            />
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
                                                size="sm"
                                                className="w-full mt-2"
                                                onClick={() => fileInputRefs.current?.[index]?.click()}
                                                disabled={uploadingIndex === index}
                                            >
                                                {uploadingIndex === index ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Upload className="h-4 w-4" />
                                                )}
                                                Cambiar
                                            </Button>
                                        </div>
                                        <div className="w-full space-y-2">
                                            <Label>Nombre</Label>
                                            <Input placeholder="Nombre del producto" value={product.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)} />
                                            <Label>Precio</Label>
                                            <Input placeholder="Ej: RD$10,000" value={product.price} onChange={(e) => handleProductChange(index, 'price', e.target.value)} />
                                            <Label>Categoría</Label>
                                            <Input placeholder="Categoría" value={product.category} onChange={(e) => handleProductChange(index, 'category', e.target.value)} />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {editData.products.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No hay productos. Añade uno para empezar.</p>}
                        </CardContent>
                    </Card>
                 </div>
            </div>
             <Card className="sticky bottom-4 z-10 mt-6">
                <CardFooter className="p-4 flex items-center justify-end">
                     <Button onClick={handleSave} disabled={isSaving || uploadingIndex !== null}>
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Guardar todos los cambios
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
