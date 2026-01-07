import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  code: z.string().min(1, "Product code is required"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  description: z.string().optional(),
  imageUrl: z.string().optional(), // We'll just use text URL for now
  status: z.enum(["active", "draft", "inactive"]).default("active"),
});

export type ProductFormValues = z.infer<typeof productSchema>;