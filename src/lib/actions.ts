"use server";

import { summarizeMarketTrends } from '@/ai/flows/summarize-market-trends';
import { recentSales } from '@/lib/data';

// A helper function to convert JSON data to a simplified CSV format string.
const toCsv = (data: { [key: string]: any }[]): string => {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => JSON.stringify(row[header])).join(','));
  return [headers.join(','), ...rows].join('\n');
};

export async function getMarketSummary(): Promise<{ summary?: string | null; anomalies?: string | null; error?: string }> {
  try {
    const datasetDescription =
      'This dataset contains recent sales transactions for various food products in Indonesia. It includes product name, vendor, region, and transaction amount in IDR.';

    // Using recentSales data as it is the most comprehensive.
    // The 'id' column can be removed as it's not relevant for analysis.
    const dataToAnalyze = recentSales.map(({ id, ...rest }) => rest);
    const data = toCsv(dataToAnalyze);

    const result = await summarizeMarketTrends({
      datasetDescription,
      data,
    });
    
    return { summary: result.summary, anomalies: result.anomalies };
  } catch (error) {
    console.error('Error generating market summary:', error);
    return { error: 'Failed to generate market summary. Please try again.' };
  }
}
