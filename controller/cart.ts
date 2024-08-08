import { cartDb } from "../database/db";
import { Request, Response } from "express";
import validRequest from "../utils/validationResult";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class Cart {

    async getCardList(req: Request, res: Response) {
        validRequest(req, res)

        try {

            const carts = await cartDb.getCarts(req);

            if (carts === undefined || carts === null) {
                res.status(400).json({ status: 400, message: `products Not Exist!` });
            } else {
                res.status(200).json({ status: 200, carts: carts });

            }

        } catch (e) {

            res.status(500).json({ status: 500, message: e });
        }

    }

    async getCard(req: Request, res: Response) {
        validRequest(req, res)

        try {
            const id: number = Number(req.params.id);
            const cart = await cartDb.getCart(id);

            if (cart === undefined || cart === null) {
                res.status(400).json({ status: 400, message: `Cart Not Exist!` });
            } else {
                res.status(200).json({ status: 200, carts: cart });

            }

        } catch (e) {

            res.status(500).json({ status: 500, message: e });
        }

    }

    async createCart(req: Request, res: Response) {
        validRequest(req, res)

        try {
            const cart = await cartDb.addCart(req);

            if (cart === undefined || cart === null) {
                res.status(400).json({ status: 400, message: `Cart Not Exist!` });
            } else {
                res.status(200).json({ status: 200, carts: cart });

            }

        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                res.status(422).json({ status: 422, message: "Cart is Already Exist" });
                return;
            }
            res.status(500).json({ status: 500, message: e });
        }
    }

    async putItemCart(req: Request, res: Response) {
        validRequest(req, res)

        try {
            const cart = await cartDb.addItem(req);

            if (cart === undefined || cart === null) {
                res.status(400).json({ status: 400, message: `Cart Not Exist!` });
            } else {
                res.status(200).json({ status: 200, carts: cart });

            }

        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                res.status(422).json({ status: 422, message: "Cart is Already Exist" });
                return;
            }
            res.status(500).json({ status: 500, message: e });
        }
    }


    async deleteItemInCart(req: Request, res: Response) {
        validRequest(req, res)

        try {
            const cart = await cartDb.deleteItemInCarts(req);

            if (cart === undefined || cart === null) {
                res.status(400).json({ status: 400, message: `Cart Not Exist!` });
            } else {
                res.status(200).json({ status: 200, carts: cart });

            }

        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                res.status(422).json({ status: 422, message: "Cart is Already Exist" });
                return;
            }
            res.status(500).json({ status: 500, message: e });
        }
    }

    async deleteCart(req: Request, res: Response) {
        validRequest(req, res)

        try {
            const cart = await cartDb.deleteCart(req);

            if (cart === undefined || cart === null) {
                res.status(400).json({ status: 400, message: `Cart Not Exist!` });
            } else {
                res.status(200).json({ status: 200, carts: cart });

            }

        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                res.status(422).json({ status: 422, message: "Cart is Already Exist" });
                return;
            }
            res.status(500).json({ status: 500, message: e });
        }
    }



}
export const cartController = new Cart();
