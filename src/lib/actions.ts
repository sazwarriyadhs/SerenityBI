"use server";

import { summarizeMarketTrends } from '@/ai/flows/summarize-market-trends';

const toCsv = (data: { [key: string]: any }[]): string => {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => JSON.stringify(row[header])).join(','));
  return [headers.join(','), ...rows].join('\n');
};

export async function getMarketSummary(
  datasetDescription: string,
  salesData: any[]
): Promise<{ summary?: string | null; anomalies?: string | null; error?: string }> {
  try {
    const dataToAnalyze = salesData.map(({ id, ...rest }) => rest);
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
