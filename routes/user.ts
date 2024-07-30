import express from "express";
import { userController } from "../controller/user";
import { validatiors } from "../middlewares/user";
import { authentication } from "../middlewares/auth";

const router = express.Router()

router.get('/login', validatiors.login, authentication.auth, userController.getUser);
router.post('/register', validatiors.register, userController.postUser);
router.put('/user/username', validatiors.editName, authentication.auth, userController.putUsername);
router.delete('/user/delete', validatiors.user, authentication.auth, userController.deleteUser);
// router.get('/user', authentication.auth, userController.getUsers);
// router.get('/user/:id', authentication.auth, userController.getUserById);
// router.post('/many', validatiors.users, authentication.auth, userController.postManyUser);

export default router;
