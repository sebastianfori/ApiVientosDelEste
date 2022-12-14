export interface CRUDController<T, K> {
    getMany(filter: K): Promise<T[]>;
    getOne(id: number): Promise<T>;
    create(item: T): Promise<T>;
    update(item: T): Promise<T>;
    remove(id: number): Promise<number>;
    total(): Promise<number>;
}