import { GenericEntity } from "./generic-entity.model";

export class User extends GenericEntity {
    public id_usu: number;
    public nickname: string;
    public mail_name: string;
    public token: string;
    public password: string;
    public type_usu: string;
    public create_by: number;
    public edit_by: number;
    public delete_by: number;

    constructor() {
        super();
        this.id_usu = 0;
        this.nickname = "";
        this.mail_name = "";
        this.token = "";
        this.password = "";
        this.type_usu = "";
        this.create_by = 0;
        this.edit_by = 0;
        this.delete_by = 0;
    }
}