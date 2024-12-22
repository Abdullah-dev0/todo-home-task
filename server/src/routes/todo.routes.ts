import { Router } from "express";
import { addTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from "../controllers/todo.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const todoRouter = Router();

todoRouter.use(authenticateUser);

todoRouter.post("/addtodo", addTodo);
todoRouter.get("/gettodos", getTodos);
todoRouter.delete("/deletetodo/:id", deleteTodo);
todoRouter.patch("/toggletodo/:id", toggleTodo);
todoRouter.put("/updatetodo/:id", updateTodo);

export default todoRouter;
