import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { isCelebrateError, CelebrateError } from 'celebrate';

import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflics-error';
import NotFoundError from '../errors/not-found-error';

const getCelebrateErrorMessage = (err: CelebrateError): string => Array.from(err.details.values())
  .flatMap((error) => error.details)
  .map((detail) => detail.message)
  .join(', ') || 'Ошибка валидации данных';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (isCelebrateError(err)) {
    const message = getCelebrateErrorMessage(err);
    return res.status(400).json({ message });
  }

  if (
    [BadRequestError, ConflictError, NotFoundError].some((ErrorClass) => err instanceof ErrorClass)
  ) {
    return res.status((err as any).statusCode).json({
      message: err.message,
    });
  }
  if (err instanceof MongooseError.ValidationError) {
    next(new BadRequestError(err.message));
  }
  if (err instanceof Error && err.message.includes('E11000')) {
    return res.status(409).json({
      message: 'Товар уже существует',
    });
  }

  return res.status(500).json({ message: 'Ошибка сервера' });
};

export default errorHandler;
