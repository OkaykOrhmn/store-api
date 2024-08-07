import { userDb, likeDb } from "../database/db";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { authentication, CustomRequest } from "../middlewares/auth";
import { JwtPayload } from "jsonwebtoken";
import validRequest from "../utils/validationResult";
import { passwordCreate } from "../utils/passwordCreate";

class User {

    async getLikedProduct(req: Request, res: Response) {
        validRequest(req, res)

        try {

            const products = await likeDb.getLikedProduct(req);

            if (products === undefined || products === null) {
                res.status(400).json({ status: 400, message: `products Not Exist!` });
            } else {
                res.status(200).json({ status: 200, liked: products });

            }

        } catch (e) {

            res.status(500).json({ status: 500, message: e });
        }

    }

    async getUser(req: Request, res: Response) {
        validRequest(req, res);

        const token = (req as CustomRequest).token as JwtPayload;
        req.params.id = token.id;

        try {
            const user = await userDb.getUserById(req);

            if (user === undefined || user === null) {
                res.status(400).json({ status: 400, message: `User Not Exist!` });

            } else {
                res.status(200).json({ status: 200, user: user });

            }

        } catch (e) {

            res.status(500).json({ status: 500, message: e });
        }

    }

    async loginUser(req: Request, res: Response) {
        validRequest(req, res);
        var { username, password } = req.body;

        try {
            const { user, isValid } = await passwordCreate.verifyPassword(password, username);
            if (user === undefined || user === null) {
                res.status(400).json({ status: 400, message: `!!کاربر وجود ندارد` });

            } else {
                if (isValid) {
                    const token = await authentication.create(user.id, user.username);
                    res.status(200).json({ status: 200, user: { id: user.id, username: user.username }, token: token });

                } else {
                    res.status(400).json({ status: 400, message: `!!رمز اشتباه است` });

                }

            }

        } catch (e) {

            res.status(500).json({ status: 500, message: e });
        }




    }



    async postUser(req: Request, res: Response) {
        validRequest(req, res);

        try {
            const user = await userDb.createUser(req);
            if (user === undefined || user === null) {
                res.status(400).json({ status: 400, message: `User with id: ${req.params.id} Not Exist` });
            } else {
                const token = await authentication.create(user.id, user.username);
                res.status(200).json({ status: 200, user: user, token: token });

            }
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                res.status(422).json({ status: 422, message: "!!کاربر وجود دارد" });
                return;
            }
            res.status(500).json({ status: 500, message: e });
        }
    }

    async putUsername(req: Request, res: Response) {
        validRequest(req, res);

        try {
            const user = await userDb.changeUsername(req);
            if (user === undefined || user === null) {
                res.status(400).json({ status: 400, message: `User with id: ${req.params.id} Not Exist` });
            } else {
                res.status(200).json({ status: 200, user: user });

            }
        } catch (e) {
            res.status(500).json({ status: 500, message: e });
        }
    }


    async deleteUser(req: Request, res: Response) {
        validRequest(req, res);

        try {
            const user = await userDb.deleteUser(req);
            if (user === undefined || user === null) {
                res.status(400).json({ status: 400, message: `User with id: ${req.params.id} Not Exist` });
            } else {
                res.status(200).json({ status: 200, user: user });

            }
        } catch (e) {
            res.status(500).json({ status: 500, message: e });
        }
    }

    /* async getUsers(req: Request, res: Response) {
        try {
            const users = await userDb.getUsers();
            if (users === undefined || users === null) {
                res.status(400).json({ status: 400, message: `User with id: ${req.params.id} Not Exist` });
            } else {
                console.log(users);

                res.status(200).json({ status: 200, user: users });

            }
        } catch (e) {
            res.status(500).json({ status: 500, message: e });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await userDb.getUserById(req);
            if (user === undefined || user === null) {
                res.status(400).json({ status: 400, message: `User with id: ${req.params.id} Not Exist` });
            } else {
                res.status(200).json({ status: 200, user: user });

            }
        } catch (e) {

            res.status(500).json({ status: 500, message: e });
        }
    }

    async postManyUser(req: Request, res: Response) {
        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        try {
            const users = await userDb.createManyUsers(req);
            if (users === undefined || users === null) {
                res.status(400).json({ status: 400, message: `User with id: ${req.params.id} Not Exist` });
            } else {
                res.status(200).json({ status: 200, successUsers: users.successAdd, failUsers: { message: 'users is Excist Already!', users: users.errorAdd } });

            }
        } catch (e) {

            res.status(500).json({ status: 500, message: e });
        }
    } */
}
export const userController = new User();
