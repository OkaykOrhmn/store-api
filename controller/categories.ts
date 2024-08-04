import { categoryDb } from "../database/db";
import { Request, Response } from "express";
import validRequest from "../utils/validationResult";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class Categories {

    async getCategories(req: Request, res: Response) {
        validRequest(req, res)

        try {
            const take = req.query.take;

            const categories = await categoryDb.getCategories(take);

            if (categories === undefined || categories === null) {
                res.status(400).json({ status: 400, message: `categories Not Exist!` });
            } else {
                res.status(200).json({ status: 200, categories: categories });

            }

        } catch (e) {

            res.status(500).json({ status: 500, message: e });
        }

    }



}
export const categoriesController = new Categories();
