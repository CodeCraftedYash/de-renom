import { Router } from "express";
import { loginController, logoutController, signupController } from "./auth.controllers";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema, signupSchema } from "./auth.schema";
import { refreshService } from "./auth.refresh";
import { asyncHandler } from "../../utils/asyncHandler";


const router = Router();

router.post('/signup',validate(signupSchema),asyncHandler(signupController));
router.post('/login',validate(loginSchema),asyncHandler(loginController));
router.post('/logout',asyncHandler(logoutController));
router.post('/refresh',refreshService);
export default router;