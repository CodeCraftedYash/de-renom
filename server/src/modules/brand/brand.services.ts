import { prisma } from "../../db/prisma";
import { appError } from "../../utils/appError";

// GET ALL
export const getAllBrandService = async () => {
  return await prisma.brand.findMany({
    include: { products: true }, // optional
  });
};

// CREATE
export const createBrandService = async (name: string) => {
  if (!name || name.trim() === "") {
    throw new appError("Name is required", 400);
  }

  const existing = await prisma.brand.findFirst({
    where: { name: { equals: name, mode: "insensitive" } },
  });

  if (existing) throw new appError("Brand already exists", 409);

  return prisma.brand.create({
    data: { name },
  });
};

// DELETE
export const deleteBrandService = async (id: string) => {
  if (!id) throw new appError("Invalid id", 400);

  return prisma.brand.delete({
    where: { id },
  });
};

// RENAME
export const renameBrandService = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  if (!id) throw new appError("Invalid id", 400);

  if (!name || name.trim() === "") {
    throw new appError("Name is required", 400);
  }

  const existing = await prisma.brand.findFirst({
    where: {
      name: { equals: name, mode: "insensitive" },
      NOT: { id },
    },
  });

  if (existing) {
    throw new appError("Brand already exists", 409);
  }

  return prisma.brand.update({
    where: { id },
    data: { name },
  });
};