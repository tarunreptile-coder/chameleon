'use server';
/**
 * @fileOverview A flow to improve a user's prompt.
 *
 * - improvePrompt - A function that takes a short prompt and returns a more detailed one.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export async function improvePrompt(prompt: string): Promise<string> {
    const { output } = await improvePromptFlow({ prompt });
    return output!;
}

const improvePromptFlow = ai.defineFlow(
    {
        name: 'improvePromptFlow',
        inputSchema: z.object({ prompt: z.string() }),
        outputSchema: z.string(),
    },
    async ({ prompt }) => {
        const llmResponse = await ai.generate({
            prompt: `You are an expert at writing detailed prompts for a UI generation model.
The user has provided the following short prompt. Expand it into a detailed and structured prompt that describes a mobile app.
The expanded prompt should be suitable for generating a complete app UI.
Make it detailed, structured, and actionable. Provide examples, templates, and best practices.
Consider things like app identity, core features, user personalization, UX/UI suggestions, monetization, gamification, and retention strategies.

User's short prompt: "${prompt}"

Your detailed prompt:`,
            model: 'googleai/gemini-2.5-flash',
            output: {
                format: 'text',
            },
        });

        return llmResponse.text;
    }
);
