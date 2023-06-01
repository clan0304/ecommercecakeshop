import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import productRouter from './route/product.js';

import { createProduct, updateProduct } from './controller/product.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'Images')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/createproduct', upload.single('picture'), createProduct);
app.put('/product/:id', upload.single('picture'), updateProduct);
app.use('/product', productRouter);

const PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is connected to ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
