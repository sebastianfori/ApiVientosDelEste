import { Part as PartDTO } from "../types/part.type";
import { PartFilter } from "../types/part-filter.type";
import { PartsDAO } from "../data/daos/parts.dao";
import { Part } from "../models/part.model";

const partsDAO = new PartsDAO();

export async function getMany(filter: PartFilter) : Promise<PartDTO[]> {
    const parts = await partsDAO.getAll();
    let result = parts.filter(part => {
        if (filter.id_piez && part.id_piez !== filter.id_piez) {
            return false;
        }
        if (filter.id_cat && part.id_cat !== filter.id_cat) {
            return false;
        }
        if (filter.height_over && part.height < filter.height_over) {
            return false;
        }
        if (filter.height_under && part.height >= filter.height_under) {
            return false;
        }
        if (filter.resis_wind_over && part.resis_wind < filter.resis_wind_over) {
            return false;
        }
        if (filter.resis_wind_under && part.resis_wind >= filter.resis_wind_under) {
            return false;
        }
        if (filter.name_piez && !part.name_piez.toLowerCase().includes(filter.name_piez.toLowerCase())) {
            return false;
        }
        if (filter.material && !part.material.toLowerCase().includes(filter.material.toLowerCase())) {
            return false;
        }
        if (part.delete_by > 0 && filter.deleted === false) {
            return false;
        }
        return true;
    });
    const resultDTO = result.map(part => {
        let userDTO = new PartDTO();
        userDTO.fromModel(part);
        return userDTO;
    });
    
    return resultDTO;
};

export async function getOne(id: number) : Promise<PartDTO> {
    const part = await partsDAO.getById(id.toString());
    if (part) {
        const partDTO = new PartDTO();
        partDTO.fromModel(part);
        return partDTO
    }
    throw new Error("part does not exist.");
}

export async function create(part: PartDTO, author: number) : Promise<PartDTO> {
    const partToCreate = part.toModel();
    partToCreate.id_part = 0;
    partToCreate.create_by = author;
    partToCreate.edit_by = 0;
    partToCreate.delete_by = 0;
    const createdUserId = await partsDAO.create(partToCreate);
    const createdPart = await partsDAO.getById(createdUserId.toString());
    const partDTO = new PartDTO();
    partDTO.fromModel(createdPart);
    return partDTO;
}

export async function update(part: PartDTO, author: number) : Promise<PartDTO> {
    const partUpdate = await partsDAO.getById(part.id_piez.toString());
    if (partUpdate) {
        let partPreUpdate: Part = part.toModel();
        partPreUpdate.edit_by = author;
        partPreUpdate.height = partPreUpdate.height ? partPreUpdate.height : partUpdate.height;
        partPreUpdate.material = partPreUpdate.material ? partPreUpdate.material : partUpdate.material;
        partPreUpdate.resis_wind = partPreUpdate.resis_wind ? partPreUpdate.resis_wind : partUpdate.resis_wind;
        partPreUpdate.name_part = partPreUpdate.name_part ? partPreUpdate.name_part : partUpdate.name_part;

        await partsDAO.update(partPreUpdate);
        const partUpdated = await partsDAO.getById(part.id_piez.toString());
        let partUpdatedDTO: PartDTO = new PartDTO();
        partUpdatedDTO.fromModel(partUpdated);
        return partUpdatedDTO;
    }
    throw new Error("Part does not exist.");
}

export async function remove(id: number, author: number) : Promise<PartDTO> {
    const partDelete = await partsDAO.getById(id.toString());
    if (partDelete) {
        await partsDAO.delete(id.toString(), author.toString());
        const userDeleted = await partsDAO.getById(id.toString());
        let partDeletedDTO: PartDTO = new PartDTO();
        partDeletedDTO.fromModel(userDeleted);
        return partDeletedDTO;
    }
    throw new Error("part does not exist.");
}

export async function total() : Promise<number> {
    const parts = await partsDAO.getAll();
    return parts.length;
}

