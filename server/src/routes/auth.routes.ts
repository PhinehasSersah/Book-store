import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/auth.controller";

const router = Router();

router.route("/register").post(registerHandler);
router.route("/login").post(loginHandler);

export default router;
