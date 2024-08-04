import { body, header, param, query } from "express-validator";
import { validationMessages } from "../data/validationMessages";

const productId = param("id")
    .isInt()
    .withMessage(validationMessages.isInt);

const name = body('name')
    .exists()
    .withMessage(validationMessages.requied);

const price = body('price')
    .exists()
    .withMessage(validationMessages.requied);

const isAvailable = body("isAvailable")
    .isBoolean()
    .withMessage(validationMessages.isBool);

const mainImageUrl = body('mainImageUrl')
    .exists()
    .withMessage(validationMessages.requied);

const category = body('categoryId')
    .isInt()
    .withMessage(validationMessages.isInt);

const description = body('description')
    .exists()
    .withMessage(validationMessages.requied);

const highlights = body('highlights')
    .isArray()
    .withMessage(validationMessages.isArray);



export const validatiors = {
    productId: [productId],
    product: [name, price, isAvailable, mainImageUrl, category, description, highlights],
    isAvailable: [isAvailable],

};