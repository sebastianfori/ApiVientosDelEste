import { Part } from "../../models/part.model";
import { GenericDAO } from "./generic-dao";
import {User} from "../../models/user.model";

export class PartsDAO extends GenericDAO<Part> {
    constructor() {
        super();
    }

    public async getAll(): Promise<Part[]> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('SELECT * FROM `part`', (err:any, result:any) => {
                    const part : Part[] = [];
                    result.forEach(async (result1: any) => {
                        part.push(result1);
                    });
                    return err ? reject(err) : resolve(part)
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async getById(...args: string[]): Promise<Part> {
        return new Promise((resolve, reject) => {
            try {
                if (args.length !== 1) {
                    throw new Error("Invalid arguments");
                }
                this._connectionDB.Connection.query('SELECT * FROM part WHERE id_part = '+args[0]+'', (err:any, result:any) => {
                    const parts : Part[] = [];
                    result.forEach(async (result1: any) => {
                        const part = new Part();
                        part.fromJson(result1);
                        parts.push(part);
                    });
                    return err ? reject(err) : resolve(parts[0])
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async create(entity: Part): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('INSERT INTO `part` (`name_piez`,`id_cat`, `url_img`, `height`, `resis_wind`, `material`, `id_diag`, `create_by`, `edit_by`, `delete_by`) VALUES ("'+entity.name_piez+'",'+''+entity.id_cat+',"'+entity.url_img+'",'+entity.height+','+entity.resis_wind+',"'+entity.material+'",'+entity.id_diag+','+entity.create_by+','+entity.edit_by+','+entity.delete_by+")", (err:any, result:any) => {
                    return err ? reject(err) : resolve(result.insertId);
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async update(entity: Part): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('UPDATE `part` SET `name_piez` = "'+entity.name_piez+'", `id_cat` = '+entity.id_cat+', `url_img` = "'+entity.url_img+'", `height` = "'+entity.height+'", `resis_wind` = "'+entity.resis_wind+'", `material` = "'+entity.material+'", `id_diag` = "'+entity.id_diag+'", `create_by` = "'+entity.create_by+'", `delete_by` = "'+entity.delete_by+'" WHERE `id_part` = '+entity.id_part+'', (err:any, result:any) => {
                    return err ? reject(err) : resolve(result)
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async delete(...args: string[]): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const id: number = parseInt(args[0],10);
                const deletedby: number = parseInt(args[1], 10);
                this._connectionDB.Connection.query('UPDATE `part` SET `delete_by` = '+deletedby+' WHERE `id_part` = '+id+'', (err:any, result:any) => {
                    return err ? reject(err) : resolve();
                });
            }
            catch (err) {
                console.log(err)
                return reject(err)
            }
        });
    }
}