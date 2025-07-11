import express from "express";
import { createProduct, deleteProduct, updateProduct, getProduct } from "../controllers/products.js"

const router = express.Router();

router.get('/',getProduct)
router.patch('/:id',updateProduct)
router.delete('/:id',deleteProduct)
router.post('/',createProduct)

export default router;
