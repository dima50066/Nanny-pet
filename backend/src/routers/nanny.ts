import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import {
  createNannyController,
  getNanniesController,
  updateNannyController,
  deleteNannyController,
  getMyNannyController,
  addToFavoritesController,
  removeFromFavoritesController,
  getFavoritesController,
} from "../controllers/nanny";
import { validateBody } from "../middlewares/validateBody";
import { nannySchema, updateNannySchema } from "../validation/nanny";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post(
  "/",
  authenticate,
  validateBody(nannySchema),
  ctrlWrapper(createNannyController)
);

router.get("/", authenticate, ctrlWrapper(getNanniesController));

router.get("/me", authenticate, ctrlWrapper(getMyNannyController));

router.patch(
  "/",
  authenticate,
  validateBody(updateNannySchema),
  ctrlWrapper(updateNannyController)
);

router.delete("/", authenticate, ctrlWrapper(deleteNannyController));

router.post("/favorites", authenticate, ctrlWrapper(addToFavoritesController));

router.delete(
  "/favorites",
  authenticate,
  ctrlWrapper(removeFromFavoritesController)
);

router.get("/favorites", authenticate, ctrlWrapper(getFavoritesController));

export default router;
