import jwt, { Secret, TokenExpiredError } from 'jsonwebtoken';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { UserType } from '../types/user.type';
import { TokenPayload } from '../types/token-payload.type';
import crypto from 'crypto';
import { Link } from '../types/link.type';

export function authenticateToken(req: any, res: any, next: any) {
    if (req.originalUrl != "/login" && req.originalUrl != "/") {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]
        try {
            if (token == null) return res.sendStatus(401)
            var user = jwt.verify(token, process.env.TOKEN_SECRET as string);
            req.user = user;
            next();
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).send("Token expired");
            }
            return res.status(403).send("Invalid token");
        }
    }
    else {
        next();
    }
};

export function generateAccessToken(payload: any) {
    payload.user.password = "";
    let secret: Secret = process.env.TOKEN_SECRET as string;
    return jwt.sign(payload, secret, { expiresIn: '600s' });
};

export function decodeToken(authHeader: any) {
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        throw new Error("Token is null");
    const tokenDecoded: TokenPayload = ((jwt_decode<JwtPayload>(token || '') || null) as TokenPayload);
    return tokenDecoded;
}

export function hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export function routesForUserType(userType: UserType) {
    const routes: Link[] = [];
    switch (userType) {
        case UserType.Administrador:
            routes.push(new Link("Users", "/users"));
            routes.push(new Link("Diagrams", "/admin_diagrams"));
            routes.push(new Link("Parts", "/parts"));
            break;
        case UserType.Operario:
            routes.push(new Link("Diagrams", "/operator_diagrams"));
            routes.push(new Link("Parts", "/parts"));
            break;
        case UserType.Auditor:
            routes.push(new Link("Diagrams", "/auditor_diagrams"));
            break;
    }
    return routes;
}

export function verifyToken(token: string) {
    try {
        var user = jwt.verify(token, process.env.TOKEN_SECRET as string);
        return user;
    } catch (err) {
        return null;
    }
}