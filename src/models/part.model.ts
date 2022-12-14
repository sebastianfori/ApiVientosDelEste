import { GenericEntity } from "./generic-entity.model";

export class Part extends GenericEntity {
    public id_part: number;
    public id_cat: number;
    public name_piez: string;
    public url_img: string;
    public height: number;
    public resis_wind: number;
    public material: string;
    public id_diag: number;
    public create_by: number;
    public edit_by: number;
    public delete_by: number;

    constructor() {
        super();
        this.id_part = 0;
        this.id_cat = 0;
        this.name_piez = '';
        this.url_img = "";
        this.height = 0;
        this.resis_wind = 0;
        this.material = "";
        this.id_diag = 0;
        this.create_by = 0;
        this.edit_by = 0;
        this.delete_by = 0;
    }
}