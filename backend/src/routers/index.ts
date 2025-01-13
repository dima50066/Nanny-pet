import { Router } from "express";
import authRouter from "./auth";
import nannyRouter from "./nanny";
import appointmentRouter from "./appointment";

const router = Router();
router.use("/auth", authRouter);
router.use("/nanny", nannyRouter);
router.use("/appointments", appointmentRouter);

export default router;
