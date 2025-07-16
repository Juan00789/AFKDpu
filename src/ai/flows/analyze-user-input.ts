// 'use server';

/**
 * @fileOverview An AI Reflection Tool that analyzes user input and connects it with relevant insights from the archive of wisdom.
 *
 * - analyzeUserInput - A function that handles the analysis of user input and provides relevant insights.
 * - AnalyzeUserInputInput - The input type for the analyzeUserInput function.
 * - AnalyzeUserInputOutput - The return type for the analyzeUserInput function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUserInputInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input (questions, thoughts, or personal story).'),
});
export type AnalyzeUserInputInput = z.infer<typeof AnalyzeUserInputInputSchema>;

const AnalyzeUserInputOutputSchema = z.object({
  insights: z
    .string()
    .describe(
      'Insights and connections from the archive of wisdom relevant to the user input.'
    ),
  sparkVisual: z.string().describe('A visual representation of a spark.'),
});
export type AnalyzeUserInputOutput = z.infer<typeof AnalyzeUserInputOutputSchema>;

export async function analyzeUserInput(input: AnalyzeUserInputInput): Promise<AnalyzeUserInputOutput> {
  return analyzeUserInputFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUserInputPrompt',
  input: {schema: AnalyzeUserInputInputSchema},
  output: {schema: AnalyzeUserInputOutputSchema},
  prompt: `You are an AI Reflection Tool that analyzes user input and connects it with relevant insights from the archive of wisdom.

  User Input: {{{userInput}}}

  Based on the user input, provide relevant insights and connections from the archive of wisdom. Also, generate a visual representation of a spark related to the user input and insights. Return the insights and spark visual.`,
});

const analyzeUserInputFlow = ai.defineFlow(
  {
    name: 'analyzeUserInputFlow',
    inputSchema: AnalyzeUserInputInputSchema,
    outputSchema: AnalyzeUserInputOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
