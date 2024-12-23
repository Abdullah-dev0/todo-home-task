"use server";

import { revalidatePath } from "next/cache";
import { TodoFormData } from "@/lib/schemas";

export async function createTodo(data: TodoFormData) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todo/addtodo`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error("Failed to create todo");
		}

		revalidatePath("/dashboard");
		return { success: true, message: "Todo created successfully" };
	} catch (error) {
		return { success: false, message: error instanceof Error ? error.message : "Failed to create todo" };
	}
}

export async function updateTodo(todoId: string, data: TodoFormData) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todo/updatetodo/${todoId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error("Failed to update todo");
		}

		revalidatePath("/dashboard");
		return { success: true, message: "Todo updated successfully" };
	} catch (error) {
		return { success: false, message: error instanceof Error ? error.message : "Failed to update todo" };
	}
}
