'use server';

/**
 * @fileOverview AI-powered image style suggestion flow for photographers.
 *
 * - suggestImageStyles - A function that provides style, angle, and caption suggestions for images.
 * - ImageStyleSuggestionsInput - The input type for the suggestImageStyles function.
 * - ImageStyleSuggestionsOutput - The return type for the suggestImageStyles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageStyleSuggestionsInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo to be analyzed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  imageDescription: z
    .string()
    .describe('A description of the image, including context.'),
});
export type ImageStyleSuggestionsInput = z.infer<
  typeof ImageStyleSuggestionsInputSchema
>;

const ImageStyleSuggestionsOutputSchema = z.object({
  styleSuggestion: z.string().describe('Suggested style for the image.'),
  angleSuggestion: z.string().describe('Suggested angle for the image.'),
  captionSuggestion: z.string().describe('Suggested caption for the image.'),
});
export type ImageStyleSuggestionsOutput = z.infer<
  typeof ImageStyleSuggestionsOutputSchema
>;

export async function suggestImageStyles(
  input: ImageStyleSuggestionsInput
): Promise<ImageStyleSuggestionsOutput> {
  return imageStyleSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageStyleSuggestionsPrompt',
  input: {schema: ImageStyleSuggestionsInputSchema},
  output: {schema: ImageStyleSuggestionsOutputSchema},
  prompt: `You are an expert photography assistant. Given an image and its description, provide suggestions for the best style, angle, and caption.

Description: {{{imageDescription}}}
Image: {{media url=imageDataUri}}

Respond with a style suggestion, an angle suggestion, and a caption suggestion. Consider that this image is being uploaded to a Bengali wedding photography website. Return each value with a short explanation.

{{outputFormatInstructions}}`,
});

const imageStyleSuggestionsFlow = ai.defineFlow(
  {
    name: 'imageStyleSuggestionsFlow',
    inputSchema: ImageStyleSuggestionsInputSchema,
    outputSchema: ImageStyleSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);










