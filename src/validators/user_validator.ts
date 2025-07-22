import { z } from "zod";

export const createUserValidator = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  role: z.number()
});
export const updateUserValidator = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required"),
    password: z.string().optional(),
    role:z.number()
});
