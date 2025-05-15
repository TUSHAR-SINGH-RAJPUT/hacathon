
'use server';

/**
 * @fileOverview Estimates the price range for a job request based on job details.
 *
 * - estimateJobPrice - A function that estimates the price range for a job request.
 * - EstimateJobPriceInput - The input type for the estimateJobPrice function.
 * - EstimateJobPriceOutput - The return type for the estimateJobPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateJobPriceInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('Detailed description of the job including tasks, materials, and special requirements.'),
  location: z.string().describe('The location where the job needs to be performed.'),
  serviceType: z.string().describe('Type of service requested (e.g., painting, gardening, plumbing).'),
  urgency: z
    .string()
    .describe(
      'How quickly the job needs to be completed (e.g., urgent, within a week, flexible). This should include specifics, not just vague terms.'
    ),
  size: z.string().describe('size of job, small, medium or large'),
});
export type EstimateJobPriceInput = z.infer<typeof EstimateJobPriceInputSchema>;

const EstimateJobPriceOutputSchema = z.object({
  estimatedPriceRange: z
    .string()
    .describe('Estimated price range for the job request in Indian Rupees (e.g., ₹500-₹1000).'),
  factorsConsidered: z
    .string()
    .describe('A brief explanation of factors that influenced the price estimate.'),
});
export type EstimateJobPriceOutput = z.infer<typeof EstimateJobPriceOutputSchema>;

export async function estimateJobPrice(input: EstimateJobPriceInput): Promise<EstimateJobPriceOutput> {
  return estimateJobPriceFlow(input);
}

const estimateJobPricePrompt = ai.definePrompt({
  name: 'estimateJobPricePrompt',
  input: {schema: EstimateJobPriceInputSchema},
  output: {schema: EstimateJobPriceOutputSchema},
  prompt: `You are an experienced estimator for various home services in India.
  Based on the job details provided, estimate a price range for the job in Indian Rupees (₹).
  Consider the service type, job description, location, urgency, and other relevant factors.

  Service Type: {{{serviceType}}}
  Job Description: {{{jobDescription}}}
  Location: {{{location}}}
  Urgency: {{{urgency}}}
  Size: {{{size}}}

  Provide an estimated price range and briefly explain the factors considered in the estimate.
  Format the estimated price range as a string like "₹500-₹1000".
  Ensure the factors considered are concise and relevant to the job details.
  `,
});

const estimateJobPriceFlow = ai.defineFlow(
  {
    name: 'estimateJobPriceFlow',
    inputSchema: EstimateJobPriceInputSchema,
    outputSchema: EstimateJobPriceOutputSchema,
  },
  async input => {
    const {output} = await estimateJobPricePrompt(input);
    return output!;
  }
);
