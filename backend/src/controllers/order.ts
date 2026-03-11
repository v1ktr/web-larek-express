import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';

import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

export interface OrderRequest {
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface OrderResponse {
  id: string;
  total: number;
}

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      total,
      items,
    } = req.body;

    // Получение товаров из базы
    const products = await Product.find({ _id: { $in: items } });
    // Проверка, что все товары найдены
    if (products.length !== items.length) {
      return next(new BadRequestError('Один или несколько товаров не найдены'));
    }
    // Проверка, что все товары продаются
    const allProductsAvailable = products.every((product) => product.price !== null);
    if (!allProductsAvailable) {
      return next(new BadRequestError('Один или несколько товаров недоступны для покупки'));
    }

    // Расчет общей стоимости
    const calculatedTotal = products.reduce((sum, product) => sum + (product.price || 0), 0);
    // Проверка, что переданная сумма совпадает с расчетной
    if (calculatedTotal !== total) {
      return next(new BadRequestError(`Неверная сумма. Ожидается ${calculatedTotal}, получено ${total}`));
    }
    // Валидация total
    if (typeof total !== 'number' || total <= 0) {
      return next(new BadRequestError('Сумма товаров должна быть положительным числом'));
    }

    // Генерация ID заказа
    const orderId = faker.string.uuid();

    // Ответ на успешный заказ
    return res.status(201).json({
      id: orderId,
      total: calculatedTotal,
    });
  } catch (error) {
    return next(error);
  }
};

export { createOrder };
