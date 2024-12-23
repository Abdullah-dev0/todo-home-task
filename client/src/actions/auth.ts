"use server";

import { SignInFormData, SignUpFormData } from "@/lib/schemas";
import { cookies } from "next/headers";

export const Login = async (data: SignInFormData) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const responseData = await res.json();

		if (!res.ok) {
			if (res.status === 400) {
				return { status: 400, body: { message: responseData.message } };
			}
			return { status: res.status, body: { message: "Failed to signin" } };
		}

		const cookieStore = await cookies();

		cookieStore.set("auth_token", responseData.token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			expires: new Date(Date.now() + 3600 * 1000 * 24 * 7),
			path: "/",
		});

		return { status: 200, body: { message: "Signin successfully" } };
	} catch (error: any) {
		console.log("Network error occurred", error.message);
	}
};

export async function signUp(data: SignUpFormData) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const responseData = await res.json();

		if (res.status !== 200) {
			return {
				success: false,
				message: responseData.message || "Something went wrong",
				status: res.status,
			};
		}

		const cookieStore = await cookies();

		cookieStore.set("auth_token", responseData.token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			expires: new Date(Date.now() + 3600 * 1000 * 24 * 7),
			path: "/",
		});

		return {
			success: true,
			message: "Signup successfully",
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Network error occurred",
		};
	}
}

export const signOut = async () => {
	const cookieStore = await cookies();

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signout`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Cookie: `auth_token=${cookieStore.get("auth_token")?.value}`,
		},
	});

	if (res.status !== 200) {
		return { status: res.status, body: { message: "Failed to signout" } };
	}
	cookieStore.delete("auth_token");
	return { status: 200, body: { message: "Signout successfully" } };
};
