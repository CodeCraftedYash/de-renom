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
    try {
    return await prisma.category.delete({
      where: { id },
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      throw new appError("Category not found", 404);
    }
    throw err;
  }
};

export const renameCategoryService = async (id:string,name:string) => {
     if (!name || name.trim() === "") {
    throw new appError("Name is required", 400);
  }
    const update = await prisma.category.update({
        where:{id},
        data:{name}
    });
    
    if(!update)
        throw new appError("Update not found",404);
    
    return update
};
