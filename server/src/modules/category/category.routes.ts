import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  renameCategoryController,
} from "./category.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// CREATE
router.post("/", asyncHandler (createCategoryController));

// DELETE
router.delete("/:id", asyncHandler (deleteCategoryController));

// RENAME (update)
router.patch("/:id", asyncHandler (renameCategoryController));

export default router;