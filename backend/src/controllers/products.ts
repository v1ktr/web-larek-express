import { Request, Response, NextFunction } from 'express';

import Product from '../models/product';
import ConflictError from '../errors/conflics-error';

// Получение всех товаров
const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({});
    res.set('Content-Type', 'application/json');
    return res.status(200).json(
      {
        items: products,
        total: products.length,
      },
    );
  } catch (error) {
    return next(error);
  }
};

// Создание товара
const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      image,
      category,
      description,
      price,
    } = req.body;

    const product = new Product({
      title,
      image,
      category,
      description,
      price,
    });

    await product.save();
    res.set('Content-Type', 'application/json');
    return res.status(201).json(product);
  } catch (error) {
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким title уже существует'));
    }
    return next(error);
  }
};

export { createProduct, getAllProducts };
