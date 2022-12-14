import { UserFilter } from "../types/user-filter.type";
import { User } from "../types/user.type";
import express from 'express';
import * as usersService from '../services/users.service';
import * as authHelper from '../helpers/auth.helper';
import { redisService } from "../services/redis.service";
import { TokenPayload } from "../types/token-payload.type";

export async function login(req: express.Request, res: express.Response) {
    let filter: UserFilter = new UserFilter();
    filter.nick_usu = req.body.username;
    let users: User[] = await usersService.getMany(filter);
    users = users.filter(user => user.nick_usu === req.body.username);
    if (users.length === 1) {
        if (users[0].password === authHelper.hashPassword(req.body.password)) {
            let token;
            if (process.env.USE_REDIS === "true") {
                token = await redisService.get(users[0].id_usu.toString());
            }
            else {
                token = null;
            }
            if (token == null) {
                let payload: TokenPayload = { 
                    user: users[0], 
                    routes: authHelper.routesForUserType(users[0].type) 
                };
                token = authHelper.generateAccessToken(payload);
            }
            else {
                let payload = authHelper.verifyToken(token);
                let tokenPayload: TokenPayload = payload as TokenPayload;
                if (tokenPayload == null) {
                    let tokenPayload: TokenPayload = {
                        user: users[0],
                        routes: authHelper.routesForUserType(users[0].type)
                    };
                    token = authHelper.generateAccessToken(tokenPayload);
                }
            }
            if (process.env.USE_REDIS === "true") {
                await redisService.set(users[0].id_usu.toString(), token);
            }
            res.status(200).json({ token: token });
        }
        else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    else {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

export async function logout(req: express.Request, res: express.Response) {
    const tokenDecoded = authHelper.decodeToken(req.headers.authorization);
    if (process.env.USE_REDIS === "true") {
        await redisService.del(tokenDecoded.user.id_usu.toString());
    }
    res.status(200).json({ message: "Logout successful" });
}