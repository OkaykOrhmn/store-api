import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { passwordCreate } from "../utils/passwordCreate"

const prisma = new PrismaClient();

class User {


    async getUserById(req: Request) {
        const id = req.params.id;
        const user = await prisma.user.findUnique(
            {
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    username: true,
                    password: false,
                }

            }
        );

        return user;
    }

    async createUser(req: Request) {
        var { username, password } = req.body;

        var hashPassword = await passwordCreate.generatePassword(password);
        if (hashPassword === null || hashPassword === undefined) {
            return;
        }
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashPassword
            },
            select: {
                id: true,
                username: true,
                password: false,

            }
        });
        return user;
    }

    async changeUsername(req: Request) {
        const { id, username } = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                username: username
            },
            select: {
                id: true,
                username: true,
                password: false,

            }
        });
        return updatedUser;
    }

    async deleteUser(req: Request) {
        const id = req.params.id;
        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                username: true,
                password: false,

            }
        }
        );
        return deletedUser;
    }

    async getUserPasswordByUsername(username: string) {
        const user = await prisma.user.findUnique(
            {
                where: {
                    username: username
                },

            }
        );

        return user;
    }

    /* async getUsers() {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                password: false,
                
            }
        });
        return users;
    }

    async createManyUsers(req: Request) {
        const { userList } = req.body;
        const usersBody: Register[] = userList;

        const successUsers: any[] = [];
        const errorUsers: any[] = [];
        for (let index = 0; index < usersBody.length; index++) {
            const element = usersBody[index];
            element.password = await passwordCreate.generatePassword(element.password!);
            try {

                const user = await prisma.user.create({
                    data:
                        element,
                    select: {
                        id: true,
                        username: true,
                        password: false,
                        
                    }

                });
                const token = await authentication.create(user.id, user.username);
                successUsers.push({ user: user, token: token });

            } catch (e) {
                element.password = 'PRIVATE';
                errorUsers.push(element);
            }

        }
        return {
            successAdd: successUsers,
            errorAdd: errorUsers
        };

    }

     */

}

export const userDb = new User();

class Product {
    async getProductById(req: Request) {
        const id = req.params.id;
        const user = await prisma.product.findUnique(
            {
                where: {
                    id: Number(id)
                },


            }
        );

        return user;
    }

    async getProducts() {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                isAvailable: true,
                mainImageUrl: true,
                rate: true,
                category: true
            }
        });
        return products;
    }

    async createProduct(req: Request) {
        const { highlights, ...data } = req.body;
        const product = await prisma.product.create({
            data: {
                ...data,
                highlights: {
                    createMany: {
                        data: highlights
                    }
                }
            }
        });
        return product;
    }
}

export const productDb = new Product();

