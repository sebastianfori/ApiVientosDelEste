import { GenericEntity } from "../../models/generic-entity.model";
import { ConnectionDB } from "../db-connection";

export abstract class GenericDAO<T extends GenericEntity> implements GenericDAO<T> {
    protected _connectionDB: ConnectionDB;

    constructor() {
        this._connectionDB = ConnectionDB.getInstance();
    }
}