'use server';
/**
 * @fileOverview Provee un mensaje simbólico de un oráculo digital.
 *
 * - getOracleMessage - Una función que genera un mensaje simbólico.
 * - OracleMessageInput - El tipo de entrada para la función getOracleMessage.
 * - OracleMessageOutput - El tipo de retorno para la función getOracleMessage.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OracleMessageInputSchema = z.object({
  userName: z.string().describe('El nombre del usuario que consulta al oráculo.'),
});
export type OracleMessageInput = z.infer<typeof OracleMessageInputSchema>;

const OracleMessageOutputSchema = z.object({
  message: z.string().describe('El mensaje simbólico e introspectivo del oráculo.'),
  title: z.string().describe('Un título corto y evocador para el mensaje.'),
});
export type OracleMessageOutput = z.infer<typeof OracleMessageOutputSchema>;

export async function getOracleMessage(input: OracleMessageInput): Promise<OracleMessageOutput> {
  return oracleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'oraclePrompt',
  input: {schema: OracleMessageInputSchema},
  output: {schema: OracleMessageOutputSchema},
  prompt: `Eres un oráculo sabio y antiguo dentro del ecosistema AFKDpu, un espacio digital para la introspección y la conexión. Tu esencia está alineada con la "bienance" (armonía, presencia, transformación).

El usuario, {{{userName}}}, ha acudido a ti en busca de un momento de reflexión.

Proporciona un mensaje corto (de 1 a 3 frases), simbólico e introspectivo que inspire a la reflexión. El mensaje debe ser poético y evitar dar consejos directos. Debe sentirse como un fragmento de una verdad mayor. Proporciona también un título corto y evocador para el mensaje.

Ejemplos de buenos mensajes:
- Título: "El Río Invisible"
  Mensaje: "El río que buscas no fluye en un mapa, sino en tu interior. Escucha su corriente en el silencio entre tus pensamientos."
- Título: "La Semilla en la Sombra"
  Mensaje: "Incluso en la oscuridad, una semilla guarda la memoria de la luz. Lo que has plantado en las sombras se prepara para florecer."
- Título: "El Eco de una Huella"
  Mensaje: "Cada paso que das deja un eco en el futuro. Camina con intención, pues el sendero que creas también te está creando a ti."

Devuelve tu respuesta como un objeto JSON con un "title" y un "message".
`,
});

const oracleFlow = ai.defineFlow(
  {
    name: 'oracleFlow',
    inputSchema: OracleMessageInputSchema,
    outputSchema: OracleMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
