import { body, header, param, query } from "express-validator";
import { validationMessages } from "../data/validationMessages";

const appId = body("id")
    .isInt()
    .withMessage(validationMessages.isInt);

const username = body("username")
    .exists()
    .bail()
    .withMessage(validationMessages.requied)
    .isLength({ min: 4 })
    .withMessage(validationMessages.minLength(4));

const password = body("password")
    .exists()
    .bail()
    .withMessage(validationMessages.requied)
    .isLength({ min: 8 })
    .withMessage(validationMessages.minLength(8));

const userList = body("userList")
    .exists()
    .bail()
    .withMessage(validationMessages.requied)
    .isArray()
    .withMessage(validationMessages.isArray);

const userId = param("id")
    .isInt()
    .withMessage(validationMessages.isInt);


const token = header("Authorization")
    .exists()
    .withMessage(validationMessages.requied)

export const validatiors = {
    editName: [appId, username, token],
    register: [username, password],
    login: [token],
    users: [userList, token],
    user: [userId, token],


};