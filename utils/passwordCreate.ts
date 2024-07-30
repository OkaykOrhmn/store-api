import bcrypt from 'bcrypt'
import { userDb } from "../database/db";

class PasswordCreate {

    async generatePassword(password: string) {
        const saltRounds = 10; // Typically a value between 10 and 12
        const result = bcrypt.hashSync(password, saltRounds);
        return result;
    }

    async verifyPassword(password: string, username: string) {
        const user = await userDb.getUserPasswordByUsername(username);
        if (user === undefined || user === null) {
            return false;
        } else {
            const isValid = await bcrypt.compare(password, user.password);
            return isValid;
        }
    }

}

export const passwordCreate = new PasswordCreate();
