
import { z } from 'genkit';

export const ExportSectionSchema = z.object({
    id: z.string(),
    name: z.string(),
    imageUrl: z.string().optional(),
    htmlBody: z.string(),
});
export type ExportSection = z.infer<typeof ExportSectionSchema>;

export const ExportToCmsInputSchema = z.object({
  sections: z.array(ExportSectionSchema),
});
export type ExportToCmsInput = z.infer<typeof ExportToCmsInputSchema>;

export const ExportToCmsOutputSchema = z.object({
  id: z.string(),
});
export type ExportToCmsOutput = z.infer<typeof ExportToCmsOutputSchema>;

    