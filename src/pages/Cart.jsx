import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { mobile } from "../responsive";
import { useEffect, useRef, useState } from "react";
import Stripe from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid #eee;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
  height: 50vh;
  overflow: scroll;
`;


const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const {username} = useSelector((state) => state.user?.currentUser) || '';

  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    if(!username) {
      window.location.pathname = '/'
    }
    if(stripeToken && cart.total > 0 ) {
      userRequest
      .post("/checkout/payment", {
        tokenId: stripeToken.id,
        amount: cart.total * 100,
      })
      .then(({ data }) => {
        console.log('then >>>>>')
        navigate("/success", { state: { data, products:cart } });
      })
      .catch((err) => console.log(err));
    }
  }, [stripeToken, cart, navigate]);

  const checkOutRef = useRef()


  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={() => checkOutRef.current.click()}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.length === 0 ? <h1 align='center'>No Product yet in cart</h1> : cart.products.map((product, i) => (
             <CartItem product={product} key={`${product._id}+${i}`} />
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Stripe
              name="Timeless Shop"
              image="https://payload.cargocollective.com/1/19/610570/13091434/prt_275x275_1503579501.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
              disabled={cart.total <= 0}
            >
              <Button ref={checkOutRef}>CHECKOUT NOW</Button>
            </Stripe>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
