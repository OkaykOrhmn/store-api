import { body, header, param, query } from "express-validator";
import { validationMessages } from "../data/validationMessages";

const cartId = param("id")
    .isInt()
    .withMessage(validationMessages.isInt);

const userId = body("userId")
    .isInt()
    .withMessage(validationMessages.isInt);

const status = body("status")
    .isInt()
    .withMessage(validationMessages.isInt);

const name = body("name")
    .exists()
    .withMessage(validationMessages.requied);

const productId = body("productId")
    .isInt()
    .withMessage(validationMessages.isInt);

const count = body("count")
    .isInt()
    .withMessage(validationMessages.isInt);



export const validatiors = {
    cartId: [cartId],
    cart: [userId, name],
    editcart: [cartId, productId, count]

}