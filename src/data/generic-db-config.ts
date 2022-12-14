import mysql from 'mysql2';

export abstract class GenericConfigDB {
    private readonly _host: string;
    private readonly _user: string;
    private readonly _password: string;
    private readonly _database: string;

    public get Host(): string {
        return this._host;
    }
    
    public get User(): string {
        return this._user;
    }

    public get Password(): string {
        return this._password;
    }

    public get Database(): string {
        return this._database;
    }

    constructor(host: string, user: string, password: string, database: string) {
        this._host = host;
        this._user = user;
        this._password = password;
        this._database = database;
    }

    initializeConfigurations(): mysql.Connection {
        var connection = mysql.createConnection({
            host: this._host,
            user: this._user,
            password: this._password,
            database: this._database
        });
        return connection;
    }
}