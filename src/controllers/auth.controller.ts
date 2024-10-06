import {NextFunction, Request, Response} from "express";
import {AuthService} from "../services/auth.service.js";

export class AuthController {
    signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(201).send(await AuthService.signUp(req.body));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}