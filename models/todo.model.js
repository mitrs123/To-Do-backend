import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    userid: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    isCheck: {
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);

export default Todo;
