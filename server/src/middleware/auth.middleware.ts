import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface JwtPayload {
	userId: string;
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log("All cookies:", req.cookies); // Add this line

		const token = req.cookies.auth_token;

		console.log(token, "this is token");

		if (!token) {
			return res.status(401).json({ message: "Authentication required" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

		console.log(decoded, "this is decoded");

		const session = await prisma.session.findFirst({
			where: {
				token,
				userId: decoded.userId,
			},
			include: {
				user: true,
			},
		});

		if (!session) {
			return res.status(401).json({ message: "Invalid session" });
		}

		req.user = session.user;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};
