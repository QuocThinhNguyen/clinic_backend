import express from "express";
import { createUserController,loginUserController,updateUserController, deleteUserController, getAllUserController, 
    getDetailsUserController, refreshToken } from "../controllers/UserController.js";
import { authMiddleware,authUserMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/sign-up',createUserController)
router.post('/sign-in',loginUserController)
router.put('/update-user/:id',updateUserController)
router.delete('/delete-user/:id',authMiddleware ,deleteUserController)
router.get('/getAll',authMiddleware, getAllUserController)
router.get('/get-details/:id',authUserMiddleware , getDetailsUserController)
router.post('/refresh_token',refreshToken)

export default router