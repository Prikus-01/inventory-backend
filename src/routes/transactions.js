import express from "express";
import { createTransaction, deleteTransaction, updateTransaction, getTransaction, displayTransaction } from "../controllers/transactions.js"

const router = express.Router();

router.get('/',getTransaction)
router.get('/display',displayTransaction)
router.patch('/:id',updateTransaction)
router.delete('/:id',deleteTransaction)
router.post('/',createTransaction)

export default router;