import { z } from "zod";

export const createSupplierValidator = z.object({
  name: z.string().min(1, "Name is required")
});

export const updateSupplierValidator = z.object({
  name: z.string().min(1, "Name is required")
});
