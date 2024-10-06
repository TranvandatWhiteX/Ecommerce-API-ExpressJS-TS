import dotenv from "dotenv";
dotenv.config();

const development = {
    app: {
        port: process.env.DEV_APP_PORT,
        cors: process.env.CORS?.split(',') || '*',
    },
    database: {
        host: process.env.DEV_DATABASE_HOST,
        name: process.env.DEV_DATABASE_NAME,
        port: process.env.DEV_DATABASE_PORT,
    }
}

const production = {
    app: {
        port: process.env.PRO_PORT
    },
    database: {
        host: process.env.PRO_DATABASE_HOST,
        name: process.env.PRO_DATABASE_NAME,
        port: process.env.PRO_DATABASE_PORT,
    }
}

const environment_properties = {development, production}
const environment = process.env.NODE_ENV || 'development';

export default environment_properties[environment];

