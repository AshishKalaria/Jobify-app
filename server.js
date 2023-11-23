import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { nanoid } from "nanoid";
dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

app.use(express.json());
app.use(morgan("dev"));

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

let jobs = [
	{ id: nanoid(), company: "apple", position: "front-end" },
	{ id: nanoid(), company: "google", position: "back-end" },
];

app.get("/api/v1/jobs", (req, res) => {
	res.status(200).json({ jobs });
});

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/", (req, res) => {
	console.log(req);

	res.json({ message: "Data received", data: req.body });
});

app.post("/api/v1/jobs", (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res.status(400).json({ msg: "please provide company and position" });
	}
	const id = nanoid(10);
	console.log(id);
	const job = { id, company, position };
	jobs.push(job);
	res.status(200).json({ job });
});

app.get("/api/v1/jobs/:id", (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		return res.status(404).json({ msg: `no job with id ${id}` });
	}
	res.status(200).json({ job });
});

app.patch("/api/v1/jobs/:id", (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res.status(400).json({ msg: "please provide company and position" });
	}
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		return res.status(404).json({ msg: `no job with id ${id}` });
	}

	job.company = company;
	job.position = position;
	res.status(200).json({ msg: "job modified", job });
});

app.delete("/api/v1/jobs/:id", (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		return res.status(404).json({ msg: `no job with id ${id}` });
	}
	const newJobs = jobs.filter((job) => job.id !== id);
	jobs = newJobs;

	res.status(200).json({ msg: "job deleted" });
});

app.listen(5100, () => {
	console.log("server running....");
});
