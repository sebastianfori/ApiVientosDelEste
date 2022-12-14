import express from 'express';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Diagram } from '../types/diagram.type';
import { TokenPayload } from '../types/token-payload.type';
import { User, UserType } from '../types/user.type';
import * as diagramsService from "../services/diagrams.service";
import { APIPayload } from '../types/api-payload.type';
import { hashPassword } from '../helpers/auth.helper';
import { DiagramFilter } from '../types/diagram-filter.type';

export async function getAllAuditorDiagrams(req: express.Request, res: express.Response) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
  const user: User = tokenDecoded?.user;
  let filters = new DiagramFilter();
      console.log(user);
  if (user.type === UserType.Auditor) {
    try {
      //let newToken = renewToken(token);
      let diagram = await diagramsService.getMany(filters);
      let payload: APIPayload<Diagram[]> = new APIPayload<Diagram[]>(diagram, token!);
      res.status(200).send(payload);
    }
    catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
  else {
    res.sendStatus(401);
  }
}


export async function getDiagrams(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
    const user: User = tokenDecoded?.user;
    let filters = req.body;
    if (user.type === UserType.Auditor) {
      try {
        //let newToken = renewToken(token);
        let diagram = await diagramsService.getMany(filters);
        let payload: APIPayload<Diagram[]> = new APIPayload<Diagram[]>(diagram, token!);
        res.status(200).send(payload);
      }
      catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
    else {
      res.sendStatus(401);
    }
}

export async function getDiagram(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
    const user: User = tokenDecoded?.user;
    if (user.type === UserType.Auditor) {
      try {
        //let newToken = renewToken(token);
        let diagram = await diagramsService.getOne(Number.parseInt(req.params.id));
        let payload: APIPayload<Diagram> = new APIPayload<Diagram>(diagram, token!);
        res.status(200).send(payload);
      }
      catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
    else {
      res.sendStatus(401);
    }
}

export async function createDiagram(req: express.Request, res: express.Response) {
    // NO IMPLEMENTAR
    throw new Error("Action not allowed.");
}

export async function updateDiagram(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
    const user: User = tokenDecoded?.user;
    if (user.type === UserType.Auditor) {
      try {
        //let newToken = renewToken(token);
        let newdiagram = new Diagram();
        newdiagram = Diagram.fromJSON(req.body);
        let olddiagram = await diagramsService.getOne(newdiagram.id_diag)
        olddiagram.state = newdiagram.state;
        olddiagram.valid_by = user.id_usu;
        let diagram = await diagramsService.update(olddiagram, user.id_usu);
        let payload: APIPayload<Diagram> = new APIPayload<Diagram>(diagram, token!);
        res.status(200).send(payload);
      }
      catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
    else {
      res.sendStatus(401);
    }
}

export async function deleteDiagram(req: express.Request, res: express.Response) {
    // NO IMPLEMENTAR
    throw new Error("Action not allowed.");
}