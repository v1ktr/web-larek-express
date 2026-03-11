import mongoose from 'mongoose';

export interface IProduct {
    title: string;
    image: {
        fileName: string;
        originalName: string;
    };
    category: string;
    description: string;
    price?: number | null;
}

// добавить validate всепм полям
const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    minlength: [2, 'Название должно быть от 2 до 30 символов'],
    maxlength: [30, 'Название должно быть от 2 до 30 символов'],
    required: [true, 'Название товара обязательно'],
    unique: true,
    trim: true,
  },
  image: {
    type: {
      fileName: {
        type: String,
        required: [true, 'Имя файла обязательно'],
      },
      originalName: {
        type: String,
        required: [true, 'Оригинальное имя файла обязательно'],
      },
    },
    required: [true, 'Изображение обязательно'],
  },
  category: {
    type: String,
    required: [true, 'Категория товара обязательна'],
    trim: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: false,
    default: null,
    min: [0, 'Цена не может быть отрицательной'],
  },
});

export default mongoose.model<IProduct>('Product', productSchema);
