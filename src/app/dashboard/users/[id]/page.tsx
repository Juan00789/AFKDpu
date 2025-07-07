
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, Review } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, ArrowLeft, Star } from "lucide-react";
import { CurrencyIcon } from '@/components/CurrencyIcon';
import { Button } from '@/components/ui/button';
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
                <CardDescription>El nivel de confianza del usuario en la plataforma.</CardDescription>
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

function ReviewsCard({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reseñas</CardTitle>
          <CardDescription>Opiniones de otros usuarios de la plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">Este usuario todavía no tiene reseñas.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reseñas ({reviews.length})</CardTitle>
        <CardDescription>Opiniones de otros usuarios de la plataforma.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4">
            <Link href={`/dashboard/users/${review.reviewerId}`}>
                <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage src={review.reviewerAvatar} />
                    <AvatarFallback>{review.reviewerName.charAt(0)}</AvatarFallback>
                </Avatar>
            </Link>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Link href={`/dashboard/users/${review.reviewerId}`}>
                    <p className="font-semibold hover:underline">{review.reviewerName}</p>
                </Link>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


export default function UserProfilePage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!params.id) return;
            setLoading(true);
            try {
                const userRef = doc(db, 'users', params.id as string);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    setUser(docSnap.data() as User);
                    
                    // Fetch reviews for this user
                    const reviewsQuery = query(
                        collection(db, 'reviews'), 
                        where('reviewedUserId', '==', params.id),
                        orderBy('createdAt', 'desc')
                    );
                    const reviewsSnapshot = await getDocs(reviewsQuery);
                    const reviewsData = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Review);
                    setReviews(reviewsData);

                } else {
                    setError("No se encontró el perfil de este usuario.");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Ocurrió un error al cargar el perfil.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col h-[calc(100vh-10rem)] items-center justify-center text-center p-4">
                <AlertTriangle className="h-12 w-12 mb-4 text-destructive" />
                <h2 className="text-xl font-semibold">Error al Cargar</h2>
                <p className="text-muted-foreground mt-2">{error}</p>
                <Button variant="outline" onClick={() => router.back()} className="mt-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                </Button>
            </div>
        )
    }

    if (!user) {
        return null; // Should be handled by loading/error states
    }

    return (
         <div className="space-y-6">
            <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
            </Button>
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
                        </CardContent>
                    </Card>
                     <ReviewsCard reviews={reviews} />
                </div>
                <div className="space-y-6">
                    <ReputationCard user={user} />
                </div>
            </div>
        </div>
    )
}
