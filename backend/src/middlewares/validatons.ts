import { Joi, celebrate } from 'celebrate';

const validateProductBody = celebrate(
  {
    body: Joi.object({
      title: Joi.string().min(2).max(30).required()
        .messages({
          'string.min': 'Название не должно быть короче 2 символов',
          'string.max': 'Название не должно быть длиннее 30 символов',
          'any.required': 'Название товара обязательно',
          'string.base': 'Название должно быть строкой',
          'string.empty': 'Название не может быть пустым',
        }),
      image: Joi.object({
        fileName: Joi.string().required().messages({
          'string.base': 'Имя файла должно быть строкой',
          'any.required': 'Имя файла обязательно',
        }),
        originalName: Joi.string().required().messages({
          'string.base': 'Оригинальное имя файла должно быть строкой',
          'any.required': 'Название обязательно',
        }),
      }).required().messages({
        'any.required': 'Изображение обязательно',
      }),
      category: Joi.string().required().messages({
        'any.required': 'Категория обязательна',
        'string.base': 'Категория должна быть строкой',
        'string.empty': 'Категория не может быть пустой',
      }),
      description: Joi.string().allow('').optional().messages({
        'string.base': 'Описание должно быть строкой',
      }),
      price: Joi.number()
        .min(0)
        .allow(null)
        .optional()
        .default(null)
        .messages({
          'number.base': 'Цена должна быть числом',
          'number.min': 'Цена не может быть отрицательной',
        }),
    }),
  },
  {
    abortEarly: false,
  },
);

const validateOrderBody = celebrate(
  {
    body: Joi.object({
      payment: Joi.string()
        .required()
        .valid('card', 'online')
        .messages({
          'any.required': 'Способ оплаты обязательно',
          'any.only': 'Способ оплаты должно быть "card" или "online"',
          'string.empty': 'Способ оплаты не может быть пустой',
        }),
      email: Joi.string()
        .email()
        .required()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .messages({
          'any.required': 'Email обязателен',
          'string.email': 'Невалидный формат email',
        }),
      phone: Joi.string()
        .required()
        .messages({
          'any.required': 'Телефон обязателен',
        }),
      address: Joi.string()
        .required()
        .messages({
          'string.base': 'Адрес должен быть строкой',
          'any.required': 'Адрес обязателен',
        }),
      total: Joi.number()
        .positive()
        .required()
        .messages({
          'number.base': 'Сумма должна быть числом',
          'number.positive': 'Сумма должна быть положительным числом',
          'any.required': 'Сумма обязательна',
        }),
      items: Joi.array()
        .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
        .min(1)
        .required()
        .messages({
          'any.required': 'Товары обязательны',
          'array.base': 'Товары должны быть массивом',
          'array.min': 'Товары должны содержать минимум 1 элемент',
          'string.pattern.base': 'ID товара должен быть валидным',
        }),
    }),
  },
  {
    abortEarly: false,
  },
);

export { validateProductBody, validateOrderBody };
