import express from 'express'
import { authentication } from "../middlewares/auth";
import { cartController } from "../controller/cart";
import { validatiors } from "../middlewares/cart";

const router = express.Router()
router.get('/', authentication.auth, cartController.getCardList);
router.get('/:id', validatiors.cartId, authentication.auth, cartController.getCard);
router.post('/', validatiors.cart, authentication.auth, cartController.createCart);
router.put('/:id', validatiors.editcart, authentication.auth, cartController.putItemCart);


export default router;
