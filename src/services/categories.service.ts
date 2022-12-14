import { Category as CategoryDTO } from "../types/category.type";
import { CategoryFilter } from "../types/category-filter.type";
import { CategoriesDAO } from "../data/daos/categories.dao";
import { Category } from "../models/category.model";

const categoriesDAO = new CategoriesDAO();

export async function getMany(filter: CategoryFilter) : Promise<CategoryDTO[]> {
    const category = await categoriesDAO.getAll();
    const resultDTO = category.map(category => {
        let categoryDTO = new CategoryDTO();
        categoryDTO.fromModel(category);
        return categoryDTO;
    });
    return resultDTO;
};

export async function getOne(id: number) : Promise<CategoryDTO> {
    const category = await categoriesDAO.getById(id.toString());
    if (category) {
        const categoryDTO = new CategoryDTO();
        categoryDTO.fromModel(category);
        return categoryDTO
    }
    throw new Error("User does not exist.");
}

export async function create(category: CategoryDTO, author: number) : Promise<CategoryDTO> {
    // NO IMPLEMENTAR
    throw new Error("Action not allowed.");
}

export async function update(category: CategoryDTO, author: number) : Promise<CategoryDTO> {
    // NO IMPLEMENTAR
    throw new Error("Action not allowed.");
}

export async function remove(id: number, author: number) : Promise<void> {
    // NO IMPLEMENTAR
    throw new Error("Action not allowed.");
}

export async function total() : Promise<number> {
    const cat = await categoriesDAO.getAll();
    return cat.length;
}