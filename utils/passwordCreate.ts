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
            return { user: user, isValid: false };
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            return { user: user, isValid: true };

        }

        return { user: user, isValid: false };

    }

}

export const passwordCreate = new PasswordCreate();
