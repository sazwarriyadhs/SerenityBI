'use server';
/**
 * @fileOverview This file defines a Genkit flow for identifying anomalous events in food market data.
 *
 * - identifyAnomalousEvents - A function that triggers the anomaly detection flow.
 * - IdentifyAnomalousEventsInput - The input type for the identifyAnomalousEvents function, which is the market data.
 * - IdentifyAnomalousEventsOutput - The return type for the identifyAnomalousEvents function, which is a summary of the anomalous events detected.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyAnomalousEventsInputSchema = z.object({
  marketData: z.string().describe('The food market data as a JSON string.'),
});
export type IdentifyAnomalousEventsInput = z.infer<typeof IdentifyAnomalousEventsInputSchema>;

const IdentifyAnomalousEventsOutputSchema = z.object({
  anomalousEventsSummary: z
    .string()
    .describe('A concise summary of the anomalous events detected in the food market data.'),
});
export type IdentifyAnomalousEventsOutput = z.infer<typeof IdentifyAnomalousEventsOutputSchema>;

export async function identifyAnomalousEvents(
  input: IdentifyAnomalousEventsInput
): Promise<IdentifyAnomalousEventsOutput> {
  return identifyAnomalousEventsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyAnomalousEventsPrompt',
  input: {schema: IdentifyAnomalousEventsInputSchema},
  output: {schema: IdentifyAnomalousEventsOutputSchema},
  prompt: `You are an expert in analyzing food market data to identify anomalous events.

  Analyze the following food market data and provide a concise summary of any anomalous events detected.
  Anomalous events could be unexpected spikes or drops in sales, unusual price fluctuations, or any other significant deviations from established patterns.

  Market Data: {{{marketData}}}
  \n  Summary: `,
});

const identifyAnomalousEventsFlow = ai.defineFlow(
  {
    name: 'identifyAnomalousEventsFlow',
    inputSchema: IdentifyAnomalousEventsInputSchema,
    outputSchema: IdentifyAnomalousEventsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
