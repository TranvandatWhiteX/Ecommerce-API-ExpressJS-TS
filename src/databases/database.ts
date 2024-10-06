interface IDatabase {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getConnection(): any;
}

export default IDatabase;