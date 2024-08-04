import express from 'express'
import { productController } from "../controller/product";
import { categoriesController } from "../controller/categories";
import { authentication } from "../middlewares/auth";
import { validatiors } from "../middlewares/product";

const router = express.Router()
router.get('', productController.getProducts);
router.get('/:id', validatiors.productId, authentication.auth, productController.getProduct);
router.post('/add', validatiors.product, productController.addProduct);


export default router;
