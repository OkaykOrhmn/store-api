import { productDb, likeDb } from "../database/db";
import { Request, Response } from "express";
import validRequest from "../utils/validationResult";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { authentication, CustomRequest } from "../middlewares/auth";
import { JwtPayload } from "jsonwebtoken";

class Product {
    async getProduct(req: Request, res: Response) {
        validRequest(req, res);
        const token = (req as CustomRequest).token as JwtPayload;
        req.params.userId = token.id;

        try {
            const product = await productDb.getProductById(req);

            if (product === undefined || product === null) {
                res.status(400).json({ status: 400, message: `products Not Exist!` });

            } else {
                res.status(200).json({ status: 200, product: product });

            }

        } catch (e) {

            res.status(500).json({ status: 500, message: e });
        }

    }

    async getProducts(req: Request, res: Response) {
        validRequest(req, res)

        try {

            const products = await productDb.getProducts(req);

            if (products === undefined || products === null) {
                res.status(400).json({ status: 400, message: `products Not Exist!` });
            } else {
                res.status(200).json({ status: 200, newProducts: products });

            }

        } catch (e) {

            res.status(500).json({ status: 500, message: e });
        }

    }

    async addProduct(req: Request, res: Response) {
        validRequest(req, res);

        try {
            const product = await productDb.createProduct(req);

            if (product === undefined || product === null) {
                res.status(400).json({ status: 400, message: `products Not Exist!` });

            } else {
                res.status(200).json({ status: 200, newProduct: product });

            }

        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                res.status(422).json({ status: 422, message: "products is Already Exist" });
                return;
            }
            res.status(500).json({ status: 500, message: e });
        }

    }

    async putLike(req: Request, res: Response) {
        validRequest(req, res);

        const token = (req as CustomRequest).token as JwtPayload;
        req.params.userId = token.id;

        try {
            var like: boolean;
            console.log(req.body.like);

            if (req.body.like) {
                like = await likeDb.setLike(req);


            } else {
                like = await likeDb.removeLike(req);

            }
            console.log("leike " + like);

            res.status(200).json({ status: 200, like: like });




        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                res.status(422).json({ status: 422, message: "is Already" });
                return;
            }
            res.status(500).json({ status: 500, message: e });
        }

    }





}
export const productController = new Product();
