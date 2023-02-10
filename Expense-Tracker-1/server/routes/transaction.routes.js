// imports
import express from "express";
import {
	createTransaction,
	getAllTransactions,
} from "../controllers/transaction.controller.js";


// Create express router
const router = express.Router();

router.post("/transaction", createTransaction);

router.get("/transactions", getAllTransactions);

export default router;
