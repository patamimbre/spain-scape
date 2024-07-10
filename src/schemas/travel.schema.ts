import { LocationImage } from '@/lib/images/types';
import { z } from "zod";

export const travelSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  location: z.string(),
});

export type Travel = z.infer<typeof travelSchema>
export type TravelWithImages = Travel & { images: LocationImage[] }