import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import "express-async-errors";
import { validateJobInput } from "./middleware/validationMiddleware.js";
import jobRouter from "./routes/jobRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

app.use(express.json());
app.use(morgan("dev"));

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/", (req, res) => {
	console.log(req);

	res.json({ message: "Data received", data: req.body });
});

app.post("api/v1/test", validateJobInput, (req, res) => {
	const { name } = req.body;

	res.json({ message: `hello ${name}` });
});

app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/jobs/:id", jobRouter);

app.use("*", (req, res) => {
	res.status(404).json({ msg: "not found" });
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ msg: "something went wrong" });
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
