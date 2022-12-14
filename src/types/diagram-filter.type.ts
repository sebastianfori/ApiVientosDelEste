import { DiagramState } from "./diagram.type";

export class DiagramFilter {
    id_diag: number | null;
    name_diag: string | null;
    id_base: number | null;
    id_body: number | null;
    id_blade: number | null;
    state: DiagramState | null;
    create_by: number | null;
    deleted: boolean;

    constructor() {
        this.id_diag = null;
        this.name_diag = null;
        this.id_base = null;
        this.id_body = null;
        this.id_blade = null;
        this.state = null;
        this.create_by = null;
        this.deleted = false;
    }
}