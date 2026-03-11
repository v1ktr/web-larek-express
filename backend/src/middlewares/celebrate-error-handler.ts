import { Request, Response, NextFunction } from 'express';
import { isCelebrateError, CelebrateError } from 'celebrate';

import BadRequestError from '../errors/bad-request-error';

const getCelebrateErrorMessage = (err: CelebrateError): string => Array.from(err.details.values())
  .flatMap((error) => error.details)
  .map((detail) => detail.message)
  .join(', ') || 'Ошибка валидации данных';

const celebrateErrorHandler = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (isCelebrateError(err)) {
    const message = getCelebrateErrorMessage(err);
    return next(new BadRequestError(message));
  }

  return next(err);
};

export default celebrateErrorHandler;
