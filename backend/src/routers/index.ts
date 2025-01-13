import { Router } from "express";
import authRouter from "./auth";
import nannyRouter from "./nanny";

const router = Router();
router.use("/auth", authRouter);
router.use("/nanny", nannyRouter);

export default router;
