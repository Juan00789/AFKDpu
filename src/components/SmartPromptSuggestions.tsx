'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getConnectionPromptSuggestions } from '@/ai/flows/connection-prompt-suggestions';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';
import type { ConnectionPromptSuggestionsInput } from '@/ai/flows/connection-prompt-suggestions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface SmartPromptSuggestionsProps {
    connectionInfo: ConnectionPromptSuggestionsInput;
}

export function SmartPromptSuggestions({ connectionInfo }: SmartPromptSuggestionsProps) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetSuggestions = async () => {
        setLoading(true);
        setError(null);
        setSuggestions([]);
        try {
            const result = await getConnectionPromptSuggestions(connectionInfo);
            setSuggestions(result.suggestions);
        } catch (e) {
            console.error(e);
            setError('No se pudieron generar las sugerencias. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span>Sugerencias Inteligentes</span>
                </CardTitle>
                <CardDescription>
                    Obtén ideas personalizadas por IA para mejorar el estado de tu conexión.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={handleGetSuggestions} disabled={loading} className="w-full">
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generando...
                        </>
                    ) : (
                        'Obtener Sugerencias'
                    )}
                </Button>

                {error && (
                     <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {suggestions.length > 0 && (
                    <div className="space-y-2 pt-4">
                         <h4 className="font-semibold">Aquí tienes algunas ideas:</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                            {suggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
