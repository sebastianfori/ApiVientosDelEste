import { DiagTienePart } from "../../models/diag-tiene-part.model";
import { GenericDAO } from "./generic-dao";
import {Diagram} from "../../models/diagram.model";

export class DiagTienePartDAO extends GenericDAO<DiagTienePart> {
    constructor() {
        super();
    }

    public async getAll(): Promise<DiagTienePart[]> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('SELECT * FROM `diag_tiene_part`', (err:any, result:any) => {
                    const diagParts : DiagTienePart[] = [];
                    result.forEach(async (result1: any) => {
                        diagParts.push(result1);
                    });
                    return err ? reject(err) : resolve(diagParts)
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async getById(...args: string[]): Promise<DiagTienePart> {
        return new Promise((resolve, reject) => {
            try {
                if (args.length !== 1) {
                    throw new Error("Invalid arguments");
                }
                this._connectionDB.Connection.query('SELECT * FROM diag_tiene_part WHERE id_part = '+args[0]+'', (err:any, result:any) => {
                    const diagParts : DiagTienePart[] = [];
                    result.forEach(async (result1: any) => {
                        const diagPart = new DiagTienePart();
                        diagPart.fromJson(result1);
                        diagParts.push(diagPart);
                    });
                    return err ? reject(err) : resolve(diagParts[0])
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async create(entity: DiagTienePart): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('INSERT INTO `diag_tiene_part` (`id_diag`, `id_part`) VALUES ('+''+entity.id_diag+','+entity.id_part+')', (err:any, result:any) => {
                    return err ? reject(err) : resolve(result.insertId)
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async update(entity: DiagTienePart): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('UPDATE `diag_tiene_part` SET `id_diag` = '+entity.id_diag+', `id_part` = '+entity.id_part, (err:any, result:any) => {
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
                const id_diag: number = parseInt(args[0],10);
                const id_part: number = parseInt(args[1],10);

                this._connectionDB.Connection.query('DELETE FROM diag_tiene_part WHERE `diag_tiene_part`.`id_part` ='+ id_part+' and `diag_tiene_part`.`id_diag` ='+ id_diag, (err:any, result:any) => {
                    return err ? reject(err) : resolve();
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }
}