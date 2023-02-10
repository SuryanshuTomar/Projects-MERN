import axios from "axios";

export const expenseFetch = axios.create({
	baseURL: "http://localhost:8000/api/v1",
});

export const postTransaction = async (formData) => {
	return await expenseFetch.post("/transaction", formData, {
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const getAllTransactions = async () => {
	return await expenseFetch.get("/transactions");
};

export const getTransaction = async (id) => {
	return await expenseFetch.get(`/transaction/${id}`);
};

export const updateTransaction = async (transactionData) => {
	return await expenseFetch.put(`/transaction/${transactionData.id}`);
};

export const deleteTransaction = async (id) => {
	return await expenseFetch.delete(`/transaction/${id}`);
};
