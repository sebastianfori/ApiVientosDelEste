import { User as UserDTO } from "../types/user.type";
import { UserFilter } from "../types/user-filter.type";
import { UsersDAO } from "../data/daos/users.dao";
import { User } from "../models/user.model";

const usersDAO = new UsersDAO();

export async function getMany(filter: UserFilter) : Promise<UserDTO[]> {
    const users = await usersDAO.getAll();
    const result = users.filter(user => {
        if (filter.id_usu && user.id_usu !== filter.id_usu) {
            return false;
        }
        if (filter.nick_usu && !user.nickname.toLowerCase().includes(filter.nick_usu.toLowerCase())) {
            return false;
        }
        if (filter.mail_usu && !user.mail_usu.toLowerCase().includes(filter.mail_usu.toLowerCase())) {
            return false;
        }
        if (filter.type && user.type_usu !== filter.type) {
            return false;
        }
        if (user.delete_by > 0 && filter.deleted === false) {
            return false;
        }
        return true;
    });
    const resultDTO = result.map(user => {
        let userDTO = new UserDTO();
        userDTO.fromModel(user);
        return userDTO;
    });
    return resultDTO;
};

export async function getOne(id: number) : Promise<UserDTO> {
    const user = await usersDAO.getById(id.toString());
    if (user) {
        const userDTO = new UserDTO();
        userDTO.fromModel(user);
        return userDTO
    }
    throw new Error("User does not exist.");
};

export async function create(user: UserDTO, author: number) : Promise<UserDTO> {
    const userToCreate = user.toModel();
    userToCreate.id_usu = 0;
    userToCreate.create_by = author;
    userToCreate.edit_by = 0;
    userToCreate.delete_by = 0;
    const createdUserId = await usersDAO.create(userToCreate);
    const createdUser = await usersDAO.getById(createdUserId.toString());
    const userDTO = new UserDTO();
    userDTO.fromModel(createdUser);
    return userDTO;
};

export async function update(user: UserDTO, author: number) : Promise<UserDTO> {
    const userUpdate = await usersDAO.getById(user.id_usu.toString());
    if (userUpdate) {
        let userPreUpdate: User = user.toModel();
        userPreUpdate.edit_by = author;
        userPreUpdate.password = userPreUpdate.password ? userPreUpdate.password : userUpdate.password;
        console.log(userPreUpdate);
        await usersDAO.update(userPreUpdate);
        const userUpdated = await usersDAO.getById(user.id_usu.toString());
        console.log(userUpdated);
        let userUpdatedDTO: UserDTO = new UserDTO();
        userUpdatedDTO.fromModel(userUpdated);
        console.log(userUpdatedDTO);
        return userUpdatedDTO;
    }
    throw new Error("User does not exist.");
};

export async function remove(id: number, author: number) : Promise<UserDTO> {
    const userDelete = await usersDAO.getById(id.toString());
    if (userDelete) {
        await usersDAO.delete(id.toString(), author.toString());
        const userDeleted = await usersDAO.getById(id.toString());
        let userDeletedDTO: UserDTO = new UserDTO();
        userDeletedDTO.fromModel(userDeleted);
        return userDeletedDTO;
    }
    throw new Error("User does not exist.");
};

export async function total() : Promise<number> {
    const users = await usersDAO.getAll();
    return users.length;
};