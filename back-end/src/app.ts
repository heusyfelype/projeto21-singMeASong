import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import e2eTestRouter from "./routers/e2etestRouter.js";
import recommendationRouter from "./routers/recommendationRouter.js";
import dotenv from "dotenv";

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());

app.use("/recommendations", recommendationRouter);
if (process.env.MODE === "TEST") {
    console.log(".........:::::::::: TESTS DATABASE RUNNING ::::::::::.........")
    app.use("/recommendations", e2eTestRouter)
}
app.use(errorHandlerMiddleware);

export default app;
