import { Router } from "express";
import authRouter from '../modules/auth/auth.routes';
import { globalErrorHandler } from "../middlewares/globalErrorHandler.middleware";

const router = Router();

router.use("/auth",authRouter);
router.use(globalErrorHandler);
export default router;