import { Router } from "express";
import {AuthController} from "../controllers/auth.controller.js";


const authRouter = Router();
const authController = new AuthController();

// @ts-ignore
authRouter.post('/signup', authController.signUp);

export default authRouter;