import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { PrismaClient } from "@prisma/client";

const userRouter = Router();
const prisma = new PrismaClient();

// Protected route example
userRouter.get("/profile", authenticateUser, async (req, res) => {
	try {
		await prisma.user.findUnique({ where: { id: req?.user?.id } });
		res.json({ user: req.user });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
});

export default userRouter;
