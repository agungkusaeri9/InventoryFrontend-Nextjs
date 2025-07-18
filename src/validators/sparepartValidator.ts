import { z } from "zod";

export const createPartValidator = z.object({
  code: z.string().min(1, "Code is required"),
  balance: z.string().min(1, "Balance is required"),
  description: z.string().min(1, "Description Quantity is required"),
  max_quantity: z.number().min(1, "Max Qty is required"),
  min_quantity: z.number().min(1, "Min Qty is required"),
  specification: z.string().min(1, "Specification is required")
});

export const updatePartValidator = z.object({
    code: z.string().min(1, "Code is required"),
  balance: z.string().min(1, "Balance is required"),
  description: z.string().min(1, "Description Quantity is required"),
  max_quantity: z.number().min(1, "Max Qty is required"),
  min_quantity: z.number().min(1, "Min Qty is required"),
  specification: z.string().min(1, "Specification is required")
});
