import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
	try {
		const { email, password, name } = req.body;

		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

		await prisma.session.create({
			data: {
				userId: user.id,
				token,
			},
		});

		res.cookie("auth_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // true in production
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			path: "/",
		});

		res.json({ message: "Signup  successful" });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

		await prisma.session.create({
			data: {
				userId: user.id,
				token,
			},
		});
		res.cookie("auth_token", token, {
			httpOnly: true,
			secure: true, // Always true in production
			sameSite: "none", // Required for cross-domain cookies
			domain: process.env.COOKIE_DOMAIN, // e.g., '.yourdomain.com'
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: "/",
		});

		res.json({ message: "Login  successful" });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		const token = req.cookies.auth_token;

		await prisma.session.deleteMany({ where: { token } });

		res.clearCookie("auth_token");
		res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};
