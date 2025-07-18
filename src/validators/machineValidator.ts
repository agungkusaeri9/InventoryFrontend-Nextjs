import { z } from "zod";

export const createMachineValidator = z.object({
  code: z.string().min(1, "Code is required"),
});

export const updateMachineValidator = z.object({
  code: z.string().min(1, "Code is required"),
}); 