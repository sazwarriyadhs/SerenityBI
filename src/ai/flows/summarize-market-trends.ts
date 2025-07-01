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
  prompt: `You are a data analyst expert for the Indonesian food market. Your task is to analyze the provided sales data and generate a market trend summary.

Follow these steps for your analysis:
1.  **Overall Performance**: Calculate the total revenue from the 'amount' column.
2.  **Top Performers**: Identify the top 3 products and top 3 regions by total sales amount.
3.  **Trend Identification**: Look for any interesting patterns or trends. For example, does a specific product sell exceptionally well in a particular region? Are there any vendors that dominate the sales?
4.  **Anomaly Detection**: Identify any transactions that seem like outliers or anomalies. For example, a transaction amount that is significantly higher or lower than the average for that product.
5.  **Synthesize Summary**: Based on the analysis above, write a concise summary for the 'summary' field. The summary must be insightful and based strictly on the data.
6.  **List Anomalies**: List the anomalies you found in the 'anomalies' field. If no anomalies are found, state that clearly.

**Dataset Description**: {{{datasetDescription}}}

**Dataset (CSV format)**:
{{{data}}}

Provide your analysis based *only* on the data provided. Structure your output in the requested JSON format.`,
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
