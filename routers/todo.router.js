import { Router } from "express";
import { addTodo, delTodo, getTodo } from "../controllers/todo.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";


export const todoRouter = Router();

todoRouter.post("/addtodo",isLoggedIn,addTodo)
todoRouter.delete("/deltodo",delTodo)
todoRouter.get("/gettodo",getTodo)
