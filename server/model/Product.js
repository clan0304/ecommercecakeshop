import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
  },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
