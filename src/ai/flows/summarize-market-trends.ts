// Summarize Market Trends flow implemented.
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
  prompt: `You are an expert market analyst specializing in the Indonesian food market. You are given a dataset and its description, and you need to provide a concise summary of the recent trends, identifying any emerging patterns and anomalies.

Dataset Description: {{{datasetDescription}}}

Dataset:
{{#if data}} {{{data}}} {{else}} No data provided. {{/if}}

Summary:`,
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
