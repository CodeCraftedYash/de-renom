import { Router } from "express";
import { loginController, logoutController, meController, refreshController, signupController } from "./auth.controllers";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema, signupSchema } from "./auth.schema";
import { asyncHandler } from "../../utils/asyncHandler";
import { authenticate } from "../../middlewares/authenticate.middleware";


const router = Router();

router.post('/signup',validate(signupSchema),asyncHandler(signupController));
router.post('/login',validate(loginSchema),asyncHandler(loginController));
router.post('/logout',asyncHandler(logoutController));
router.post('/refresh',asyncHandler(refreshController));
router.get('/me',authenticate,asyncHandler(meController));

export default router;