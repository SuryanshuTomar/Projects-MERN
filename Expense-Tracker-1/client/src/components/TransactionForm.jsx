import { useState } from "react";
import { expenseFetch } from "../axios/ExpenseFetch";

const TransactionForm = () => {
	const [formData, setFormData] = useState({
		amount: "",
		description: "",
		date: "",
	});

	const submitHandler = async (event) => {
		event.preventDefault();

		// Reset Form Data on Submission
		// setFormData({
		// 	amount: "",
		// 	description: "",
		// 	date: "",
		// });

		console.log(formData);
		try {
			const response = await expenseFetch.post("/transactions", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const onChangeHandler = (event) => {
		setFormData((prevData) => ({
			...prevData,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<form onSubmit={submitHandler}>
			<div>
				<label htmlFor="transactionAmount">Amount : </label>
				<input
					required
					type="number"
					name="amount"
					id="transactionAmount"
					aria-label="Enter the transaction amount"
					placeholder="Enter the transaction amount..."
					value={formData.amount}
					onChange={onChangeHandler}
				/>
			</div>
			<div>
				<label htmlFor="transactionDescription">Description : </label>
				<input
					required
					type="text"
					name="description"
					id="transactionDescription"
					aria-label="Enter transaction description"
					placeholder="Enter transaction description..."
					value={formData.description}
					onChange={onChangeHandler}
				/>
			</div>
			<div>
				<label htmlFor="transactionDate">Date : </label>
				<input
					required
					type="date"
					name="date"
					id="transactionDate"
					aria-label="Enter transaction date"
					value={formData.date}
					onChange={onChangeHandler}
				/>
			</div>
			<button>Submit</button>
		</form>
	);
};
export default TransactionForm;
