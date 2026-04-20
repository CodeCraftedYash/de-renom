import { Request, Response } from "express";
import {
  createCategoryService,
  deleteCategoryService,
  renameCategoryService,
} from "./category.service";

// CREATE
export const createCategoryController = async (req: Request, res: Response) => {
  const result = await createCategoryService(req.body.name);

  return res.status(201).json({
    category: result.name,
    message: "Category created successfully",
  });
};

// DELETE
export const deleteCategoryController = async (req: Request<{id:string}>, res: Response) => {
  const result = await deleteCategoryService(req.params.id);

  return res.status(200).json({
    category: result.name,
    message: "Category deleted successfully",
  });
};

interface RenameCategoryInput {
  id: string;
  name: string;
}

// RENAME
export const renameCategoryController = async (req: Request<RenameCategoryInput>, res: Response) => {
  const result = await renameCategoryService({
    id: req.params.id,
    name: req.body.name,
    });

  return res.status(200).json({
    category: result.name,
    message: "Category renamed successfully",
  });
};