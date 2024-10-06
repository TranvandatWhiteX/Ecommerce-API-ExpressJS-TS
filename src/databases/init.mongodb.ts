import IDatabase from "./database.js";
import env from "../configs/config.properties.js"

class MongoDBConnection implements IDatabase {
    private static instance: MongoDBConnection | null = null;
    private connection: any = null;

    private constructor() {}

    public static getInstance(): MongoDBConnection {
        if (!MongoDBConnection.instance) {
            MongoDBConnection.instance = new MongoDBConnection();
        }
        return MongoDBConnection.instance;
    }

    async connect(): Promise<void> {
        if (!this.connection) {
            const mongoose = await import('mongoose');
            const host = env.database.host;
            const port = env.database.port;
            const name = env.database.name;
            await mongoose.connect(`mongodb://${host}:${port}/${name}`);
            this.connection = mongoose.connection;
            console.log('Connected to MongoDB');
        }
    }

    async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
            console.log('Disconnected from MongoDB');
        }
    }

    getConnection() {
        return this.connection;
    }
}

export default MongoDBConnection;
