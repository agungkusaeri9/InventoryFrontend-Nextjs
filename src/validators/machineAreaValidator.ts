import { z } from "zod";

export const machineAreaValidator = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required")
});
