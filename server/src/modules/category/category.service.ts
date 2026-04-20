import slugify from "slugify";
import { prisma } from "../../db/prisma";
import { appError } from "../../utils/appError";

export const getAllCategoryService = async () => {
  return await prisma.category.findMany();
};

export const createCategoryService = async (name: string) => {
  if (!name || name.trim() === "") {
    throw new appError("Name is required", 400);
  }

  const slug = slugify(name, { lower: true, strict: true });

  const existing = await prisma.category.findUnique({
    where: { slug },
  });

  if (existing) throw new appError("Category already exists", 409);

  return prisma.category.create({
    data: { name, slug },
  });
};

export const deleteCategoryService = async (id: string) => {
  if (!id) throw new appError("Invalid id", 400);

  return prisma.category.delete({
    where: { id },
  });
};

export const renameCategoryService = async ({
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

  const slug = slugify(name, { lower: true, strict: true });

  // prevent duplicate slug
  const existing = await prisma.category.findUnique({
    where: { slug },
  });

  if (existing && existing.id !== id) {
    throw new appError("Category already exists", 409);
  }

  return prisma.category.update({
    where: { id },
    data: { name, slug },
  });
};