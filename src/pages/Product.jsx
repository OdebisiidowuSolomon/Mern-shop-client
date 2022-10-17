import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Newsletter } from "../components/Newsletter";
import { saveProduct } from "../redux/apiCalls";
import { addProduct, removeProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  max-height: 550px;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FillterContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 30px 0;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
  border: 2px solid #eee;
`;
const FilterSize = styled.select`
  padding: 5px;
  margin-left: 20px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.5s;
  &:hover {
    background-color: teal;
    color: white;
    border-color: white;
  }
`;

const H1 = styled.h1`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 200;
  font -size:20px
`;

const Product = (props) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const location = useLocation();
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart);
  const {username} = useSelector((state) => state.user?.currentUser);

  const prodId = location.pathname.split("/")[2];

  useEffect(() => {
    publicRequest
      .get(`/products/${prodId}`)
      .then((prod) => {
        setProduct(prod.data);
        setColor(prod.data.color[0] || null);
        setSize(prod.data.size[0] || null);
      })
      .catch((err) => console.log(err));
  }, [prodId]);

  const handleQuantity = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
      dispatch(addProduct({...product}))
    } else if (action === "decrease" && quantity >= 1) {
      setQuantity((prev) => prev - 1);
      dispatch(removeProduct({...product}))
    }
  };

//   handle click evt on add to cart button
  const handleAddToCart = () => {
    console.log(quantity);
      saveProduct(dispatch, {cart,username})
  }

  return (
    <Container>
      <Navbar />
      <Annoucement />
      {!product ? (
        <H1>Loading ....</H1>
      ) : (
        <Wrapper>
          <ImgContainer>
            <Image src={product?.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product?.title}</Title>
            <Desc>{product?.desc}</Desc>
            <Price>$ {product?.price}</Price>
            <FillterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product?.color?.map((color) => (
                  <FilterColor
                    onClick={() => setColor(color)}
                    key={color}
                    color={color}
                  />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product?.size?.map((size) => (
                    <FilterSizeOption key={size}>{size}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FillterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("decrease")}
                />
                <Amount>{quantity}</Amount>
                <Add
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("increase")}
                />
              </AmountContainer>
              <Button onClick={handleAddToCart}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
