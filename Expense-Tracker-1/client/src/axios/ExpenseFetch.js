import axios from "axios";

export const expenseFetch = axios.create({
	baseURL: "http://localhost:8000/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

export const postTransaction = async (formData) => {
	const response = await expenseFetch.post("/transaction", formData);
	return response.data;
};

export const getAllTransactions = async () => {
	const response = await expenseFetch.get("/transactions");
	return response.data;
};

export const getTransaction = async (id) => {
	const response = await expenseFetch.get(`/transaction/${id}`);
	return response.data;
};

export const updateTransaction = async (transactionData) => {
	const response = await expenseFetch.patch(
		`/transaction/${transactionData._id}`,
		transactionData
	);
	return response.data;
};

export const deleteTransaction = async (id) => {
	const response = await expenseFetch.delete(`/transaction/${id}`);
	return response.data;
};
