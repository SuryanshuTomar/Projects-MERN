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

export const deleteTransaction = async (req, res, next) => {
	const { id } = req.params;
	console.log(id);
	try {
		const deletedTransaction = await TransactionModel.findByIdAndDelete(id);
		res.status(200).json({ status: "Success", data: deletedTransaction });
	} catch (error) {
		res.status(500).json({ status: "Failed", message: error.message });
	}
};

export const updateTransaction = async (req, res, next) => {
	const data = req.body;
	console.log(data);
	try {
		const updatedTransaction = await TransactionModel.findOneAndUpdate(
			{
				_id: data._id,
			},
			data,
			{ new: true, runValidators: true }
		);
		console.log(updatedTransaction);
		res.status(200).json({ status: "Success", data: updatedTransaction });
	} catch (error) {
		res.status(500).json({ status: "Failed", message: error.message });
	}
};
