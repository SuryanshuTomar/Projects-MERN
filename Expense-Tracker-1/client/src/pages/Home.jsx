import styled from "styled-components";
import TransactionChart from "../components/TransactionChart";
import TransactionForm from "../components/TransactionForm";
import Transactions from "../components/Transactions";

const Container = styled.div`
	display: flex;
	background-color: blue;
	flex-direction: column;
	align-items: center;
`;

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	align-items: flex-start;
	justify-content: space-between;
	background-color: yellow;
	padding: 0.5rem;
`;

const Home = () => {
	return (
		<Container>
			<Wrapper>
				<TransactionChart />
				<TransactionForm />
			</Wrapper>
			<Transactions />
		</Container>
	);
};
export default Home;
