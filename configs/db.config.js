import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect("mongodb://localhost/todo");
};

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("connect to MongoDB");
});

db.on("disconnected", () => {
  console.log("Dissconnected from MongoDB");
});
