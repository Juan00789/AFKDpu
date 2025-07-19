'use client';

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { askConcierge } from '@/ai/flows/concierge-flow';

const Concierge = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast({
        title: 'Pregunta vacía',
        description: 'Por favor, escribe tu pregunta o problema.',
        variant: 'destructive',
      });
      return;
    }

    if (!recaptchaToken) {
      toast({
        title: 'Verificación requerida',
        description: 'Por favor, completa el CAPTCHA.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAnswer('');
    try {
      const response = await askConcierge({ question, recaptchaToken });
      setAnswer(response.answer);
    } catch (error) {
      console.error('Error con la conserjería:', error);
      toast({
        title: 'Error',
        description: 'Hubo un problema al obtener la respuesta. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <section id="concierge" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Tu Conserje Personal</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            ¿Atascado en un problema? ¿Necesitas una perspectiva diferente? Describe tu situación y recibirás una guía basada en mi experiencia y filosofía.
          </p>
        </div>
        <div className="mt-12 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Consulta a la IA de AFKDpu</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="Ej: Estoy empezando un proyecto de diseño y no sé cómo manejar las críticas del cliente sin desmotivarme..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                  disabled={isLoading}
                />
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={handleRecaptchaChange}
                  theme="light"
                />
                <Button type="submit" disabled={isLoading || !recaptchaToken} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Pensando...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Pedir consejo
                    </>
                  )}
                </Button>
              </form>
              {answer && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="font-headline text-lg font-bold">Respuesta del conserje:</h3>
                  <p className="mt-2 text-muted-foreground whitespace-pre-wrap">{answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Concierge;
