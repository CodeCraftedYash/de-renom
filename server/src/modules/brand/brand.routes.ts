import { Router } from "express";
import {
  createBrandController,
  deleteBrandController,
  renameBrandController,
} from "./brand.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { authenticate } from "../../middlewares/authenticate.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { Role } from "../../generated/enums";

const router = Router();

// CREATE
router.post("/",authenticate,authorize(Role.ADMIN),asyncHandler(createBrandController));

// UPDATE (rename)
router.patch("/:id",authenticate,authorize(Role.ADMIN),asyncHandler(renameBrandController));

// DELETE
router.delete("/:id",authenticate,authorize(Role.ADMIN),asyncHandler(deleteBrandController));

export default router;