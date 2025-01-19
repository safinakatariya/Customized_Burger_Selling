import express from 'express';
import { getBurgers, getBurgerById, createBurger, updateBurger, deleteBurger, createCustomBurger } from '../controllers/burgerController.js';

const router = express.Router();

router.get('/', getBurgers);
router.get('/:id', getBurgerById);
router.post('/', createBurger);
router.put('/:id', updateBurger);
router.delete('/:id', deleteBurger);
router.post('/custom', createCustomBurger); 

export default router;