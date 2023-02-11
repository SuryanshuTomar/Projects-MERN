import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
	getTransactions,
	selectAllTransactions,
} from "../features/TransactionSlice";
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
	const {
		data: transactions,
		error,
		status,
	} = useSelector(selectAllTransactions);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTransactions());
	}, []);

	return (
		<Container>
			<Title>All Transactions</Title>
			<TransactionTable
				allTransactions={transactions}
				error={error}
				status={status}
			/>
		</Container>
	);
};

export default Transactions;
