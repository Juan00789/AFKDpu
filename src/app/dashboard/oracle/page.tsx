'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { getOracleMessage, OracleMessageOutput } from '@/ai/flows/oracle-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function OraclePage() {
    const { appUser } = useAuth();
    const [message, setMessage] = useState<OracleMessageOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const consultOracle = async () => {
        if (!appUser) return;
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const result = await getOracleMessage({ userName: appUser.name });
            setMessage(result);
        } catch (err) {
            console.error(err);
            setError("El oráculo guarda silencio por ahora. Su conexión con el éter puede estar interrumpida. Por favor, inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-headline">La Cámara del Oráculo</h1>
                <p className="text-muted-foreground mt-2">Pausa, respira, y busca un susurro del éter.</p>
            </div>

            <Card className="w-full max-w-xl text-center">
                <CardHeader>
                    <Wand2 className="mx-auto h-12 w-12 text-primary" />
                </CardHeader>
                <CardContent>
                    {!message && !loading && !error && (
                         <p className="text-muted-foreground">La cámara está en silencio. El oráculo espera tu llamado.</p>
                    )}
                    {loading && (
                        <div className="flex flex-col items-center justify-center space-y-4 py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-muted-foreground">Conectando con el éter...</p>
                        </div>
                    )}
                     {error && (
                        <Alert variant="destructive" className="text-left">
                            <AlertTitle>Silencio</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {message && (
                        <div className="space-y-4 py-4 animate-in fade-in-50 duration-1000">
                            <h2 className="text-2xl font-headline text-primary">{message.title}</h2>
                            <blockquote className="text-lg italic text-foreground">
                                &ldquo;{message.message}&rdquo;
                            </blockquote>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex-col gap-4">
                     <Button onClick={consultOracle} disabled={loading} size="lg">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Escuchando...
                            </>
                        ) : (
                             <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                {message ? "Consultar de Nuevo" : "Consultar al Oráculo"}
                            </>
                        )}
                    </Button>
                    <p className="text-xs text-muted-foreground">Este mensaje es para ti, en este momento.</p>
                </CardFooter>
            </Card>
        </div>
    );
}
