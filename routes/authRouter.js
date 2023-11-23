import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { logout } from "../controllers/authController.js";
const router = Router();
import {
	validateRegisterInput,
	validateLoginInput,
} from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
