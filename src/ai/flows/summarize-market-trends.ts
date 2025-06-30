'use server';
/**
 * @fileOverview An AI agent that summarizes recent trends in the Indonesian food market.
 *
 * - summarizeMarketTrends - A function that summarizes recent market trends.
 * - SummarizeMarketTrendsInput - The input type for the summarizeMarketTrends function.
 * - SummarizeMarketTrendsOutput - The return type for the summarizeMarketTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMarketTrendsInputSchema = z.object({
  datasetDescription: z
    .string()
    .describe(
      'A description of the dataset being analyzed, including its source, the type of data it contains, and the period it covers.'
    ),
  data: z
    .string()
    .describe(
      'The dataset in CSV format, containing the information to be analyzed for market trends.'
    ),
});
export type SummarizeMarketTrendsInput = z.infer<
  typeof SummarizeMarketTrendsInputSchema
>;

const SummarizeMarketTrendsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the recent trends in the Indonesian food market, identifying emerging patterns and anomalies.'
    ),
  anomalies: z
    .string()
    .optional()
    .describe('A list of anomalies that deviate from the trend summary'),
});
export type SummarizeMarketTrendsOutput = z.infer<
  typeof SummarizeMarketTrendsOutputSchema
>;

export async function summarizeMarketTrends(
  input: SummarizeMarketTrendsInput
): Promise<SummarizeMarketTrendsOutput> {
  return summarizeMarketTrendsFlow(input);
}

const summarizeMarketTrendsPrompt = ai.definePrompt({
  name: 'summarizeMarketTrendsPrompt',
  input: {schema: SummarizeMarketTrendsInputSchema},
  output: {schema: SummarizeMarketTrendsOutputSchema},
  prompt: `You are an expert market analyst specializing in the Indonesian food market. Based on the provided transaction data, generate a concise summary of the key market trends. 

Your summary should highlight:
- Top-performing products and regions.
- Any observable sales patterns or growth trends.
- Potential market opportunities.

Additionally, identify any significant anomalies in the data, such as unusually high or low sales figures for a product or region, and list them in the 'anomalies' field.

Dataset Description: {{{datasetDescription}}}

Dataset (CSV format):
{{{data}}}

Provide your analysis based *only* on the data provided.`,
});

const summarizeMarketTrendsFlow = ai.defineFlow(
  {
    name: 'summarizeMarketTrendsFlow',
    inputSchema: SummarizeMarketTrendsInputSchema,
    outputSchema: SummarizeMarketTrendsOutputSchema,
  },
  async input => {
    const {output} = await summarizeMarketTrendsPrompt(input);
    return output!;
  }
);
