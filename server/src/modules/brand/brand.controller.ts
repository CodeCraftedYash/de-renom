import { Request, Response } from "express";
import {
  createBrandService,
  deleteBrandService,
  renameBrandService,
} from "./brand.services";

// CREATE
export const createBrandController = async (req: Request, res: Response) => {
  const result = await createBrandService(req.body.name);

  return res.status(201).json({
    brand: result.name,
    message: "Brand created successfully",
  });
};

// DELETE
export const deleteBrandController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const result = await deleteBrandService(req.params.id);

  return res.status(200).json({
    brand: result.name,
    message: "Brand deleted successfully",
  });
};

interface RenameBrandInput {
  id: string;
  name: string;
}

// RENAME
export const renameBrandController = async (
  req: Request<RenameBrandInput>,
  res: Response
) => {
  const result = await renameBrandService({
    id: req.params.id,
    name: req.body.name,
  });

  return res.status(200).json({
    brand: result.name,
    message: "Brand renamed successfully",
  });
};