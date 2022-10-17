import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: teal;
  cursor: pointer;
  ${mobile({ width: "100%" })};
  &:disabled {
    background-color: green;
    cursor: not-allowed;
  }
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const Error = styled.p`
  margin: 5px 0px;
  font-size: 14px;
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isFetching, error, errorMessage, currentUser } = useSelector(
    (state) => state.user
  );

    console.log(currentUser);

  const handleLogin = () => {
    login(dispatch, { email: username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Error>{errorMessage || errorMessage.message}</Error>}
          <Agreement>Remember me</Agreement>
          <Button onClick={handleLogin} disabled={isFetching}>
            {isFetching ? "LOADING" : "LOGIN"}
          </Button>
          <Link style={linkStyle} to="/register">FORGOT PASSWORD</Link>
          <Link style={linkStyle} to="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container >
  );
};

const linkStyle = {
  margin: "5px 0px",
  fontSize: "12px",
  textDecoration: "underline",
  cursor: "pointer",
  // textDecoration: "none",
  color: "inherit"
}

export default Login;
