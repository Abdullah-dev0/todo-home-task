import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface JwtPayload {
	userId: string;
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.auth_token;

		console.log(token);

		if (!token) {
			return res.status(401).json({ message: "Authentication required" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

		// also checks if its a valid session and expire

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

		// Check if session is expired (7 days)
		const sessionAge = Date.now() - new Date(session.createdAt).getTime();
		const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

		if (sessionAge > maxAge) {
			// Delete expired session
			await prisma.session.delete({
				where: {
					id: session.id,
				},
			});
			return res.status(401).json({ message: "Session expired" });
		}

		req.user = session.user;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};
