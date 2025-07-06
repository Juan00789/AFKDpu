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
  connectionName: z.string().describe('The name of the connection.'),
  connectionState: z.string().describe('The current state of the connection (e.g., Vibrant, Neutral, Fading).'),
  lastInteraction: z.string().describe('A description of the last interaction with the connection.'),
  rules: z.string().describe('A description of the rules defined for this connection.'),
  userName: z.string().describe('The name of the user requesting the suggestions.'),
});
export type ConnectionPromptSuggestionsInput = z.infer<typeof ConnectionPromptSuggestionsInputSchema>;

const ConnectionPromptSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of AI-powered suggestions for updating the connection.'),
});
export type ConnectionPromptSuggestionsOutput = z.infer<typeof ConnectionPromptSuggestionsOutputSchema>;

export async function getConnectionPromptSuggestions(input: ConnectionPromptSuggestionsInput): Promise<ConnectionPromptSuggestionsOutput> {
  return connectionPromptSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'connectionPromptSuggestionsPrompt',
  input: {schema: ConnectionPromptSuggestionsInputSchema},
  output: {schema: ConnectionPromptSuggestionsOutputSchema},
  prompt: `You are an AI assistant helping users maintain and improve their connections on the AFKDpu platform.

  The user, {{{userName}}}, has a connection called {{{connectionName}}}. The connection is currently in the "{{{connectionState}}}" state.

  The last interaction with the connection was: {{{lastInteraction}}}.

The following rules are defined for this connection: {{{rules}}}.

Based on this information, provide 3 suggestions for the user on how they can update the connection's status or next steps to take to improve the connection's health.  The suggestions should be short and actionable. Return your answer as a JSON array of strings.
  For example:
  [
    "Schedule a meeting with the connection to discuss project updates.",
    "Send a personalized message to check in on their well-being.",
    "Share a relevant article or resource that might be of interest.",
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
