import { UserType } from "./user.type";

export class UserFilter {
    id_usu: number | null;
    nick_usu: string | null;
    mail_usu: string | null;
    type: UserType | null;
    deleted: boolean;

    constructor() {
        this.id_usu = null;
        this.nick_usu = null;
        this.mail_usu = null;
        this.type = null;
        this.deleted = false;
    }
}