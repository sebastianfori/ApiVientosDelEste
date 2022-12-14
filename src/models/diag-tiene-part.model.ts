import { GenericEntity } from "./generic-entity.model";

export class DiagTienePart extends GenericEntity {
    public id_diag: number;
    public id_part: number;

    constructor() {
        super();
        this.id_diag = 0;
        this.id_part = 0;
    }
}