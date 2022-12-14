import { GenericEntity } from "./generic-entity.model";

export class Category extends GenericEntity {
    public id_cat: number;
    public name_cat: string;

    constructor() {
        super();
        this.id_cat = 0;
        this.name_cat = "";
    }
}