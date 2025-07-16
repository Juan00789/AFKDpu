'use server';

/**
 * @fileOverview A flow that uses AI to analyze user input and connects it with moments of wisdom, providing responses with visual and emotional spark.
 *
 * - provideEmotionalResponse - A function that handles the emotional response process.
 * - ProvideEmotionalResponseInput - The input type for the provideEmotionalResponse function.
 * - ProvideEmotionalResponseOutput - The return type for the provideEmotionalResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const ProvideEmotionalResponseInputSchema = z.object({
  userInput: z.string().describe('The user input to be analyzed.'),
});
export type ProvideEmotionalResponseInput = z.infer<typeof ProvideEmotionalResponseInputSchema>;

const ProvideEmotionalResponseOutputSchema = z.object({
  response: z.string().describe('The AI generated response with emotional connection.'),
  sparkAudioUrl: z.string().describe('URL of the generated audio spark.'),
});
export type ProvideEmotionalResponseOutput = z.infer<typeof ProvideEmotionalResponseOutputSchema>;

export async function provideEmotionalResponse(input: ProvideEmotionalResponseInput): Promise<ProvideEmotionalResponseOutput> {
  return provideEmotionalResponseFlow(input);
}

const emotionalResponsePrompt = ai.definePrompt({
  name: 'emotionalResponsePrompt',
  input: {schema: ProvideEmotionalResponseInputSchema},
  output: {schema: z.object({response: z.string()})},
  prompt: `You are an AI Reflection Tool that analyzes user input and connects it with moments of wisdom, providing responses with visual and emotional spark.\n\nUser Input: {{{userInput}}}\n\nResponse:`,
});

const provideEmotionalResponseFlow = ai.defineFlow(
  {
    name: 'provideEmotionalResponseFlow',
    inputSchema: ProvideEmotionalResponseInputSchema,
    outputSchema: ProvideEmotionalResponseOutputSchema,
  },
  async input => {
    const {output} = await emotionalResponsePrompt(input);

     // Generate audio spark
    const { media: audioSpark } = await ai.generate({
      model: ai.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: output?.response ?? '',
    });

    if (!audioSpark?.url) {
      throw new Error('Failed to generate audio spark.');
    }

    const audioBuffer = Buffer.from(
      audioSpark.url.substring(audioSpark.url.indexOf(',') + 1),
      'base64'
    );
    const audioWav = 'data:audio/wav;base64,' + (await toWav(audioBuffer))

    return {
      response: output!.response,
      sparkAudioUrl: audioWav
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
