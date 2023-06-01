import express from 'express';
import {
  deleteProduct,
  getProduct,
  getProducts,
} from '../controller/product.js';

const router = express.Router();

router.delete('/:id', deleteProduct);
router.get('/:id', getProduct);
router.get('/', getProducts);
export default router;
