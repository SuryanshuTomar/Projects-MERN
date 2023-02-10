import { useEffect, useState } from "react";
import { getAllTransactions } from "../axios/ExpenseFetch";

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
		<section>
			<h1>All Transactions </h1>
			<table>
				<thead>
					<tr>
						<th>Amount</th>
						<th>Description</th>
						<th>Date</th>
					</tr>
				</thead>

				{allTransactions.map((traxn) => (
					<tbody key={traxn._id}>
						<tr>
							<td>{traxn.amount}</td>
							<td>{traxn.description}</td>
							<td>{traxn.date}</td>
						</tr>
					</tbody>
				))}
			</table>
		</section>
	);
};
export default Transactions;
