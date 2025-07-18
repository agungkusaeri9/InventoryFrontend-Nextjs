import { z } from "zod";

export const createMakerValidator = z.object({
  name: z.string().min(1, "Name is required")
});

export const updateMakerValidator = z.object({
  name: z.string().min(1, "Name is required")
});
