import { Router } from "express";
import {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/product.controller.js'


// Product Routes
// --------------------
// - GET '/'        : Retrieves a list of all products (getProducts).
// - GET '/:id'     : Retrieves a single product by its ID (getProduct).
// - POST '/'       : Adds a new product to the database (addProduct).
// - PUT '/:id'     : Updates an existing product by its ID (updateProduct).
// - DELETE '/:id'  : Deletes a product by its ID (deleteProduct).

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;