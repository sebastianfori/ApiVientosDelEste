import { User } from "../../models/user.model";
import { GenericDAO } from "./generic-dao";

export class UsersDAO extends GenericDAO<User> {
    constructor() {
        super();
    }

    public async getAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('SELECT * FROM user', (err:any, result:any) => {
                    const users : User[] = [];

                    result.forEach(async (result1: any) => {
                        const user = new User();
                        user.fromJson(result1);
                        users.push(user);
                    });
                    return err ? reject(err) : resolve(users)
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async getById(...args: string[]): Promise<User> {
        return new Promise((resolve, reject) => {
            try {
                if (args.length !== 1) {
                    throw new Error("Invalid arguments");
                }
                this._connectionDB.Connection.query('SELECT * FROM user WHERE id_usu = '+args[0]+'', (err:any, result:any) => {
                    const users : User[] = [];
                    result.forEach(async (result1: any) => {
                        const user = new User();
                        user.fromJson(result1);
                        users.push(user);
                    });
                    return err ? reject(err) : resolve(users[0])
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async create(entity: User): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('INSERT INTO user (nickname, mail_name, token, password, type_usu, create_by, edit_by, delete_by) VALUES ('+'"'+entity.nickname+'","'+entity.mail_name+'","'+entity.token+'", "'+entity.password+'", "'+entity.type_usu+'", "'+entity.create_by+'", "'+entity.edit_by+'", "'+entity.delete_by+'")', (err:any, result:any) => {
                    return err ? reject(err) : resolve(result.insertId);
                });
            }
            catch (err) {
                return reject(err);
            }
        });
    }

    public async update(entity: User): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('UPDATE `user` SET `nickname` = "'+entity.nickname+'", `mail_name` = "'+entity.mail_name+'", `token` = "'+entity.token+'", `password` = "'+entity.password+'", `type_usu` = "'+entity.type_usu+'", `create_by` = "'+entity.create_by+'", `edit_by` = "'+entity.edit_by+'", `delete_by` = "'+entity.delete_by+'" WHERE `id_usu` = '+entity.id_usu+'', (err:any, result:any) => {
                    return err ? reject(err) : resolve();
                });
            }
            catch (err) {
                return reject(err);
            }
        });
    }

    public async delete(...args: string[]): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (args.length !== 2) {
                    throw new Error("Invalid arguments");
                }
                const id: number = parseInt(args[0], 10);
                const deletedby: number = parseInt(args[1], 10);
                this._connectionDB.Connection.query('UPDATE `user` SET `delete_by` = '+deletedby+'" WHERE `id_usu` = '+id+'', (err:any, result:any) => {
                    return err ? reject(err) : resolve();
                });
            }
            catch (err) {
                return reject(err);
            }
        });
    }
}