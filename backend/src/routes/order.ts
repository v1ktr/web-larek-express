import express from 'express';
import { validateOrderBody } from '../middlewares/validatons';
import { createOrder } from '../controllers/order';

const router = express.Router();
router.post('/', validateOrderBody, createOrder);

export default router;
