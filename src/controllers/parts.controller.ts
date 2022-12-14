import express from 'express';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Part } from '../types/part.type';
import { TokenPayload } from '../types/token-payload.type';
import * as partsService from "../services/parts.service";
import { APIPayload } from '../types/api-payload.type';
import { hashPassword } from '../helpers/auth.helper';
import { User, UserType } from '../types/user.type';
import { PartFilter } from '../types/part-filter.type';

export async function getAllParts(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);

    let filters = new PartFilter();
    try {
        //let newToken = renewToken(token);
        let parts = await partsService.getMany(filters);
        let payload: APIPayload<Part[]> = new APIPayload<Part[]>(parts, token!);
        res.status(200).send(payload);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

}


export async function getParts(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);

    let filters = req.body;
    try {
        //let newToken = renewToken(token);
        let parts = await partsService.getMany(filters);
        let payload: APIPayload<Part[]> = new APIPayload<Part[]>(parts, token!);
        res.status(200).send(payload);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

}

export async function getPart(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
    const user: User = tokenDecoded?.user;
    try {
        //let newToken = renewToken(token);
        let part = await partsService.getOne(Number.parseInt(req.params.id));
        let payload: APIPayload<Part> = new APIPayload<Part>(part, token!);
        res.status(200).send(payload);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function createPart(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
    const user: User = tokenDecoded?.user;

    try {
        let newpart = new Part();
        newpart = Part.fromJSON(req.body);
        //let newToken = renewToken(token);
        let part = await partsService.create(newpart, user.id_usu);
        let payload: APIPayload<Part> = new APIPayload<Part>(part, token!);
        res.status(200).send(payload);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function updatePart(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
    const user: User = tokenDecoded?.user;
    if (user.type === UserType.Administrador) {


        try {
            //let newToken = renewToken(token);
            let newpart = new Part();
            newpart = Part.fromJSON(req.body);
            let part = await partsService.update(newpart, user.id_usu);
            let payload: APIPayload<Part> = new APIPayload<Part>(part, token!);
            res.status(200).send(payload);
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else if (user.type === UserType.Operario) {
        try {
            let newpart = new Part();
            newpart = Part.fromJSON(req.body);
            if (user.id_usu === newpart.create_by) {
                //let newToken = renewToken(token);

                let part = await partsService.update(newpart, user.id_usu);
                let payload: APIPayload<Part> = new APIPayload<Part>(part, token!);
                res.status(200).send(payload);
            } else {
                res.sendStatus(401);
            }
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }

}


export async function deletePart(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
    const user: User = tokenDecoded?.user;
    if (user.type === UserType.Administrador) {


        try {
            //let newToken = renewToken(token);            
            let part = await partsService.remove(Number.parseInt(req.params.id), user.id_usu);
            let payload: APIPayload<number> = new APIPayload<number>(Number.parseInt(req.params.id), token!);
            res.status(200).send(payload);
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else if (user.type === UserType.Operario) {
        try {
          let partaux = await partsService.getOne(Number.parseInt(req.params.id))
            if (user.id_usu === partaux.create_by) {
                //let newToken = renewToken(token);

                let part = await partsService.remove(Number.parseInt(req.params.id), user.id_usu);
                let payload: APIPayload<number> = new APIPayload<number>(Number.parseInt(req.params.id), token!);
                res.status(200).send(payload);
            } else {
                res.sendStatus(401);
            }
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }
}