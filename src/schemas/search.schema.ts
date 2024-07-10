import { z } from "zod";
import { travelSchema } from "./travel.schema";

export const searchInputSchema = z.object({
  query: z.string(),
})

export const searchOutputSchema = z.object({
  results: z.array(travelSchema),
})

export type SearchInput = z.infer<typeof searchInputSchema>
export type SearchOutput = z.infer<typeof searchOutputSchema>