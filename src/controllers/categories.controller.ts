import express from 'express';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Category } from '../types/category.type';
import { TokenPayload } from '../types/token-payload.type';
import * as categoriesService from "../services/categories.service";
import { APIPayload } from '../types/api-payload.type';
import { hashPassword } from '../helpers/auth.helper';
import { User, UserType } from '../types/user.type';
import { CategoryFilter } from '../types/category-filter.type';

export async function getAllCategories(req: express.Request, res: express.Response) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
  const user: User = tokenDecoded?.user;
  let filters = new CategoryFilter();

    try {
      //let newToken = renewToken(token);
      let diagram = await categoriesService.getMany(filters);
      let payload: APIPayload<Category[]> = new APIPayload<Category[]>(diagram, token!);
      res.status(200).send(payload);
    }
    catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
}


export async function getCategories(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
    const user: User = tokenDecoded?.user;
    let filters = req.body;
  
      try {
        //let newToken = renewToken(token);
        let diagram = await categoriesService.getMany(filters);
        let payload: APIPayload<Category[]> = new APIPayload<Category[]>(diagram, token!);
        res.status(200).send(payload);
      }
      catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
}


export async function getCategory(req: express.Request, res: express.Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
    const user: User = tokenDecoded?.user;
    if (user.type === UserType.Auditor) {
      try {
        //let newToken = renewToken(token);
        let diagram = await categoriesService.getOne(Number.parseInt(req.params.id));
        let payload: APIPayload<Category> = new APIPayload<Category>(diagram, token!);
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

export async function createCategory(req: express.Request, res: express.Response) {
    // NO IMPLEMENTAR
    throw new Error("Function not implemented.");
}

export async function updateCategory(req: express.Request, res: express.Response) {
    // NO IMPLEMENTAR
    throw new Error("Function not implemented.");
}

export async function deleteCategory(req: express.Request, res: express.Response) {
    // NO IMPLEMENTAR
    throw new Error("Function not implemented.");
}