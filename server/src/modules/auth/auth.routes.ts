import { Router } from "express";
import { loginController, logoutController, signupController } from "./auth.controllers";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema, signupSchema } from "./auth.schema";
import { refreshService } from "./auth.refresh";


const router = Router();

router.post('/signup',validate(signupSchema),signupController);
router.post('/login',validate(loginSchema),loginController);
router.post('/logout',logoutController);
router.post('/refresh',refreshService);
export default router;