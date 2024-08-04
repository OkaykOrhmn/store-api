import express from 'express'
import { categoriesController } from "../controller/categories";
import { authentication } from "../middlewares/auth";

const router = express.Router()
router.get('/', authentication.auth, categoriesController.getCategories);


export default router;
