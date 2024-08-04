import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export interface CustomError {
    name: string,
    message: string,
    expiredAt: string
}


class Authentication {
    async create(id: number, username: string) {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY environment variable is not set");
        }
        const token = jwt.sign(
            { id: id, username: username },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );
        return token;
    }

    async auth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                res.status(401).json({ status: 401, message: "Token Please!" });
                return;
            }
            if (!process.env.JWT_SECRET_KEY) {
                res.status(500).json({ status: 500, message: "JWT_SECRET_KEY environment variable is not set" });
                return;
            }

            const decoded = jwt.verify(token!, process.env.JWT_SECRET_KEY);
            (req as CustomRequest).token = decoded;

            next();
        } catch (err) {
            if ((err as CustomError).name === 'TokenExpiredError') {
                return res.status(401).send({ status: 401, message: 'نشست منقضی شده است' });

            }
            return res.status(500).send({ status: 500, message: err });
        }
    }
}

export const authentication = new Authentication();