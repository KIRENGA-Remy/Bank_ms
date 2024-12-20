import express from 'express';
import { createUser } from '../controllers/createUser' 
import { getAllUsers } from '../controllers/getAllUsers'
import { getUserById } from '../controllers/getUserById'
import { updateUser } from '../controllers/updateUser'
import { deleteUser } from '../controllers/deleteUser'
import { loginUser } from '../controllers/loginUser'

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
