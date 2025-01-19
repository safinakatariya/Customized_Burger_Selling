import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);

router.get('/',authenticateToken, getUsers);
router.get('/:id',authenticateToken, getUserById);
router.post('/', createUser);
router.put('/:id',authenticateToken, updateUser);
router.delete('/:id',authenticateToken, deleteUser);

export default router;