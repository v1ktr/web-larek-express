import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { statusCode = 500, message = 'Ошибка сервера' } = err;

  return res.status(statusCode).json({
    message,
  });
};

export default errorHandler;
