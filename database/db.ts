import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { passwordCreate } from "../utils/passwordCreate"
import { authentication, CustomRequest } from "../middlewares/auth";
import { JwtPayload } from "jsonwebtoken";

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
                    carts: true,
                    likes: true
                }

            }
        );

        return user;
    }

    async getUserLikes(req: Request) {
        const token = (req as CustomRequest).token as JwtPayload;
        const userId = token.id;

        const likes = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            },
            select: {
                likes: true
            }
        })

        return likes;
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
                include: {
                    category: true,
                    highlights: true,
                    likes: {
                        where: {
                            userId: Number(req.params.userId)
                        },

                    }
                }


            }
        );

        return user;
    }



    async getProducts(req: Request) {
        const page = req.query.page;
        const sort = req.query.sort;
        const level = req.query.level;
        const take = req.query.take;
        const categoryId = req.query.categoryId;
        const search = req.query.search;
        const token = (req as CustomRequest).token as JwtPayload;
        const userId = token.id;
        const highest = (level + '').toLowerCase() === 'true'
        var orderBy = {};
        switch (sort) {
            case 'time':
                orderBy = { createdAt: highest ? 'asc' : 'desc' }
                break;
            case 'money':
                orderBy = { price: highest ? 'asc' : 'desc' }

                break;
            case 'rate':
                orderBy = { rate: highest ? 'asc' : 'desc' }

                break;

            default:
                break;
        }

        const t = take === undefined || take === null ? undefined : Number(take);
        const p = page === undefined || page === null ? undefined : Number(page);
        const ci = categoryId === undefined || categoryId === null ? undefined : Number(categoryId);
        const s: any = search === undefined || search === null ? undefined : search;
        var skip: any;
        if ((t !== undefined && t !== null) && (p !== undefined && p !== null)) {
            if (p != 0) {
                skip = t * (p - 1);

            }
        }

        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                isAvailable: true,
                mainImageUrl: true,
                rate: true,
                category: true,
                createdAt: true,
                likes: {
                    where: {
                        userId: userId
                    },
                }
            },
            take: t,
            skip: skip,
            orderBy: orderBy,
            where: {
                categoryId: ci,
                name: {
                    contains: s,
                    mode: "insensitive"
                }
            },

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

class category {
    async getCategories(take?: any) {

        const t = take === undefined || take === null ? undefined : Number(take);

        const categories = await prisma.category.findMany({ take: t });
        return categories;
    }
}
export const categoryDb = new category();

class Like {
    async getLikedProduct(req: Request) {
        const user = await userDb.getUserLikes(req);
        var products: any = [];
        if (user !== null) {
            for (let index = 0; index < user.likes.length; index++) {
                const element = user.likes[index];
                const product = await prisma.product.findUnique({
                    where: {
                        id: Number(element.productId)
                    },
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        isAvailable: true,
                        mainImageUrl: true,
                        rate: true,
                        category: true,
                        createdAt: true,
                    },
                });
                products.push(product);

            }
        }

        return products;


    }
    async setLike(req: Request) {
        const like = await prisma.like.create({
            data: {
                productId: Number(req.params.id),
                userId: Number(req.params.userId)
            }
        });
        if (like === undefined || like === null) {
            return false;
        } else {
            return true;
        }
    }

    async removeLike(req: Request) {

        const like = await prisma.like.deleteMany({
            where: {
                AND: [
                    { productId: Number(req.params.id) },
                    { userId: Number(req.params.userId) }
                ]
            }
        });
        console.log(like.count);

        if (like.count === 0) {
            return true;
        } else {
            return false;
        }
    }

    async getLike(userId: number, productId: number) {

        const like = await prisma.like.findUnique({
            where: {
                userId_productId: {
                    userId: userId,
                    productId: productId
                }
            }
        });
        if (like === undefined || like === null) {
            return false;
        } else {
            return true;
        }
    }
}

export const likeDb = new Like();

class Cart {
    async getCarts(req: Request) {
        const token = (req as CustomRequest).token as JwtPayload;
        const userId = token.id;
        const isProdoct = req.query.p;

        const carts = await prisma.cart.findMany({
            where: {
                userId: userId
            },
            include: {
                products: isProdoct === null || isProdoct === undefined ? false : {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                isAvailable: true,
                                mainImageUrl: true,
                                rate: true,
                                category: true,
                                createdAt: true,
                                likes: {
                                    where: {
                                        userId: userId
                                    },
                                }
                            },
                        }
                    }
                },
            }

        });
        return carts;
    }

    async getCart(id: number) {
        const cart = await prisma.cart.findUnique({
            where: {
                id: id
            }
        });
        return cart;
    }

    async addCart(req: Request) {
        const cart = await prisma.cart.create(
            {
                data: req.body,
            }
        )
        return cart;
    }

    async addItem(req: Request) {
        const isAvailable = await prisma.itemInCart.findUnique({
            where: {
                cartId_productId: {
                    cartId: Number(req.params.id),
                    productId: req.body.productId
                }
            }
        });
        console.log(isAvailable);

        var cart: any;
        if (isAvailable === null || isAvailable === undefined) {
            cart = await prisma.itemInCart.create(
                {
                    data: {
                        count: req.body.count,
                        cartId: Number(req.params.id),
                        productId: req.body.productId
                    },

                }
            )
        } else {
            cart = await prisma.itemInCart.update(
                {
                    where: {
                        cartId_productId: {
                            cartId: Number(isAvailable?.cartId),
                            productId: Number(isAvailable?.productId)
                        }
                    },
                    data: {
                        count: req.body.count,
                    }

                }
            )


        }
        console.log(cart);

        return cart;
    }

    async deleteItemInCarts(req: Request) {
        const id = Number(req.params.id);
        const productId = Number(req.params.productId);
        const productInCart = await prisma.itemInCart.delete({
            where: {
                cartId_productId: {
                    cartId: id,
                    productId: productId
                }
            }
        });

        if (productInCart.count === 0) {
            return false;
        } else {
            return true;
        }
    }

    async deleteCart(req: Request) {
        const id = Number(req.params.id);
        const productInCart = await prisma.cart.delete({
            where: {
                id: id
            }
        });
    }
}
export const cartDb = new Cart();
