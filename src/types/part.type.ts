import { Part as PartModel } from "../models/part.model";
import { DiagTienePart as DiagTienePartModel } from "../models/diag-tiene-part.model";

export class Part {
    [key: string]: any

    id_piez: number;
    id_cat: number;
    name_piez: string;
    url_img: string;
    height: number;
    resis_wind: number;
    material: string;
    create_by: number;
    edit_by: number;
    delete_by: number;

    constructor() {
        this.id_piez = 0;
        this.id_cat = 0;
        this.name_piez = '';
        this.url_img = '';
        this.height = 0;
        this.resis_wind = 0;
        this.material = '';
        this.create_by = 0;
        this.edit_by = 0;
        this.delete_by = 0;
    }

    // set received property to value if it exists
    public set(property: string, value: any): Part {
        if (this.hasOwnProperty(property)) {
            try {
                let type = typeof this[property];
                let typedValue = <typeof type>value;
                this[property] = typedValue;
                return this;
            } catch (error) {
                throw new Error(`Part.set: ${error}`);
            }
        }
        else {
            throw new Error(`Part.set: property ${property} does not exist`);
        }
    }

    static fromJSON(json: any): Part {
        let part = new Part();
        part.id_piez = json.id_piez;
        part.id_cat = json.id_cat;
        part.name_piez = json.name_piez;
        part.url_img = json.url_img;
        part.height = json.height;
        part.resis_wind = json.resis_wind;
        part.material = json.material;
        part.create_by = json.create_by;
        part.edit_by = json.edit_by;
        part.delete_by = json.delete_by;
        return part;
    }

    public toJson(): any {
        return {
            id_piez: this.id_piez,
            id_cat: this.id_cat,
            name_piez: this.name_piez,
            url_img: this.url_img,
            height: this.height,
            resis_wind: this.resis_wind,
            material: this.material,
            create_by: this.create_by,
            edit_by: this.edit_by,
            delete_by: this.delete_by
        };
    }

    public clone(): Part {
        return Part.fromJSON(this.toJson());
    }
    
    public fromModel(dao: PartModel) {
        this.id_piez = dao.id_part;
        this.id_cat = dao.id_cat;
        this.name_piez = dao.name_piez;
        this.url_img = dao.url_img;
        this.height = dao.height;
        this.resis_wind = dao.resis_wind;
        this.material = dao.material;
        this.create_by = dao.create_by;
        this.edit_by = dao.edit_by;
        this.delete_by = dao.delete_by;
    }

    public toModel(): PartModel {
        let dao = new PartModel();
        dao.id_part = this.id_piez;
        dao.id_cat = this.id_cat;
        dao.name_piez = this.name_piez;
        dao.url_img = this.url_img;
        dao.height = this.height;
        dao.resis_wind = this.resis_wind;
        dao.material = this.material;
        dao.create_by = this.create_by ?? 0;
        dao.edit_by = this.edit_by ?? 0;
        dao.delete_by = this.delete_by ?? 0;
        return dao;
    }
}