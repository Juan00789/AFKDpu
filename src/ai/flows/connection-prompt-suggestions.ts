
// use server'
'use server';
/**
 * @fileOverview Provides AI-powered suggestions for connection updates.
 *
 * - getConnectionPromptSuggestions - A function that generates suggestions for connection updates.
 * - ConnectionPromptSuggestionsInput - The input type for the getConnectionPromptSuggestions function.
 * - ConnectionPromptSuggestionsOutput - The return type for the getConnectionPromptSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConnectionPromptSuggestionsInputSchema = z.object({
  connectionName: z.string().describe('The name of the portal or its purpose.'),
  connectionState: z.string().describe('The current state of the portal (e.g., Activo, En espera, Cerrado).'),
  lastInteraction: z.string().describe('A description of the last interaction within the portal.'),
  rules: z.string().describe('A description of the rules or context defined for this portal.'),
  userName: z.string().describe('The name of the user requesting the suggestions.'),
});
export type ConnectionPromptSuggestionsInput = z.infer<typeof ConnectionPromptSuggestionsInputSchema>;

const ConnectionPromptSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of AI-powered suggestions for updating the portal.'),
});
export type ConnectionPromptSuggestionsOutput = z.infer<typeof ConnectionPromptSuggestionsOutputSchema>;

export async function getConnectionPromptSuggestions(input: ConnectionPromptSuggestionsInput): Promise<ConnectionPromptSuggestionsOutput> {
  return connectionPromptSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'connectionPromptSuggestionsPrompt',
  input: {schema: ConnectionPromptSuggestionsInputSchema},
  output: {schema: ConnectionPromptSuggestionsOutputSchema},
  prompt: `You are an expert business assistant for AFKDpu, a corporate asynchronous communication platform. Your goal is to help users manage their conversations and tasks effectively.

The user, {{{userName}}}, has a portal for the purpose of: "{{{connectionName}}}".
The portal's current status is: "{{{connectionState}}}".
The last interaction was: "{{{lastInteraction}}}".
The rules/context for this portal are: {{{rules}}}.

Based on this information, provide 3 short, actionable, and professional suggestions to help the user advance the journey or resolve the task associated with this portal. Return your answer as a JSON array of strings.

For example:
[
  "Enviar un resumen de los puntos acordados para confirmar el siguiente paso.",
  "Programar una breve llamada de 15 minutos para aclarar dudas pendientes.",
  "Compartir la documentación relevante para desbloquear la siguiente fase del proyecto."
]
  `,
});

const connectionPromptSuggestionsFlow = ai.defineFlow(
  {
    name: 'connectionPromptSuggestionsFlow',
    inputSchema: ConnectionPromptSuggestionsInputSchema,
    outputSchema: ConnectionPromptSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
