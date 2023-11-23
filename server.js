import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import "express-async-errors";
import cookieParser from "cookie-parser";
import { validateJobInput } from "./middleware/validationMiddleware.js";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import userRouter from "./routes/userRouter.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("api/v1/test", validateJobInput, (req, res) => {
	const { name } = req.body;

	res.json({ message: `hello ${name}` });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
	res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

try {
	await mongoose.connect(process.env.MONGO_URL);
	app.listen(port, () => {
		console.log(`server running on PORT ${port}....`);
	});
} catch (error) {
	console.log(error);
	process.exit(1);
}
