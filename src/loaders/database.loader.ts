import DatabaseFactory from "../databases/database.factory.js";

export default async () => {
    const dbType = 'mongodb';
    const database = DatabaseFactory.createDatabase(dbType);
    await database.connect();
};