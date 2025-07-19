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

const ConciergeOutputSchema = z.object({
  answer: z.string().describe("La respuesta reflexiva y orientadora a la pregunta del usuario."),
});

export type ConciergeOutput = z.infer<typeof ConciergeOutputSchema>;

export async function askConcierge(question: string): Promise<ConciergeOutput> {
  return conciergeFlow(question);
}

const philosophy = manuals.map(m => `Principio: ${m.title} (${m.category}) - ${m.description}`).join('\n');

const prompt = ai.definePrompt({
  name: 'conciergePrompt',
  input: { schema: z.string() },
  output: { schema: ConciergeOutputSchema },
  prompt: `Eres el conserje de IA de AFKDpu, un proyecto sobre reconstruir con propósito después de la pérdida y el fracaso. Tu personalidad es empática, reflexiva y directa, como un mentor que ha pasado por momentos difíciles.

Tu conocimiento se basa en la siguiente filosofía y manuales:
${philosophy}

Un usuario tiene la siguiente pregunta o problema. Dale un consejo basado en tu filosofía. No te limites a repetir los manuales, úsalos como base para dar una respuesta original, profunda y útil. Habla en primera persona, como si fueras el fundador.

Pregunta del usuario:
"{{{input}}}"

Tu respuesta debe ser un párrafo o dos. Sé conciso pero impactante.
`,
});

const conciergeFlow = ai.defineFlow(
  {
    name: 'conciergeFlow',
    inputSchema: z.string(),
    outputSchema: ConciergeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
