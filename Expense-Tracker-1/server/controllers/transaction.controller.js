import TransactionModel from "../models/transaction.model.js";

export const createTransaction = async (req, res, next) => {
	const { amount, description, date } = req.body;

	try {
		// create the transaction inside the mongodb
		const transaction = await TransactionModel.create({
			amount,
			description,
			date,
		});
		res.status(201).json({
			msg: "Form Data Recieved...",
			data: transaction,
		});
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
};

export const getAllTransactions = async (req, res, next) => {
	try {
		const transactions = await TransactionModel.find({}).sort({
			createdAt: -1,
		});

		res.status(200).json({ status: "Success", data: transactions });
	} catch (error) {
		res.status(500).json({ status: "Failed", message: error.message });
	}
};
