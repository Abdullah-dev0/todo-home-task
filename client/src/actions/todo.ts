"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { TodoFormData } from "@/lib/schemas";
import { cookies } from "next/headers";

export async function createTodo(data: TodoFormData) {
	const authToken = (await cookies()).get("auth_token");
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todo/addtodo`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Cookie: `auth_token=${authToken?.value}` },
			credentials: "include",

			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error("Failed to create todo");
		}

		revalidateTag("todos");
		return { success: true, message: "Todo created successfully" };
	} catch (error) {
		return { success: false, message: error instanceof Error ? error.message : "Failed to create todo" };
	}
}

export async function updateTodo(todoId: string, data: TodoFormData) {
	const authToken = (await cookies()).get("auth_token");

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todo/updatetodo/${todoId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Cookie: `auth_token=${authToken?.value}` },
			credentials: "include",
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error("Failed to update todo");
		}

		revalidateTag("todos");
		return { success: true, message: "Todo updated successfully" };
	} catch (error) {
		return { success: false, message: error instanceof Error ? error.message : "Failed to update todo" };
	}
}

export async function toggleTodo(id: string) {
	const authToken = (await cookies()).get("auth_token");

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todo/toggletodo/${id}`, {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Cookie: `auth_token=${authToken?.value}`,
			},
		});

		if (!res.ok) {
			throw new Error("Failed to toggle todo");
		}

		revalidateTag("todos");
		return { success: true, message: "Todo updated successfully" };
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Failed to toggle todo",
		};
	}
}

export async function deleteTodo(id: string) {
	const authToken = (await cookies()).get("auth_token");

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todo/deletetodo/${id}`, {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Cookie: `auth_token=${authToken?.value}`,
			},
		});

		if (!res.ok) {
			throw new Error("Failed to delete todo");
		}

		revalidateTag("todos");

		return { success: true, message: "Todo deleted successfully" };
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Failed to delete todo",
		};
	}
}
