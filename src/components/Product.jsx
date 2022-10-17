import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { addProduct } from '../redux/cartRedux'

const Container = styled.div`
  flex:1;
  margin: 5px;
  min-width:280px;
  height:350px;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:#f5fbfb;
  position:relative
`
const Circle = styled.div`
  height: 200px;
  width: 200px;
  border-radius:50%;
  background-color:white;
  position:absolute
`
const Image = styled.img`
  height: 100%;
  width:100%;
  max-width: 400px;
  object-fit:cover;
  z-index:2;
`
const Info = styled.div`
opacity:0;
height: 100%;
width:100%;
position: absolute;
top:0;
left:0;
display:flex;
align-items:center;
justify-content:center;
z-index:3;
transition:all .4s ease;
&:hover {
  background-color:rgba(0,0,0,0.2);
  opacity:1
}
`
const Icon = styled.div`
display:flex;
align-items:center;
justify-content:center;
background-color:white;
height:40px;
width:40px;
border-radius:50%;
margin:10px;
transition:all .45s ease;
cursor:pointer;
&:hover {
  background-color:#e9f5f5;
  transform:scale(1.1)
}
`



export const Product = ({item}) => {

  const {username} = useSelector((state) => state.user?.currentUser) || '';
const dispatch = useDispatch()


  //   handle click evt on add to cart button
  const handleAddToCart = () => {
    if (!username) {
      window.location.pathname = '/login'
    } else {
      dispatch(addProduct({...item}))
  }
  }

  return (
    <Container>
      <Circle/>
      <Image src={item.img}/>
      <Info>
        <Icon>
          <Link onClick={handleAddToCart}>
          <ShoppingCartOutlined/>
          </Link>
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
          <SearchOutlined/>
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined/>
        </Icon>
      </Info>
    </Container>
  )
}
