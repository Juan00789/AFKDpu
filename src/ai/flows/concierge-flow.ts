'use server';
/**
 * @fileOverview Un agente de IA que actúa como conserje personal, ofreciendo consejos.
 *
 * - askConcierge - Una función que responde a las preguntas del usuario.
 * - ConciergeOutput - El tipo de retorno para la función askConcierge.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { manuals } from '@/lib/data';

const ConciergeInputSchema = z.object({
  question: z.string().describe("La pregunta o problema del usuario."),
  recaptchaToken: z.string().describe("El token de reCAPTCHA para verificación."),
});
type ConciergeInput = z.infer<typeof ConciergeInputSchema>;

const ConciergeOutputSchema = z.object({
  answer: z.string().describe("La respuesta reflexiva y orientadora a la pregunta del usuario, presentada como un diálogo."),
});

export type ConciergeOutput = z.infer<typeof ConciergeOutputSchema>;

export async function askConcierge(input: ConciergeInput): Promise<ConciergeOutput> {
  return conciergeFlow(input);
}

const philosophy = manuals.map(m => `Principio: ${m.title} (${m.category}) - ${m.description}`).join('\n');

const prompt = ai.definePrompt({
  name: 'conciergePrompt',
  input: { schema: z.string() },
  output: { schema: ConciergeOutputSchema },
  prompt: `Eres una IA para AFKDpu, un proyecto sobre reconstruir con propósito. Tu tarea es responder a la pregunta de un usuario mediante un diálogo entre dos personajes:

1.  **El Fundador:** Habla en primera persona ("yo"). Es empático, directo y se basa en las lecciones duras aprendidas. Su voz refleja la filosofía de los manuales.
2.  **El Amigo:** Es curioso, optimista y a veces escéptico. Hace preguntas, desafía las ideas del fundador y ofrece una perspectiva externa.

Tu conocimiento se basa en la siguiente filosofía y manuales:
${philosophy}

Un usuario tiene la siguiente pregunta. Crea un diálogo corto pero profundo entre el Fundador y el Amigo que aborde la pregunta del usuario. La respuesta debe ser útil, reflexiva y multifacética.

Pregunta del usuario:
"{{{input}}}"

Formatea tu respuesta como un diálogo. Por ejemplo:
Amigo: [Su pregunta o comentario]
Fundador: [Su respuesta basada en la experiencia]
Amigo: [Su reflexión final]

La respuesta final debe ser solo el diálogo.
`,
});

const conciergeFlow = ai.defineFlow(
  {
    name: 'conciergeFlow',
    inputSchema: ConciergeInputSchema,
    outputSchema: ConciergeOutputSchema,
  },
  async (input) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      throw new Error('La clave secreta de reCAPTCHA no está configurada.');
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${input.recaptchaToken}`;

    const response = await fetch(verificationUrl, { method: 'POST' });
    const data = await response.json();

    if (!data.success || data.score < 0.5) {
      throw new Error('Verificación de reCAPTCHA fallida.');
    }

    const { output } = await prompt(input.question);
    return output!;
  }
);
