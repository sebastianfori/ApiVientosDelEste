import { Category as CategoryModel } from '../models/category.model';

export class Category {
    [key: string]: any

    id_cat: number;
    name_cat: string;

    constructor() {
        this.id_cat = 0;
        this.name_cat = '';
    }

    // set received property to value if it exists
    public set(property: string, value: any): Category {
        if (this.hasOwnProperty(property)) {
            try {
                let type = typeof this[property];
                let typedValue = <typeof type>value;
                this[property] = typedValue;
                return this;
            } catch (error) {
                throw new Error(`Category.set: ${error}`);
            }
        }
        else {
            throw new Error(`Category.set: property ${property} does not exist`);
        }
    }

    static fromJSON(json: any): Category {
        let category = new Category();
        category.id_cat = json.id_cat;
        category.name_cat = json.name_cat;
        return category;
    }

    public toJson(): any {
        return {
            id_cat: this.id_cat,
            name_cat: this.name_cat
        };
    }

    public clone(): Category {
        return Category.fromJSON(this.toJson());
    }

    public fromModel(dao: CategoryModel): Category {
        this.id_cat = dao.id_cat;
        this.name_cat = dao.name_cat;
        return this;
    }

    public toModel(): CategoryModel {
        let dao = new CategoryModel();
        dao.id_cat = this.id_cat;
        dao.name_cat = this.name_cat;
        return dao;
    }
}