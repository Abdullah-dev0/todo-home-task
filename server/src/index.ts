import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import userRouter from "./routes/protected.routes";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
	res.json({ message: "Server is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something broke!" });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});