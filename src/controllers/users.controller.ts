import express from 'express';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { User, UserType } from '../types/user.type';
import { TokenPayload } from '../types/token-payload.type';
import * as usersService from "../services/users.service";
import { APIPayload } from '../types/api-payload.type';
import { hashPassword } from '../helpers/auth.helper';
import { UserFilter } from '../types/user-filter.type';

export async function getAllUsers(req: express.Request, res: express.Response) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
        const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
        const userRole: UserType = tokenDecoded.user.type;
        if (userRole === UserType.Administrador) {
            let filters = new UserFilter();
            let users = await usersService.getMany(filters);
            for (let user of users) {
                user.password = "";
            }
            let payload: APIPayload<User[]> = new APIPayload<User[]>(users, token!);
            res.status(200).send(payload);
        }
        else {
            res.sendStatus(403);
            console.log("User not authorized");
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


export async function getUsers(req: express.Request, res: express.Response) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
        const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
        const userRole: UserType = tokenDecoded.user.type;
        if (userRole === UserType.Administrador) {
            let filters = req.body;
            let users = await usersService.getMany(filters);
            for (let user of users) {
                user.password = "";
            }
            let payload: APIPayload<User[]> = new APIPayload<User[]>(users, token!);
            res.status(200).send(payload);
        }
        else {
            res.sendStatus(403);
            console.log("User not authorized");
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getUser(req: express.Request, res: express.Response) {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
        const userRole: UserType = tokenDecoded.user.type;
        if (userRole === UserType.Administrador) {
            let user = await usersService.getOne(Number.parseInt(req.params.id));
            user.password = "";
            let payload: APIPayload<User> = new APIPayload<User>(user, token!);
            res.status(200).send(payload);
        }
        else
            res.sendStatus(403);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function createUser(req: express.Request, res: express.Response) {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
        const userRole: UserType = tokenDecoded.user.type;
        if (userRole === UserType.Administrador) {
            let userNew = new User();
            userNew = User.fromJSON(req.body);
            userNew.password = userNew.password ? hashPassword(userNew.password) : '';
            let user = await usersService.create(userNew, tokenDecoded.user.id_usu);
            user.password = "";
            let payload: APIPayload<User> = new APIPayload<User>(user, token!);
            res.status(200).send(payload);
        }
        else {
            res.sendStatus(403);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function updateUser(req: express.Request, res: express.Response) {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
        const userRole: UserType = tokenDecoded.user.type;
        if (userRole === UserType.Administrador) {
            let userNew = new User();
            userNew = User.fromJSON(req.body);
            userNew.password = userNew.password ? hashPassword(userNew.password) : '';
            let user = await usersService.update(userNew, tokenDecoded.user.id_usu);
            user.password = "";
            let payload: APIPayload<User> = new APIPayload<User>(user, token!);
            res.status(200).send(payload);
        }
        else {
            res.sendStatus(403);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deleteUser(req: express.Request, res: express.Response) {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
        const userRole: UserType = tokenDecoded.user.type;
        if (userRole === UserType.Administrador) {
            let user = await usersService.remove(Number.parseInt(req.params.id), tokenDecoded.user.id_usu);
            let payload: APIPayload<number> = new APIPayload<number>(user.id_usu, token!);
            res.status(200).send(payload);
        }
        else {
            res.sendStatus(403);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
