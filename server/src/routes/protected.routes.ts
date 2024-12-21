import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { prisma } from "../lib/PrismaClient";
const userRouter = Router();

// Protected route example
userRouter.get("/profile", authenticateUser, async (req, res) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 4000));
		const user = await prisma.user.findUnique({
			where: { id: req?.user?.id },
			select: {
				id: true,
				email: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});
		res.status(200).json({ user: user });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
});

export default userRouter;
