import express from "express";
import { addTransaction, deleteTransaction, getTransaction, updateTransaction } from "../controllers/transaction.js";

const router = express.Router();

router.get("/", getTransaction);
router.post("/add", addTransaction);
router.put("/:id/edit", updateTransaction);
router.delete("/:id/delete", deleteTransaction);

export default router;