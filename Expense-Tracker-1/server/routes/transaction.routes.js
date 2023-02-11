// imports
import express from "express";
import {
	createTransaction,
	getAllTransactions,
	deleteTransaction,
	updateTransaction,
} from "../controllers/transaction.controller.js";

// Create express router
const router = express.Router();

router.post("/transaction", createTransaction);

router.get("/transactions", getAllTransactions);

router.delete("/transaction/:id", deleteTransaction);

router.patch("/transaction/:id", updateTransaction);

export default router;
