import { productDb } from "../database/db";
import { Request, Response } from "express";
import validRequest from "../utils/validationResult";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class Product {
    async getProduct(req: Request, res: Response) {
        validRequest(req, res);

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
            const sort = req.query.sort;
            const level = req.query.level;
            const take = req.query.take;
            const products = await productDb.getProducts(sort, level, take);

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



}
export const productController = new Product();
