import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "20px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 2 })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" }, "380px")}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ margin: "5px" }, "366px")}
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 2.5rem;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch()

  console.log(user);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchOutlined style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo> <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>SHOP.</Link></Logo>
        </Center>
        <Right>
          {!user && <>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/register">
              <MenuItem>REGISTER</MenuItem>
            </Link>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/login">
              <MenuItem>SIGN IN</MenuItem>
            </Link>
          </>}
          {user && <> <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">
            <MenuItem>Welcome {user.username}</MenuItem>
          </Link>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} onClick={() => { logout(dispatch); window.location.pathname = '/' }}>
              <MenuItem>Logout</MenuItem>
            </Link>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </>
          }
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
