import { prisma } from "../../db/prisma";
import { appError } from "../../utils/appError";

// GET USER CART
export const getCartService = async (userId: string) => {
  if (!userId) throw new appError("Invalid user", 400);

  return prisma.cartItem.findMany({
    where: { userId },
    include: {
      variant: true, // include product variant details
    },
    orderBy: { createdAt: "desc" },
  });
};

// ADD TO CART
export const addToCartService = async ({
  userId,
  variantId,
  quantity,
}: {
  userId: string;
  variantId: string;
  quantity: number;
}) => {
  if (!userId || !variantId) {
    throw new appError("Invalid data", 400);
  }

  if (quantity <= 0) {
    throw new appError("Quantity must be greater than 0", 400);
  }

  // check existing (due to @@unique)
  const existing = await prisma.cartItem.findUnique({
    where: {
      userId_variantId: {
        userId,
        variantId,
      },
    },
  });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: {
        quantity: existing.quantity + quantity,
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      userId,
      variantId,
      quantity,
    },
  });
};

// UPDATE QUANTITY
export const updateCartItemService = async ({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) => {
  if (!id) throw new appError("Invalid id", 400);

  if (quantity <= 0) {
    // delete if quantity becomes 0
    return prisma.cartItem.delete({
      where: { id },
    });
  }

  return prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });
};

// REMOVE ITEM
export const removeCartItemService = async (id: string) => {
  if (!id) throw new appError("Invalid id", 400);

  return prisma.cartItem.delete({
    where: { id },
  });
};

// CLEAR CART
export const clearCartService = async (userId: string) => {
  if (!userId) throw new appError("Invalid user", 400);

  return prisma.cartItem.deleteMany({
    where: { userId },
  });
};