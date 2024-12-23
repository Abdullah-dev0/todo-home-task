"use server";

import { SignInFormData } from "@/lib/schemas";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

		console.log(responseData);

		if (!res.ok) {
			if (res.status === 400) {
				throw new Error(responseData.message || "Invalid credentials");
			}
			throw new Error(responseData.message || "Something went wrong");
		}
		const cookieStore = await cookies();

		cookieStore.set("auth_token", responseData.token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			expires: new Date(Date.now() + 3600 * 1000),
			path: "/",
		});

		return { status: 200, body: { message: "Signin successfully" } };
	} catch (error: any) {
		console.log("Network error occurred", error.message);
	}
};
