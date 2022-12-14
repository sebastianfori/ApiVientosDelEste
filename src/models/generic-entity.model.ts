import { IEntity } from "./ientity.model"

export abstract class GenericEntity implements IEntity {
    [key: string]: any;

    public set(property: string, value: any): IEntity {
        try {
            if (this.hasOwnProperty(property)) {
                let type = typeof this[property];
                let typedValue = <typeof type>value;
                this[property] = typedValue;
                return this;
            }
            else {
                throw new Error(`GenericEntity.set: property ${property} does not exist`);
            }
        } catch (error) {
            throw new Error(`GenericEntity.set: ${error}`);
        }
    }

    public toJson() {
        return JSON.parse(JSON.stringify(this));
    }

    public fromJson(json: any) {
        for (let key in json) {
            this.set(key, json[key]);
        }
    }
}