import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display:flex;
  position: relative;
  overflow:hidden;
  ${mobile({ display: "none" })}

`;

const Arrow = styled.div`
  height: 50px; 
  width: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${(props) => props.direction === "right" && "10px"};
  left: ${(props) => props.direction === "left" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index:2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${props => -props.slideIndex * 100}vw);
  transition: transform 1.5s ease;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${props => props.bg}
`;
const ImgContainer = styled.div`
  height: 100%;
  // height: 100%;
  flex: 1.5;
`;
const Image = styled.img`
  height: 80%;
  width:100%
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`font-size:70px;`
const Desc = styled.p`font-size:20px;margin:50px 0; font-weight:500; letter-spacing:3px`
const Button = styled.button`
    padding:20px;
    font-size:20px;
    background-color: transparent;
    // border: none;
    cursor:pointer
`


export default function Slider() {
    
    const [slideIndex, setSlideIndex] = useState(0)

    // useEffect(() => {
    //     setInterval(() => setSlideIndex(Math.floor(Math.random() * 4)),5000)
    // },[])

    
    const handleClick = (dir) => {
        if(dir === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3)
        } else {
            setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0)
        }
        
    }


    return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex = {slideIndex}>
          {sliderItems.map(item => 
        <Slide bg={item.bg} key={item.id}>
          <ImgContainer>
            <Image src={item.img} />
          </ImgContainer>
          <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
            )}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
}
