import dotenv from 'dotenv';
import { errorLogger } from './middlewares/logger';

dotenv.config();

interface Config {
  port: number;
  db: {
    address: string;
  };
  upload: {
    path: string;
    pathTemp: string;
  };
  originAllow: string;
  auth: {
    refreshTokenExpiry: string;
    accessTokenExpiry: string;
  };
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key];

  if (!value && !defaultValue) {
    const message = `Переменная окружения ${key} не установлена`;
    errorLogger.error(message);
    throw new Error(message);
  }

  return value || defaultValue || '';
};

const config: Config = {
  port: parseInt(getEnvVariable('PORT', '3000'), 10),
  db: {
    address: getEnvVariable('DB_ADDRESS', 'mongodb://127.0.0.1:27017/weblarek'),
  },
  upload: {
    path: getEnvVariable('UPLOAD_PATH', 'images'),
    pathTemp: getEnvVariable('UPLOAD_PATH_TEMP', 'temp'),
  },
  originAllow: getEnvVariable('ORIGIN_ALLOW', 'http://localhost:5173'),
  auth: {
    refreshTokenExpiry: getEnvVariable('AUTH_REFRESH_TOKEN_EXPIRY', '7d'),
    accessTokenExpiry: getEnvVariable('AUTH_ACCESS_TOKEN_EXPIRY', '1m'),
  },
};

export default config;
