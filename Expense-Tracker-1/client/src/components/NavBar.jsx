import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.nav`
	background-color: #e84855;
	height: 4rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h3`
	margin-left: 3rem;
	font-size: 1.5rem;
`;

const Links = styled.div`
	width: 20rem;
	display: flex;
	justify-content: center;
	font-size: 1.1rem;
`;

const NavBar = () => {
	return (
		<Container>
			<Title>EXPENSE TRACKER</Title>
			<Links>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/">Categories</NavLink>
			</Links>
		</Container>
	);
};

export default NavBar;
