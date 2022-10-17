import React, { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";
import { popularProducts } from "../data";
import { Product } from "./Product";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  // justify-content:space-between;
`;

export const Products = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    publicRequest.get(
        cat
          ? `/products/?category=${cat}`
          : "/products/"
      )
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [cat]);

  useEffect(() => {
      if(cat) {
        setFilteredProducts(products.filter(item => {
          return Object.entries(filters || {}).every(([key, value]) => {
            return item[key].includes(value)
          })
        }))
      }
  }, [cat, filters,products]);

  useEffect(() => {
    if(sort === 'newest') {
      setFilteredProducts(prev => {
        return [...prev].sort((a,b) => a.createdAt - b.createdAt)
      })
      }
      else if(sort === 'asc') {
        setFilteredProducts(prev => {
          return [...prev].sort((a,b) => a.price - b.price)
        })
  
      }
      else {
        setFilteredProducts(prev => {
          return [...prev].sort((a,b) => b.price - a.price)
        })
  
      }
    } , [sort])


  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <Product item={item} key={item._id} />
      )) : products.slice(0,8).map(item => <Product item={item} key={item._id} />)}
    </Container>
  );
};
