import { GenericEntity } from "./generic-entity.model";

export class Diagram extends GenericEntity {
    public id_diag: number;
    public name_diag: string;
    public description: string;
    public state: string;
    public valid_by: number;
    public create_by: number;
    public edit_by: number;
    public delete_by: number;

    constructor() {
        super();
        this.id_diag = 0;
        this.name_diag = "";
        this.description = "";
        this.state = "";
        this.valid_by = 0;
        this.create_by = 0;
        this.edit_by = 0;
        this.delete_by = 0;
    }
}