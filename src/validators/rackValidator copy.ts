import { z } from "zod";

export const createRackValidator = z.object({
  code: z.string().min(1, "Code is required"),
});
export const updateRackValidator = z.object({
  code: z.string().min(1, "Code is required"),
});
