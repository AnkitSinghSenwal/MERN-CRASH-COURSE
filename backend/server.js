import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
// import Product from './models/product.model.js';
import productRoute from './routes/product.route.js';
import path from 'path'

dotenv.config() 

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/products', productRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


// app.get("/api/products/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({ message: 'product not found' })
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// })

// app.post("/api/products", async (req, res) => {
//     const product = req.body; // user will sent this data
//     if (!product.name || !product.price || !product.image) {
//         res.status(400).json({ success: false, message: "Please provide all fields" });
//     }

//     const newProduct = new Product(product);
//     try {
//         await newProduct.save()
//         res.status(201).json({ success: true, message: "new product created", data: newProduct })
//     } catch (error) {
//         console.error("Error in creating product:", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });

//     }
// })

app.listen(port, () => {
    connectDB();
    console.log(`Server started at http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.send("Welcome to the Node API! Server is up and running.")
});
