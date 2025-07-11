import express from "express";
import { getGodowns , updateGodown , deleteGodown , createGodown } from "../controllers/godowns.js"

const router = express.Router();

router.get('/',getGodowns)
router.patch('/:id',updateGodown)
router.delete('/:id',deleteGodown)
router.post('/',createGodown)

export default router;

