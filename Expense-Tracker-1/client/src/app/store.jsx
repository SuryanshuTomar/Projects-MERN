// import
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/TransactionSlice";

// configure store
const store = configureStore({
	reducer: {
		transaction: transactionReducer,
	},
});

export default store;
