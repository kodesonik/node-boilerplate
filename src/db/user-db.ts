import { User } from "@prisma/client";
import Query from "./query";

export default class UserDb extends Query<User> {
    constructor() {
        super('user')
    }

    // 
}