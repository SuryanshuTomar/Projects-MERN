import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../data/data";
import { useState } from "react";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	position: relative;
	overflow: hidden;
`;

const Arrow = styled.div`
	width: 50px;
	height: 50px;
	background-color: #fff7f7;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: ${(props) => props.direction === "left" && "10px"};
	right: ${(props) => props.direction === "right" && "10px"};
	margin: auto;
	cursor: pointer;
	opacity: 0.5;
	z-index: 1;
`;

const Wrapper = styled.div`
	height: 100px;
	display: flex;
	transition: all 1.5s ease-in-out;
	transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	background-color: ${(props) => props.bg};
`;

const ImageContainer = styled.div`
	height: 100%;
	flex: 1;
`;

const Image = styled.img`
	height: 80%;
`;

const InfoContainer = styled.div`
	padding: 50px;
	flex: 1;
`;

const Title = styled.h1`
	font-size: 70px;
`;

const Description = styled.p`
	margin: 50px 10px;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 3px;
`;

const Button = styled.button`
	padding: 10px;
	font-size: 20px;
	background-color: transparent;
	cursor: pointer;
`;

const Slider = () => {
	const [slideIndex, setSlideIndex] = useState(0);

	const handleClick = (direction) => {
		if (direction === "left") {
			setSlideIndex((prev) => (prev === 0 ? 2 : prev - 1));
		} else if (direction === "right") {
			setSlideIndex((prev) => (prev === 2 ? 0 : prev + 1));
		}
	};

	return (
		<Container>
			<Arrow direction="left" onClick={() => handleClick("left")}>
				<ArrowLeftOutlinedIcon />
			</Arrow>
			<Wrapper slideIndex={slideIndex}>
				{sliderItems.map((item) => (
					<Slide bg={item.bg} key={item.id}>
						<ImageContainer>
							<Image src={item.img} />
						</ImageContainer>
						<InfoContainer>
							<Title>{item.title}</Title>
							<Description>{item.desc}</Description>
							<Button>SHOW NOW</Button>
						</InfoContainer>
					</Slide>
				))}
			</Wrapper>
			<Arrow direction="right" onClick={() => handleClick("right")}>
				<ArrowRightOutlinedIcon />
			</Arrow>
		</Container>
	);
};
export default Slider;
