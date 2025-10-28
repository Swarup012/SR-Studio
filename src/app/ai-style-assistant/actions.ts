'use server';

import { suggestImageStyles, type ImageStyleSuggestionsInput } from '@/ai/flows/image-style-suggestions';

export async function getStyleSuggestions(input: ImageStyleSuggestionsInput) {
    try {
        const suggestions = await suggestImageStyles(input);
        return suggestions;
    } catch (error) {
        console.error('Error in getStyleSuggestions server action:', error);
        throw new Error('Failed to fetch style suggestions from the AI model.');
    }
}
