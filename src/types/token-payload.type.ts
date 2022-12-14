import { Link } from "./link.type";
import { User } from "./user.type";

export interface TokenPayload {
    user: User;
    routes: Link[];
}