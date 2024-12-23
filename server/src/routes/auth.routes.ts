import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/signin", login);
router.get("/signout", logout);

export default router;
