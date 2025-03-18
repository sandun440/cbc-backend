import express from "express";
import { createProduct, getProduct, deleteProduct, updateProduct, getProductById, searchProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct)
productRouter.get("/", getProduct)
productRouter.get("/search/:query", searchProduct)
productRouter.get("/:productId", getProductById)
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProduct)


export default productRouter;