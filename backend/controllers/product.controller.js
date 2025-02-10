import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: "no products found or product is empty" })
        }
        return res.status(200).json({ success: true, data: products })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" })
        }
        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error: ", error.message);
        return res.status(500).json({ success: false, message: "server error" });
    }
}

const addProduct = async (req, res) => {

    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        return res.status(201).json({ success: true, message: "product added successfully", data: newProduct });
    } catch (error) {
        console.error("Error in creating product: ", error.message);
        return res.status(500).json({ success: false, message: "server error" });
    }
}

const updateProduct = async (req, res) => {
    try {

        const { name, price, image } = req.body;
        // Check for missing or invalid values
        if (!name || name.trim() === "") {
            return res.status(400).json({ success: false, message: "Name is required" });
        }
        if (typeof price !== "number" || price <= 0) {
            return res.status(400).json({ success: false, message: "Price must be at least 0.01" });
        }
        if (!image || image.trim() === "") {
            return res.status(400).json({ success: false, message: "Image URL is required" });
        }

        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" })
        }
        return res.status(200).json({ success: true, message: "Product updated successfully", data: product })
    } catch (error) {
        console.error("Error in updating product: ", error.message);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'product not found' })
        }
        return res.status(200).json({ success: true, message: 'product deleted successfully' })
    } catch (error) {
        console.error("Error: ", error.message);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

export {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
};