import { prisma } from "../lib/PrismaClient";
import { Request, Response } from "express";

export const addTodo = async (req: Request, res: Response) => {
	try {
		const { title, description } = req.body;

		const userId = req!.user!.id;

		const todo = await prisma.todo.create({
			data: {
				title,
				completed: false,
				description,
				userId: userId,
			},
		});
		res.status(201).json({ todo });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const getTodos = async (req: Request, res: Response) => {
	try {
		const userId = req?.user?.id;

		const todos = await prisma.todo.findMany({
			where: {
				userId,
			},
		});
		res.status(200).json({ todos });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};
export const deleteTodo = async (req: Request, res: Response) => {
	try {
		const { id } = req.params; // Change to params instead of body
		const userId = req?.user?.id;

		// First check if todo exists and belongs to user
		const todo = await prisma.todo.findFirst({
			where: {
				id,
				userId,
			},
		});

		if (!todo) {
			return res.status(404).json({ message: "Todo not found or unauthorized" });
		}

		// Delete the todo
		await prisma.todo.delete({
			where: {
				id,
			},
		});

		return res.status(200).json({ message: "Todo deleted successfully" });
	} catch (error: any) {
		console.error("Delete todo error:", error);
		return res.status(500).json({ message: error.message });
	}
};

export const toggleTodo = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = req?.user?.id;

		const todo = await prisma.todo.findFirst({
			where: {
				id,
				userId,
			},
		});

		if (!todo) {
			return res.status(404).json({ message: "Todo not found" });
		}

		const currentState = todo.completed;

		const updateTodo = await prisma.todo.update({
			where: {
				id,
			},
			data: {
				completed: !currentState,
			},
		});
		res.status(200).json({ message: "Todo Completed successfully" });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

// todo this is the updateTodo function and not implemented yet

export const updateTodo = async (req: Request, res: Response) => {
	try {
		const { id, title, description, completed } = req.body;
		const userId = req?.user?.id;

		const todo = await prisma.todo.update({
			where: {
				id,
			},
			data: {
				title,
				description,
				completed,
			},
		});
		res.status(200).json({ todo });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};
