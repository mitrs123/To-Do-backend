import express from "express";
import { authRouter } from "./routers/auth.router.js";
import { connectDB } from "./configs/db.config.js";

const app = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for database connection
connectDB();


app.use("/",authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });