import { Router } from "express";
import authRouter from "./auth.route.js";
import shopRouter from "./shop.route.js";

const router = Router();
router.use("/auth", authRouter)
router.use("/shop", shopRouter)
export default router;