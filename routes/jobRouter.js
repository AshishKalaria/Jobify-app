import { Router } from "express";
const router = Router();
import {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
	showStats,
} from "../controllers/jobController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
import {
	validateJobInput,
	validateIdParam,
} from "../middleware/validationMiddleware.js";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router.route("/stats").get(showStats);
router
	.route("/:id")
	.get(validateIdParam, getJob)
	.patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
	.delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
