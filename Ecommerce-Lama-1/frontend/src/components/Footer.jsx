import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PintrestIcon from "@mui/icons-material/Pinterest";
import MapIcon from "@mui/icons-material/Map";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

const Container = styled.div`
	display: flex;
	flex: 1;
`;
const Left = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

const Logo = styled.h1``;

const Description = styled.p`
	margin: 20px 0;
`;

const SocialContainer = styled.div`
	display: flex;
`;

const SocialIcon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	color: #${(props) => props.color};
	background-color: #fdf5f5;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 20px;
`;

const Center = styled.div`
	flex: 1;
	padding: 20px;
`;

const Title = styled.h3`
	margin-bottom: 30px;
`;

const List = styled.ul`
	list-style: none;
	display: flex;
	flex-wrap: wrap;
`;

const ListItem = styled.li`
	width: 50%;
	margin-bottom: 10px;
`;

const Right = styled.div`
	flex: 1;
	padding: 20px;
`;

const ContactItem = styled.div`
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`;

const Payment = styled.img`
	width: 50%;
`;

const Footer = () => {
	return (
		<Container>
			<Left>
				<Logo>.Matrix.</Logo>
				<Description>
					There are many variations of passages of Lorem Ipsum available,
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, ea?
					Voluptas, ipsa! Repellendus velit ratione quidem cumque odio
					deserunt unde quod, laborum non aliquam.
				</Description>
				<SocialContainer>
					<SocialIcon color="3b5999">
						<FacebookIcon />
					</SocialIcon>
					<SocialIcon color="e4405f">
						<InstagramIcon />
					</SocialIcon>
					<SocialIcon color="55acee">
						<TwitterIcon />
					</SocialIcon>
					<SocialIcon color="e60023">
						<PintrestIcon />
					</SocialIcon>
				</SocialContainer>
			</Left>
			<Center>
				<Title>Useful Items</Title>
				<List>
					<ListItem>Home</ListItem>
					<ListItem>Cart</ListItem>
					<ListItem>Man Fashion</ListItem>
					<ListItem>Woman Fashion</ListItem>
					<ListItem>Accessories</ListItem>
					<ListItem>My Account</ListItem>
					<ListItem>Order Tracking</ListItem>
					<ListItem>Wishlist</ListItem>
					<ListItem>Wishlist</ListItem>
					<ListItem>Terms</ListItem>
				</List>
			</Center>
			<Right>
				<Title>Contact</Title>
				<ContactItem>
					<MapIcon style={{ marginRight: "10px" }} /> 622 Dixie Path ,
					South Tobinchester 98336
				</ContactItem>
				<ContactItem>
					<LocalPhoneIcon style={{ marginRight: "10px" }} /> +1 234 56 78
				</ContactItem>
				<ContactItem>
					<MailOutlinedIcon style={{ marginRight: "10px" }} />{" "}
					contact@lama.dev
				</ContactItem>
				<Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
			</Right>
		</Container>
	);
};
export default Footer;
