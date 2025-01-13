import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import {
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
} from "../controllers/appointment";
import { validateBody } from "../middlewares/validateBody";
import {
  appointmentSchema,
  updateAppointmentSchema,
} from "../validation/appointment";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post(
  "/",
  authenticate,
  validateBody(appointmentSchema),
  ctrlWrapper(createAppointmentController)
);

router.patch(
  "/:id",
  authenticate,
  validateBody(updateAppointmentSchema),
  ctrlWrapper(updateAppointmentController)
);

router.delete("/:id", authenticate, ctrlWrapper(deleteAppointmentController));

export default router;
