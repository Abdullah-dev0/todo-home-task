"use server";

import { signInSchema, signUpSchema, SignInFormData, SignUpFormData } from "@/lib/schemas";
import { cookies } from "next/headers";

interface SignUpResponse {
	success: boolean;
	message?: string;
	errors?: {
		email?: string[];
		password?: string[];
		name?: string[];
	};
}

export async function signIn(data: SignInFormData) {
	const result = signInSchema.safeParse(data);

	if (!result.success) {
		return { success: false, errors: result.error.flatten().fieldErrors };
	}

	// Here you would typically verify the user's credentials
	// For this example, we'll just simulate a successful sign-in
	await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network request

	return { success: true, message: "Signed in successfully!" };
}

export async function signUp(data: SignUpFormData): Promise<SignUpResponse> {
	const result = signUpSchema.safeParse(data);

	if (!result.success) {
		return {
			success: false,
			errors: result.error.flatten().fieldErrors,
		};
	}

	try {
		const res = await fetch("http://localhost:3001/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const responseData = await res.json();

		if (res.status === 201 && responseData.token) {
			// Set HTTP-only cookie
			(
				await // Set HTTP-only cookie
				cookies()
			).set("auth_token", responseData.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 7 * 24 * 60 * 60, // 7 days
				path: "/",
			});

			return {
				success: true,
				message: "Account created successfully!",
			};
		}

		if (!res.ok) {
			if (res.status === 400 && responseData.message === "User already exists") {
				return {
					success: false,
					errors: {
						email: ["This email is already registered"],
					},
				};
			}

			return {
				success: false,
				message: responseData.message || "Something went wrong",
			};
		}

		return {
			success: true,
			message: responseData,
		};
	} catch (error) {
		return {
			success: false,
			message: "Network error. Please try again later.",
		};
	}
}
