import Todo from "../models/todo.model.js";
import { sendRes } from "../utils/response.utils.js";
import AppError from "../utils/error.utils.js";
export const addTodo = async (req, res, next) => {
  const { title, description } = req.body;
  const userId = req.body.user._id;
  try {
    if (req.body._id) {
      const updateUser = async (todoId, updateData) => {
       await Todo.findByIdAndUpdate(todoId, updateData);
      };
      updateUser(req.body._id,{ title: title, description:description})
        return sendRes(res, 200, { message: `update todo succesfully and update in ${req.body._id}` });
    } else {
      const newTodo = await Todo.create({
        title,
        description,
        userId,
      });
      return sendRes(res, 200, { message: "add todo successfully","Add":newTodo });
    }
  } catch (error) {
    console.log(error);
    next(new AppError("i'm in addTodo's catch", 500));
  }
};

export const delTodo = async (req,res,next) => {
  try{
   const todoId = req.body._id;
   await Todo.findByIdAndDelete(todoId)
   return sendRes(res, 200, { message: `delete todo successfully id:${todoId}` });
  } 
  catch (error) {
  console.log(error);
  next(new AppError("i'm in delTodo's catch", 500));
}
};

export const getTodo = async (req,res,next) => {
  try{
   const todoId = req.body._id;
   const todo =await Todo.findById(todoId)
   return sendRes(res,200,{todo})
  } 
  catch (error) {
  console.log(error);
  next(new AppError("i'm in getTodo's catch", 500));
}
};