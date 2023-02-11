// imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getAllTransactions,
	postTransaction,
	deleteTransaction,
	updateTransaction,
} from "../axios/ExpenseFetch";

const initialState = {
	data: [],
	status: "idle", // "idle" | "loading" | "succeeded" | "failed"
	error: null,
};

// Async Action Creator
export const getTransactions = createAsyncThunk(
	"transactions/getTransactions",
	async () => {
		return await getAllTransactions();
	}
);

export const addNewTransaction = createAsyncThunk(
	"transactions/addNewTransaction",
	async (payload) => {
		return await postTransaction(payload);
	}
);

export const editTransaction = createAsyncThunk(
	"transactions/editTransaction",
	async (payload) => {
		return await updateTransaction(payload);
	}
);

export const removeTransaction = createAsyncThunk(
	"transactions/removeTransaction",
	async (payload) => {
		return await deleteTransaction(payload);
	}
);

// create transactionSlice
const transactionSlice = createSlice({
	name: "transactions",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getTransactions.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(getTransactions.fulfilled, (state, action) => {
				state.data = action.payload.data;
				state.status = "succeeded";
			})
			.addCase(getTransactions.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewTransaction.fulfilled, (state, action) => {
				state.data = [action.payload.data, ...state.data];
			})
			.addCase(editTransaction.fulfilled, (state, action) => {
				if (!action.payload?.data._id) {
					console.log("Delete could not complete !");
					return;
				}

				const { _id } = action.payload.data;
				const data = state.data.filter((tranx) => tranx._id !== _id);
				console.log(data);
				state.data = [action.payload.data, ...data];
			})
			.addCase(editTransaction.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(removeTransaction.fulfilled, (state, action) => {
				if (!action.payload?.data._id) {
					console.log("Delete could not complete !");
					return;
				}

				const { _id } = action.payload.data;
				const data = state.data.filter((tranx) => tranx._id !== _id);
				state.data = data;
			})
			.addCase(removeTransaction.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

// export reducer
export default transactionSlice.reducer;

// export selectors
export const selectAllTransactions = (state) => state.transaction;
