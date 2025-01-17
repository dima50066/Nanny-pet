import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types";
import {
  createNannyProfile,
  getNannyProfileByUserId,
  updateNannyProfile,
  deleteNannyProfile,
  getFilteredNannies,
} from "../services/nanny";
import { UsersCollection } from "../db/models/user";
import { NanniesCollection } from "../db/models/nanny";
import createHttpError from "http-errors";

export const createNannyController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const nanny = await createNannyProfile({ ...req.body, userId });
    res.status(201).json({
      status: 201,
      message: "Nanny profile created successfully!",
      data: nanny,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyNannyController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const nanny = await getNannyProfileByUserId(userId.toString());
    res.json({
      status: 200,
      message: "Nanny profile fetched successfully!",
      data: nanny,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNannyController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const updates = req.body;
    const nanny = await updateNannyProfile(userId.toString(), updates);
    res.json({
      status: 200,
      message: "Nanny profile updated successfully!",
      data: nanny,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNannyController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    await deleteNannyProfile(userId.toString());
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getNanniesController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nannies, totalCount } = await getFilteredNannies(req.query);

    res.json({
      status: 200,
      message: "Nannies fetched successfully!",
      data: {
        nannies,
        totalPages: Math.ceil(totalCount / 3),
        currentPage: Number(req.query.page || 1),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addToFavoritesController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const { nannyId } = req.body;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const nanny = await NanniesCollection.findById(nannyId);
    if (!nanny) {
      throw createHttpError(404, "Nanny not found");
    }

    const user = await UsersCollection.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: nannyId } },
      { new: true }
    ).populate("favorites");

    res.json({
      status: 200,
      message: "Nanny added to favorites!",
      data: user?.favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromFavoritesController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const { nannyId } = req.body;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await UsersCollection.findByIdAndUpdate(
      userId,
      { $pull: { favorites: nannyId } },
      { new: true }
    ).populate("favorites");

    res.json({
      status: 200,
      message: "Nanny removed from favorites!",
      data: user?.favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const getFavoritesController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await UsersCollection.findById(userId).populate("favorites");

    res.json({
      status: 200,
      message: "Favorites fetched successfully!",
      data: user?.favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const getNannyByIdController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const nanny = await NanniesCollection.findById(id);
    if (!nanny) {
      throw createHttpError(404, "Nanny not found");
    }

    res.json({
      status: 200,
      message: "Nanny fetched successfully!",
      data: nanny,
    });
  } catch (error) {
    next(error);
  }
};
