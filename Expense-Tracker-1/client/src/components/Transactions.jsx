import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllTransactions } from "../axios/ExpenseFetch";
import TransactionTable from "./TransactionTable";

const Title = styled.h3`
	text-align: center;
	margin: 1rem 0;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Transactions = () => {
	const [allTransactions, setAllTransactions] = useState([]);

	useEffect(() => {
		fetchTransactions();
		console.log("called");
	}, []);

	async function fetchTransactions() {
		console.log("called");
		try {
			const response = await getAllTransactions();
			setAllTransactions(response.data.data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Container>
			<Title>All Transactions</Title>
			<TransactionTable allTransactions={allTransactions} />
		</Container>
	);
};

export default Transactions;
