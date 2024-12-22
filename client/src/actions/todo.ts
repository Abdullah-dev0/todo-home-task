"use server";
import { TodoFormData } from "@/lib/schemas";
import { toast } from "sonner";

export const addTodo = async (data: TodoFormData) => {
	try {
		const response = await fetch("http://localhost:3001/api/todo/addtodo", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error("Failed to create todo");
		}

		toast.success("Todo created successfully");
	} catch (error) {
		toast.error("Failed to create todo");
	}
};
