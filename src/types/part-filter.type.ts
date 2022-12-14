export class PartFilter {
    id_piez: number | null;
    id_cat: number | null;
    name_piez: string | null;
    height_under: number | null;
    height_over: number | null;
    resis_wind_under: number | null;
    resis_wind_over: number | null;
    material: string | null;
    deleted: boolean;

    constructor() {
        this.id_piez = null;
        this.id_cat = null;
        this.name_piez = null;
        this.height_under = null;
        this.height_over = null;
        this.resis_wind_under = null;
        this.resis_wind_over = null;
        this.material = null;
        this.deleted = false;
    }
}