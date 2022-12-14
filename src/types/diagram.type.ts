import { Diagram as DiagramModel } from "../models/diagram.model";
import { Part as PartModel } from "../models/part.model";
import { DiagTienePart as DiagTienePartModel } from "../models/diag-tiene-part.model";

export class Diagram {
    [key: string]: any

    id_diag: number;
    name_diag: string;
    description: string;
    id_base: number;
    id_body: number;
    id_blade: number;
    state: DiagramState;
    valid_by: number;
    create_by: number;
    edit_by: number;
    delete_by: number;

    constructor() {
        this.id_diag = 0;
        this.name_diag = '';
        this.description = '';
        this.id_base = 0;
        this.id_body = 0;
        this.id_blade = 0;
        this.state = DiagramState.Pendiente;
        this.valid_by = 0;
        this.create_by = 0;
        this.edit_by = 0;
        this.delete_by = 0;
    }

    // set received property to value if it exists
    public set(property: string, value: any): Diagram {
        if (this.hasOwnProperty(property)) {
            try {
                let type = typeof this[property];
                let typedValue = <typeof type>value;
                this[property] = typedValue;
                return this;
            } catch (error) {
                throw new Error(`Diagram.set: ${error}`);
            }
        }
        else {
            throw new Error(`Diagram.set: property ${property} does not exist`);
        }
    }

    static fromJSON(json: any): Diagram {
        let diagram = new Diagram();
        diagram.id_diag = json.id_diag;
        diagram.name_diag = json.name_diag;
        diagram.description = json.description;
        diagram.id_base = json.id_base;
        diagram.id_body = json.id_body;
        diagram.id_blade = json.id_blade;
        diagram.state = json.state;
        diagram.valid_by = json.valid_by;
        diagram.create_by = json.create_by;
        diagram.edit_by = json.edit_by;
        diagram.delete_by = json.delete_by;
        return diagram;
    }

    public toJson(): any {
        return {
            id_diag: this.id_diag,
            name_diag: this.name_diag,
            description: this.description,
            id_base: this.id_base,
            id_body: this.id_body,
            id_blade: this.id_blade,
            state: this.state,
            valid_by: this.valid_by,
            create_by: this.create_by,
            edit_by: this.edit_by,
            delete_by: this.delete_by
        };
    }

    public clone(): Diagram {
        return Diagram.fromJSON(this.toJson());
    }

    public fromModel(dao: DiagramModel, parts: PartModel[]): Diagram {
        this.id_diag = dao.id_diag;
        this.name_diag = dao.name_diag;
        this.description = dao.description;
        this.state = dao.state as DiagramState;
        this.valid_by = dao.valid_by;
        this.create_by = dao.create_by;
        this.edit_by = dao.edit_by;
        this.delete_by = dao.delete_by;
        parts.forEach(part => {
            switch (part.id_cat) {
                case 1:
                    this.id_base = part.id_part;
                    break;
                case 2:
                    this.id_body = part.id_part;
                    break;
                case 3:
                    this.id_blade = part.id_part;
                    break;
                default:
                    break;
            }
        });
        console.log(dao);
        console.log(this);
        return this;
    }

    public toModel(): DiagramModel {
        let dao = new DiagramModel();
        dao.id_diag = this.id_diag;
        dao.name_diag = this.name_diag;
        dao.description = this.description;
        dao.state = this.state;
        dao.valid_by = this.valid_by;
        dao.create_by = this.create_by ?? 0;
        dao.edit_by = this.edit_by ?? 0;
        dao.delete_by = this.delete_by ?? 0;
        return dao;
    }

    public toDiagTienePartModels(): DiagTienePartModel[] {
        let daos: DiagTienePartModel[] = [];
        if (this.id_base) {
            let dao = new DiagTienePartModel();
            dao.id_diag = this.id_diag;
            dao.id_part = this.id_base;
            daos.push(dao);
        }
        if (this.id_body) {
            let dao = new DiagTienePartModel();
            dao.id_diag = this.id_diag;
            dao.id_part = this.id_body;
            daos.push(dao);
        }
        if (this.id_blade) {
            let dao = new DiagTienePartModel();
            dao.id_diag = this.id_diag;
            dao.id_part = this.id_blade;
            daos.push(dao);
        }
        return daos;
    }
}

export enum DiagramState {
    Pendiente = "PENDIENTE DE APROVACION",
    Aprobado = "APROBADO",
    Rechazado = "RECHAZADO"
}

export const DiagramStateMapping: Record<DiagramState, string> = {
    [DiagramState.Pendiente]: "Pendiente",
    [DiagramState.Aprobado]: "Aprobado",
    [DiagramState.Rechazado]: "Rechazado"
};