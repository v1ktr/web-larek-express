import express from 'express';
import { validateProductBody } from '../middlewares/validatons';
import { createProduct, getAllProducts } from '../controllers/products';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', validateProductBody, createProduct);

export default router;
