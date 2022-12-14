import { Diagram as DiagramDTO, DiagramState } from "../types/diagram.type";
import { DiagramFilter } from "../types/diagram-filter.type";
import { DiagramsDAO } from "../data/daos/diagrams.dao";
import { DiagTienePartDAO } from "../data/daos/diag-tiene-part.dao";
import { Diagram } from "../models/diagram.model";
import { DiagTienePart } from "../models/diag-tiene-part.model";
import { PartsDAO } from "../data/daos/parts.dao";
import { IEntity } from "../models/ientity.model";

const diagTienePartDAO = new DiagTienePartDAO();
const diagramsDAO = new DiagramsDAO();
const partsDAO = new PartsDAO();

export async function getMany(filter: DiagramFilter): Promise<DiagramDTO[]> {
    const diagrams = await diagramsDAO.getAll();
    const result = diagrams.filter(diagram => {
        if (filter.id_diag && diagram.id_diag !== filter.id_diag) {
            return false;
        }
        if (filter.name_diag && !diagram.name_diag.toLowerCase().includes(filter.name_diag.toLowerCase())) {
            return false;
        }
        if (filter.id_base && diagram.id_base !== filter.id_base) {
            return false;
        }
        if (filter.id_body && diagram.id_body !== filter.id_body) {
            return false;
        }
        if (filter.id_blade && diagram.id_blade !== filter.id_blade) {
            return false;
        }
        if (filter.state && diagram.state !== filter.state) {
            return false;
        }
        if (diagram.delete_by > 0 && filter.deleted === false) {
            return false;
        }

        return true;
    });
    const resultDTO = result.map(async diagram => {
        let userDTO = new DiagramDTO();
        const tienePart = await diagTienePartDAO.getAll();
        const parts = tienePart.filter(part => {
            if (part.id_diag != diagram.id_diag)
                return false;
            return true;
        }).map(part => {
            return partsDAO.getById(part.id_part.toString())
        });
        const partsAux = await Promise.all(parts);
        userDTO.fromModel(diagram, partsAux);
        return userDTO;
    });
    return await Promise.all(resultDTO);
};

export async function getOne(id: number): Promise<DiagramDTO> {
    const diagram = await diagramsDAO.getById(id.toString());
    if (diagram) {
        const userDTO = new DiagramDTO();
        const tienePart = await diagTienePartDAO.getAll();
        const parts = tienePart.filter(part => {
            if (part.id_diag != diagram.id_diag)
                return false;
            return true;
        }).map(part => {
            return partsDAO.getById(part.id_part.toString())
        });
        const partsAux = await Promise.all(parts);
        userDTO.fromModel(diagram, partsAux);
        return userDTO
    }
    throw new Error("User does not exist.");
}

export async function create(diagram: DiagramDTO, author: number): Promise<DiagramDTO> {
    let partPreUpdate: Diagram = diagram.toModel();
    partPreUpdate.state = DiagramState.Pendiente;
    partPreUpdate.valid_by = 0;
    partPreUpdate.create_by = author;
    const createdUserId = await diagramsDAO.create(partPreUpdate);
    const createdUser = await diagramsDAO.getById(createdUserId.toString());
    const diagramDTO = new DiagramDTO();
    const partsNew : IEntity[]= [new DiagTienePart().set('id_diag', createdUser.id_diag).set('id_part', diagram.id_blade),
    new DiagTienePart().set('id_diag', createdUser.id_diag).set('id_part', diagram.id_base),
    new DiagTienePart().set('id_diag', createdUser.id_diag).set('id_part', diagram.id_body)]
    partsNew.forEach(async p =>{
        await diagTienePartDAO.create(p as DiagTienePart)
    })
    const partsNewAux = await Promise.all((partsNew as DiagTienePart[]).map(
        async p =>{
            return await partsDAO.getById(p.id_part.toString())
        }
    ))
    diagramDTO.fromModel(createdUser, partsNewAux);
    return diagramDTO;

}

export async function update(diagram: DiagramDTO, author: number): Promise<DiagramDTO> {
    const partUpdate = await diagramsDAO.getById(diagram.id_diag.toString());

    if (partUpdate) {
        let partPreUpdate: Diagram = diagram.toModel();
        partPreUpdate.edit_by = author;
        partPreUpdate.description = partPreUpdate.description ? partPreUpdate.description : partUpdate.description;
        partPreUpdate.name_diag = partPreUpdate.name_diag ? partPreUpdate.name_diag : partUpdate.name_diag;
        partPreUpdate.state = partPreUpdate.state ? partPreUpdate.state : partUpdate.state;
        partPreUpdate.valid_by = partPreUpdate.valid_by ? partPreUpdate.valid_by : partUpdate.valid_by;
        partPreUpdate.create_by = partPreUpdate.create_by ? partPreUpdate.create_by : partUpdate.create_by;
        partPreUpdate.delete_by = partPreUpdate.delete_by ? partPreUpdate.delete_by : partUpdate.delete_by;
        partPreUpdate.id_diag = partPreUpdate.id_diag ? partPreUpdate.id_diag : partUpdate.id_diag;
        await diagramsDAO.update(partPreUpdate);
        const parts= await diagTienePartDAO.getAll();
        parts.filter(p => {
            p.id_diag = partPreUpdate.id_diag
        }).forEach(async p => {
            await diagTienePartDAO.delete(p.id_diag.toString(), p.id_part.toString())
        })
        const partsNew : IEntity[] = [new DiagTienePart().set('id_diag', partPreUpdate.id_diag).set('id_part', diagram.id_blade),
        new DiagTienePart().set('id_diag', partPreUpdate.id_diag).set('id_part', diagram.id_base),
        new DiagTienePart().set('id_diag', partPreUpdate.id_diag).set('id_part', diagram.id_body)]
        partsNew.forEach(async p =>{
            await diagTienePartDAO.create(p as DiagTienePart)
        })
        const partUpdated = await diagramsDAO.getById(diagram.id_diag.toString());
        
        let partUpdatedDTO: DiagramDTO = new DiagramDTO();
        const partsNewAux = await Promise.all((partsNew as DiagTienePart[]).map(
            async p =>{
                return await partsDAO.getById(p.id_part.toString())
            }
        ))
        partUpdatedDTO.fromModel(partUpdated, partsNewAux);
        return partUpdatedDTO;
    }
    throw new Error("diagram does not exist.");
}

export async function remove(id: number, author: number): Promise<DiagramDTO> {
    const userDelete = await diagramsDAO.getById(id.toString());
    if (userDelete) {
        await diagramsDAO.delete(id.toString(), author.toString());
        const userDeleted = await diagramsDAO.getById(id.toString());
        let userDeletedDTO: DiagramDTO = new DiagramDTO();
        const parts= await diagTienePartDAO.getAll();
        const partaux = await Promise.all(parts.filter(p => {
            p.id_diag = userDeleted.id_diag
        }).map(async p =>{
            return await partsDAO.getById(p.id_part.toString())
        }))
        userDeletedDTO.fromModel(userDeleted, partaux);
        return userDeletedDTO;
    }
    throw new Error("User does not exist.");
}

export async function total(): Promise<number> {
    const diagram = await diagramsDAO.getAll()
    return diagram.length
}