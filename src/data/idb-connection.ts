import mysql from "mysql2";

export interface IConnectionDB {
    Connection: mysql.Connection;

    startConnection(): void;

    closeConnection(): void;
}