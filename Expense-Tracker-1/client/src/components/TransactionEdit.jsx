import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import { editTransaction } from "../features/TransactionSlice";

const Button = styled.button`
	background-image: linear-gradient(
		to right,
		#e84855,
		#f0667c,
		#f384a0,
		#f2a0bd,
		#efbcd5
	);
	position: relative;
	height: 2rem;
	width: 5rem;
	margin: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 5px;
	transition: all 0.5s;
	color: #403f4c;
	z-index: 1;
	cursor: pointer;

	&:hover {
		box-shadow: 5px 5px 5px 1px rgb(189, 195, 199);
	}

	&::before {
		position: absolute;
		content: "";
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-radius: 5px;
		background-image: linear-gradient(
			to left,
			#e84855,
			#f0667c,
			#f384a0,
			#f2a0bd,
			#efbcd5
		);
		transition: opacity 0.5s linear;
		z-index: -1;
		opacity: 0;
	}
	&:hover::before {
		opacity: 1;
	}
`;

const Title = styled.h3`
	text-align: center;
	margin: 1rem 0;
`;

const Form = styled.form`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #efbcd5;
	border-radius: 20px;
	margin: 0 1rem;
`;

const Label = styled.div`
	margin-top: 0.5rem;
`;

const Input = styled.input`
	width: 15rem;
	padding: 0.4rem;
	border: none;
	border-radius: 5px;

	&:focus {
		outline: 1px solid #e84855;
	}

	&::placeholder {
		color: rgb(191, 191, 191);
	}

	&:required:invalid::-webkit-datetime-edit {
		color: rgb(191, 191, 191);
	}
`;

const TransactionEdit = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		...state,
		amount: parseInt(state.amount),
		description: state.description,
		date: format(parseISO(state.date), "yyyy-MM-dd"),
	});

	const submitHandler = (event) => {
		event.preventDefault();

		// Reset Form Data on Submission
		// setFormData({
		// 	amount: "",
		// 	description: "",
		// 	date: "",
		// });
		dispatch(editTransaction(formData));
		navigate("/", { replace: true });
	};

	const onChangeHandler = (event) => {
		setFormData((prevData) => ({
			...prevData,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<Form onSubmit={submitHandler}>
			<Title>Edit Transaction</Title>
			<div>
				<Label htmlFor="transactionAmount">Amount</Label>
				<Input
					required
					type="number"
					name="amount"
					min="0"
					id="transactionAmount"
					aria-label="Enter the transaction amount"
					placeholder="Enter the transaction amount..."
					value={formData.amount}
					onChange={onChangeHandler}
				/>
			</div>
			<div>
				<Label htmlFor="transactionDescription">Description</Label>
				<Input
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
				<Label htmlFor="transactionDate">Date</Label>
				<Input
					required
					type="date"
					name="date"
					id="transactionDate"
					aria-label="Enter transaction date"
					value={formData.date}
					onChange={onChangeHandler}
				/>
			</div>

			<Button type="submit">Submit</Button>
		</Form>
	);
};
export default TransactionEdit;
