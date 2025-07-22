import { z } from "zod";

export const createProductValidator = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  categoryId: z.number().optional(),
  unitId: z.number().optional(),
  stock: z.number(),
  image: z
    .any()
    .optional()
    .transform((file) => {
      // Bisa File langsung atau FileList
      if (file instanceof File) return file;
      if (file instanceof FileList) return file.item(0);
      return undefined;
    })
    .refine((file) => !file || file.size > 0, {
      message: "Image file is required",
    }),
});
export const updateProductValidator = z.object({
   code: z.string().min(1, "Code is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be a positive number"),
    categoryId: z.number().min(1, "Category is required"),
    unitId: z.number().min(1, "Unit is required"),
    stock: z.number().min(0, "Stock must be a non-negative number"),
});
