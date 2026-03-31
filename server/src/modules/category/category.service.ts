import slugify from "slugify"
import { prisma } from "../../db/prisma"
import { appError } from "../../utils/appError"


export const getAllCategoryService = async () => {
    return await prisma.category.findMany()
}

export const createCategoryService = async ( name:string ) => {
    const slug = slugify(name,{lower:true,strict:true});
    
    const existing = await prisma.category.findUnique({
        where : { slug }
    })

    if(existing) throw new appError("category already exists",409)

    return prisma.category.create({
        data:{ name, slug }
    });
};

export const deleteCategoryService = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new appError("Category not found", 404);

  await prisma.category.delete({ where: { id } });
};
