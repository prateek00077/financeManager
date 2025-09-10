import express from "express";
import { addTransaction, deleteTransaction, getTransaction, updateTransaction } from "../controllers/transaction";

const router = express.Router();

router.get("/", getTransaction);
router.put("/edit/:id", updateTransaction);
router.delete("/delete/:id", deleteTransaction);
router.post("/add", addTransaction);

export default router;