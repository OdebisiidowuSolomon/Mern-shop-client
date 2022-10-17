import React from 'react'
import { useState } from 'react';
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../redux/cartRedux';
import { useSelector } from 'react-redux';
import { saveProduct } from '../redux/apiCalls';


const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  display: flex;
  flex: 2;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  ${mobile({
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: ".6rem",
})}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ marginBottom: "0px" })}
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;


function CartItem({ product, i }) {

  console.log(product);

    const [quantity, setQuantity] = useState(product.quantity || 1);
    const cart = useSelector((state) => state.cart);
    const {username} = useSelector((state) => state.user?.currentUser) || '';

    const dispatch = useDispatch()

    const handleQuantity = (action) => {
        if (action === "increase") {
          saveProduct({cart, username}, () => {
            setQuantity((prev) => prev + 1);
            dispatch(addProduct({...product}))
          })

        } else if (action === "decrease" && quantity >= 1) {
          saveProduct({cart, username}, () => {
            setQuantity((prev) => prev - 1);
            dispatch(removeProduct({...product}))
          })
        }
        // saveProduct(dispatch, {cart,username})
    };

    return (
        <>
            <Product>
                <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                        <ProductName>
                            <b>Product:</b> {product.title}
                        </ProductName>
                        <ProductId>
                            <b>ID:</b> {product._id}
                        </ProductId>
                        <ProductName>
                            <b>Price:</b> ${product.price}
                        </ProductName>
                        <ProductColor color={product.color} />
                        <ProductSize>
                            <b>Size:</b> {product.size}
                        </ProductSize>
                    </Details>
                </ProductDetail>
                <PriceDetail>
                    <ProductAmountContainer>
                        <Add style={{cursor:"pointer"}} onClick={handleQuantity.bind(this, 'increase')} />
                        <ProductAmount>{quantity}</ProductAmount>
                        <Remove style={{cursor:"pointer"}} onClick={handleQuantity.bind(this, 'decrease')} />
                    </ProductAmountContainer>
                    <ProductPrice>
                        $ {product.price * quantity}{" "}
                    </ProductPrice>
                </PriceDetail>
            </Product>
            <Hr key={`${product._id}+${i}2`} />
        </>
    )
}

export default CartItem