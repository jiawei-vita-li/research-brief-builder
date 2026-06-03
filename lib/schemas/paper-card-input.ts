import { z } from "zod";
import { paperCardLlmSchema } from "@/lib/schemas/paper-card";
import { researchMapLlmSchema } from "@/lib/schemas/research-map";

/** PaperCard payload for API routes (includes id). */
export const paperCardInputSchema = paperCardLlmSchema.extend({
  id: z.string().min(1),
});

export const researchMapRequestSchema = z.object({
  paperCards: z.array(paperCardInputSchema).min(1),
  userBackground: z.string().optional(),
});

export const fitEmailRequestSchema = z.object({
  paperCards: z.array(paperCardInputSchema).min(1),
  researchMap: researchMapLlmSchema,
  userBackground: z.string().min(1),
});
