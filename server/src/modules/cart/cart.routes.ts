import { Router } from "express";
import {
  addToCartController,
  clearCartController,
  getCartController,
  removeCartItemController,
  updateCartItemController,
} from "./cart.controller";
import { authenticate } from "../../middlewares/authenticate.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// GET USER CART
router.get("/", authenticate, asyncHandler(getCartController));

// ADD ITEM
router.post("/", authenticate, asyncHandler(addToCartController));

// UPDATE ITEM QUANTITY
router.patch("/:id", authenticate, asyncHandler(updateCartItemController));

// REMOVE ITEM
router.delete("/:id", authenticate, asyncHandler(removeCartItemController));

// CLEAR CART
router.delete("/", authenticate, asyncHandler(clearCartController));

export default router;
