import express from 'express';
import ExpressLoader from "./loaders/express.loader.js";
import DatabaseLoader from "./loaders/database.loader.js";

const app = express();
// Init Middleware, Loader
ExpressLoader(app);
// Init DB
DatabaseLoader()
    .then(_ => console.log("Database loaded."))
    .catch((err) => {
        console.error(err.message);
    });
export default app;