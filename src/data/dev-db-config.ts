import { GenericConfigDB } from "./generic-db-config";

export class DevConfigDB extends GenericConfigDB {
    constructor() {
        super(
            "dev.vientosdeleste.combobulativedesigns.net",
            "obligatorio_wm_db_admin",
            "vvff232epx5uuphvxk8gd_jpkr",
            "obligatorio_wm_db"
        );
    }
}