import styled from "styled-components";

const Container = styled.div`
	height: 30px;
	background-color: steelblue;
	color: whitesmoke;
	display: flex;
	align-items: center;
	justify-content: center;
	font-style: 12px;
	font-weight: bold;
`;

const Announcement = () => {
	return <Container>Super deal! Free Shipping on Orders Over $50</Container>;
};
export default Announcement;
