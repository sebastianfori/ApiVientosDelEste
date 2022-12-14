import mysql from 'mysql2';
import { DevConfigDB } from './dev-db-config';
import { IConnectionDB } from './idb-connection';

export class ConnectionDB implements IConnectionDB {
    private static _instance: ConnectionDB;

    private readonly _connection: mysql.Connection;

    public get Connection(): mysql.Connection {
        return this._connection;
    }

    private constructor() {
        const config = new DevConfigDB();
        this._connection = config.initializeConfigurations();
        this.startConnection();
    }

    public destroy(): void {
        this.closeConnection();
    }

    public static getInstance(): ConnectionDB {
        if (!ConnectionDB._instance) {
            ConnectionDB._instance = new ConnectionDB();
        }
        return ConnectionDB._instance;
    }

    public startConnection(): void {
        this._connection.connect(function(err: any) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
        });
    }

    public closeConnection(): void {
        this._connection.end();
    }
}
