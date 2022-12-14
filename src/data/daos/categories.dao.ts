import { Category } from "../../models/category.model";
import { GenericDAO } from "./generic-dao";
import {User} from "../../models/user.model";

export class CategoriesDAO extends GenericDAO<Category> {
    constructor() {
        super();
    }

    public async getAll(): Promise<Category[]> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('SELECT * FROM category', (err:any, result:any) => {
                    const categories : Category[] = [];

                    result.forEach(async (result1: any) => {
                        const cat = new Category();
                        cat.fromJson(result1);
                        categories.push(cat);
                    });
                    return err ? reject(err) : resolve(categories)
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async getById(...args: string[]): Promise<Category> {
        return new Promise((resolve, reject) => {
            try {
                if (args.length !== 1) {
                    throw new Error("Invalid arguments");
                }
                this._connectionDB.Connection.query('SELECT * FROM category WHERE id_cat = '+args[0]+'', (err:any, result:any) => {
                    const categories : Category[] = [];
                    result.forEach(async (result1: any) => {
                        const cat = new Category();
                        cat.fromJson(result1);
                        categories.push(cat);
                    });
                    return err ? reject(err) : resolve(categories[0])
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async create(entity: Category): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('INSERT INTO `category` (`name_cat`) VALUES ('+entity.name_cat+')', (err:any, result:any) => {
                    return err ? reject(err) : resolve(result.insertId)
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    public async update(entity: Category): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this._connectionDB.Connection.query('UPDATE `category` SET `name_cat` = '+entity.name_cat, (err:any, result:any) => {
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
                this._connectionDB.Connection.query('DELETE FROM category WHERE `category`.`id_cat` ='+ id, (err:any, result:any) => {
                    return err ? reject(err) : resolve();
                });
            }
            catch (err) {
                return reject(err)
            }
        });
    }
}