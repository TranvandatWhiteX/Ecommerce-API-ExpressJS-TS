import express, { NextFunction, Request, Response } from "express";
import {handleError} from "../exceptions/error.handler.js";
import morgan from 'morgan';
import path from "path";
import helmet from "helmet";
import compression from "compression";
import router from "../routes/index.route.js";
import env from "../configs/config.properties.js";

export default (app: express.Application) => {
    app.use((req, res, next) => {
        const origin = req.headers.origin || '';

        if (env.app.cors.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.header(
            'Access-Control-Allow-Methods',
            'GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE',
        );
        res.header(
            'Access-Control-Allow-Headers',
            `Content-Type, Origin, X-Requested-With, Accept, Authorization, access-token, X-Access-Token`,
        );
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('preflightContinue', 'false');

        if (req.method === 'OPTIONS') {
            res.send(200);
        } else {
            next();
        }
    });

    app.use(
        morgan('dev', {
            skip: (req, res) => {
                return res.statusCode < 400;
            },
            stream: process.stderr,
        }),
    );

    app.use(compression());

    app.use(
        morgan('dev', {
            skip: (req, res) => {
                return res.statusCode >= 400;
            },
            stream: process.stdout,
        }),
    );

    const staticOptions = {
        setHeaders: (res: Response) => {
            res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        },
    };

    app.use(
        helmet(),
        express.json({ limit: '5mb' }),
        express.urlencoded({ extended: true }),
        express.static(path.join(process.cwd(), 'uploads'), staticOptions),
    );

    app.use("/ecommerce/v1", router);

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        res.status(400).send('not found');
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        handleError(err, req, res, next);
    });
}