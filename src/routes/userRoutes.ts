import express, { Router } from 'express';


import { getall, addUser, updateUser, deleteUser} from '../controllers/userController';
const router: Router = express.Router();

//GET User
router.get('/', getall);
//POST User
router.post('/', addUser);
//Update User
router.put('/:id',updateUser)
//deeleteUser
router.put(':/id',deleteUser)

export default router;