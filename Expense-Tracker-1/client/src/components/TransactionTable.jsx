import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import styled from "styled-components";
import { deleteTransaction, updateTransaction } from "../axios/ExpenseFetch";

const Button = styled.span`
	margin-left: 0.5rem;
	cursor: pointer;

	svg > path {
		color: #${(props) => props.bg};
	}
`;

const TableTitle = styled.h1`
	font-size: 1rem;
`;

export default function TransactionTable({ allTransactions }) {
	const actionHandler = async (action, payload) => {
		if (action === "edit") {
			console.log(action, payload);
			await updateTransaction(payload);
		} else if (action === "delete") {
			console.log(action, payload);
			await deleteTransaction(payload);
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>
							<TableTitle>Amount</TableTitle>
						</TableCell>

						<TableCell align="right">
							<TableTitle>Description</TableTitle>
						</TableCell>
						<TableCell align="right">
							<TableTitle>Date</TableTitle>
						</TableCell>
						<TableCell align="right">
							<TableTitle>Action</TableTitle>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{allTransactions.map((traxn) => (
						<TableRow
							key={traxn._id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{traxn.amount}
							</TableCell>
							<TableCell align="right">{traxn.description}</TableCell>
							<TableCell align="right">
								{format(new Date(traxn.date), "dd/mm/yyyy")}
							</TableCell>
							<TableCell align="right">
								<Button
									bg={"3185FC"}
									onClick={() => actionHandler("edit", traxn)}
								>
									<EditIcon />
								</Button>
								<Button
									bg={"E84855"}
									onClick={() => actionHandler("delete", traxn._id)}
								>
									<DeleteIcon />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
