import { prisma } from "../lib/PrismaClient";

export const addTodo = async (req: Request, res: Response) => {
	try {
		const { title } = req.body;
		const userId = req?.user?.id;

		const todo = await prisma.todo.create({
			data: {
				title,
				completed: false,
				description: "",

				userId: req?.user?.id,
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

export const deleteTodo = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;
		const userId = req?.user?.id;

		await prisma.todo.delete({
			where: {
				id,
			},
		});
		res.status(200).json({ message: "Todo deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};
