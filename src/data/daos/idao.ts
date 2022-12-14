import { IEntity } from "../../models/ientity.model";

export interface IDao<T extends IEntity> {
    getAll(): Promise<T[]>;
    getById(...args: string[]): Promise<T>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    delete(...args: string[]): Promise<T>;
}