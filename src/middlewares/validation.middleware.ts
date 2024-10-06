import express from "express";
import {BAD_REQUEST, INTERNAL_SERVER} from "../enums/code.eum.js";
import {AppError} from "../exceptions/error.app.js";
import {JSONSchemaType} from "ajv";
import { ajv } from '../validators/index.js';

export function validateBody<T>(schema: JSONSchemaType<T>) {
    return (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        try {
            const validateCreate = ajv.compile(schema);
            const result = validateCreate(req.body);
            if (!result) {
                const messages = validateCreate.errors;

                res.status(BAD_REQUEST).json(messages);
            } else {
                next();
            }
        } catch (error: unknown) {
            const message = (error as Error).message;
            next(new AppError(INTERNAL_SERVER, message));
        }
    };
}