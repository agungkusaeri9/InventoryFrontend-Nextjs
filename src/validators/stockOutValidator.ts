import { z } from "zod";

export const updateStockOutValidator = z.object({
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .min(0, "Quantity must be at least 0")
    .optional()
    .nullable(),
});
