import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const signUpSchema = z
	.object({
		name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
		email: z.string().email({ message: "Invalid email address" }),
		password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const todoSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters").max(50, "Title must be less than 50 characters"),
	description: z
		.string()
		.min(5, "Description must be at least 5 characters")
		.max(200, "Description must be less than 200 characters"),
});

export type TodoFormData = z.infer<typeof todoSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
