import IDatabase from "./database.js";
import MongoDBConnection from "./init.mongodb.js";
import DatabaseEnum from "../enums/database.enum.js";

class DatabaseFactory {
    static createDatabase(type: string): IDatabase {
        switch (type) {
            case DatabaseEnum.MONGODB:
                return MongoDBConnection.getInstance();
            default:
                throw new Error('Unsupported database type');
        }
    }
}

export default DatabaseFactory;