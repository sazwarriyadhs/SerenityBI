"use server";

import { summarizeMarketTrends } from '@/ai/flows/summarize-market-trends';
import { salesByProductData, salesOverTimeData } from '@/lib/data';

// A helper function to convert JSON data to a simplified CSV format string.
const toCsv = (data: { [key: string]: any }[]): string => {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header]).join(','));
  return [headers.join(','), ...rows].join('\n');
};

export async function getMarketSummary(): Promise<{ summary?: string | null; error?: string }> {
  try {
    const datasetDescription =
      'This dataset contains sales information for various food products in Indonesia over the last six months. It includes sales figures by product and sales trends over time.';

    const combinedData = salesOverTimeData.map((timeData, index) => ({
        ...timeData,
        ...salesByProductData[index]
    }));

    const data = toCsv(combinedData);

    const result = await summarizeMarketTrends({
      datasetDescription,
      data,
    });

    return { summary: result.summary };
  } catch (error) {
    console.error('Error generating market summary:', error);
    return { error: 'Failed to generate market summary. Please try again.' };
  }
}
