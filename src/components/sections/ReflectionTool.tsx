'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { provideEmotionalResponse, ProvideEmotionalResponseOutput } from '@/ai/flows/provide-emotional-response';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

type State = ProvideEmotionalResponseOutput & {
  error?: string | null;
};

const initialState: State = {
  response: '',
  sparkAudioUrl: '',
  error: null,
};

async function formAction(prevState: State, formData: FormData): Promise<State> {
  const userInput = formData.get('userInput') as string;
  if (!userInput?.trim()) {
    return { ...initialState, error: 'Por favor, introduce tus pensamientos para reflexionar.' };
  }
  try {
    const result = await provideEmotionalResponse({ userInput });
    return { ...result, error: null };
  } catch (e) {
    console.error(e);
    return { ...initialState, error: 'Ocurrió un error al generar la reflexión. Por favor, inténtalo de nuevo.' };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? 'Reflexionando...' : 'Obtener Chispa de Sabiduría'}
    </Button>
  );
}

const ReflectionTool = () => {
  const [state, dispatch] = useActionState(formAction, initialState);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  useEffect(() => {
    if (state.sparkAudioUrl && audioRef.current) {
      audioRef.current.src = state.sparkAudioUrl;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [state.sparkAudioUrl]);

  return (
    <section id="reflection" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Herramienta de Reflexión IA</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Conecta tus pensamientos con nuestro archivo de sabiduría y recibe una chispa visual y emocional.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <Card>
            <CardContent className="p-6">
              <form action={dispatch}>
                <Textarea
                  name="userInput"
                  placeholder="Escribe tus preguntas, pensamientos o una historia personal aquí..."
                  className="min-h-[120px] bg-white"
                  required
                />
                <div className="mt-4 flex justify-center">
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {state.response && (
           <div className="mx-auto mt-8 max-w-3xl animate-in fade-in duration-500">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle className="font-headline">Tu Chispa de Sabiduría</AlertTitle>
              <AlertDescription className="mt-4">
                <div>
                    <p className="text-foreground">{state.response}</p>
                    {state.sparkAudioUrl && <audio ref={audioRef} controls className="mt-4 w-full" />}
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReflectionTool;
