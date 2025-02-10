import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product Name is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be at least 0.01'],
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
        trim: true,
    },
}, {
    timestamps: true //createdAt, updatedAt
}
);

const Product = mongoose.model('Product',  productSchema );
// products
export default Product;