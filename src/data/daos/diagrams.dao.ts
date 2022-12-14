import { Diagram } from "../../models/diagram.model";
import { GenericDAO } from "./generic-dao";
import {Part} from "../../models/part.model";

export class DiagramsDAO extends GenericDAO<Diagram> {
    constructor() {
        super();
    }

    public async getAll(): Promise<Diagram[]> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('SELECT * FROM `diagram`', (err:any, result:any) => {
                    const diag : Diagram[] = [];
                    result.forEach(async (result1: any) => {
                        diag.push(result1);
                    });
                    return err ? reject(err) : resolve(diag)
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async getById(...args: string[]): Promise<Diagram> {
        return new Promise((resolve, reject) => {
            try {
                if (args.length !== 1) {
                    throw new Error("Invalid arguments");
                }
                this._connectionDB.Connection.query('SELECT * FROM diagram WHERE id_diag = '+args[0]+'', (err:any, result:any) => {
                    const diagrams : Diagram[] = [];
                    result.forEach(async (result1: any) => {
                        const diag = new Diagram();
                        diag.fromJson(result1);
                        diagrams.push(diag);
                    });
                    return err ? reject(err) : resolve(diagrams[0])
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async create(entity: Diagram): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query(`INSERT INTO diagram (name_diag, description, state, valid_by, create_by, edit_by, delete_by) VALUES ("${entity.name_diag}","${entity.description}",'${entity.state}',${entity.valid_by?entity.valid_by:null},${entity.create_by},${entity.edit_by},${entity.delete_by})`, (err:any, result:any) => {
                    return err ? reject(err) : resolve(result.insertId)
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async update(entity: Diagram): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('UPDATE `diagram` SET `name_diag` = "'+entity.name_diag+'", `description` = "'+entity.description+'", `state` = "'+entity.state+'", `valid_by` = '+entity.valid_by+' WHERE `id_diag` = '+entity.id_diag+'', (err:any, result:any) => {
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
                this._connectionDB.Connection.query('UPDATE `diagram` SET `delete_by` = '+deletedby+' WHERE `id_diag` = '+id+'', (err:any, result:any) => {
                    return err ? reject(err) : resolve();
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }
}