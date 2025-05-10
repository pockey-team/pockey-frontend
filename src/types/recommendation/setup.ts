import { z } from "zod";

export const recommendationSetupFormSchema = z.object({
  name: z.string(),
  gender: z.string(),
  age: z.string(),
  relation: z.string(),
  priceRange: z.string(),
});

export type RecommendationSetupFormData = z.infer<
  typeof recommendationSetupFormSchema
>;
