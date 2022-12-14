export interface IEntity {
    [key: string]: any

    set(property: string, value: any): IEntity;
    toJson(): any;
    fromJson(json: any): void;
}