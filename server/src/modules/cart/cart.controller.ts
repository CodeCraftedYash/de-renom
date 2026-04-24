import { Request, Response } from "express";
import {
  addToCartService,
  clearCartService,
  getCartService,
  removeCartItemService,
  updateCartItemService,
} from "./cart.service";

// GET CART
export const getCartController = async (req: Request, res: Response) => {
  const userId = req.user.id; // assumes auth middleware

  const cart = await getCartService(userId);

  return res.status(200).json({ cart });
};

// ADD TO CART
export const addToCartController = async (
  req: Request<{}, {}, { variantId: string; quantity: number }>,
  res: Response
) => {
  const userId = req.user.id;

  const item = await addToCartService({
    userId,
    variantId: req.body.variantId,
    quantity: req.body.quantity,
  });

  return res.status(200).json({
    item,
    message: "Item added to cart",
  });
};

// UPDATE ITEM
export const updateCartItemController = async (
  req: Request<{ id: string }, {}, { quantity: number }>,
  res: Response
) => {
  const item = await updateCartItemService({
    id: req.params.id,
    quantity: req.body.quantity,
  });

  return res.status(200).json({
    item,
    message: "Cart updated",
  });
};

// REMOVE ITEM
export const removeCartItemController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  await removeCartItemService(req.params.id);

  return res.status(200).json({
    message: "Item removed from cart",
  });
};

// CLEAR CART
export const clearCartController = async (req: Request, res: Response) => {
  const userId = req.user.id;

  await clearCartService(userId);

  return res.status(200).json({
    message: "Cart cleared",
  });
};