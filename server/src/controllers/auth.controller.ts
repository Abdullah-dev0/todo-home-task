import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/PrismaClient";
import { signInSchema, signUpSchema } from "../lib/schema/schema";

export const signup = async (req: Request, res: Response) => {
	try {
		const result = signUpSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Validation failed",
				errors: result.error.flatten().fieldErrors,
			});
		}

		const { email, password, name } = result.data;

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

		res.json({ message: "Signup  successful", user: { user } });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		// Validate request body
		const result = signInSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Validation failed",
				errors: result.error.flatten().fieldErrors,
			});
		}

		const { email, password } = result.data;

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
			secure: process.env.NODE_ENV === "production", // true in production
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			path: "/",
		});

		res.json({ message: "Login  successful", user: { user } });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		const token = req.cookies.auth_token;

		await prisma.session.deleteMany({ where: { token } });
		// clear all cookies
		res.clearCookie("auth_token");
		res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};
