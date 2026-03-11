import path from 'path';
import cors from 'cors';
import express from 'express';

import mongoose from 'mongoose';
import config from './config';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';
import NotFoundError from './errors/not-found-error';
import celebrateErrorHandler from './middlewares/celebrate-error-handler';

const app = express();
mongoose.connect(config.db.address);
app.use(cors());
app.use(requestLogger); // логирование запросов
app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам
app.use(express.json()); // для того чтобы сервер мог обрабатывать json-запрос

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use('*', (_req, _res, next) => {
  next(new NotFoundError('Путь не найден'));
});

app.use(errorLogger); // логирование ошибок
app.use(celebrateErrorHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Listening on port ${config.port}`);
});
