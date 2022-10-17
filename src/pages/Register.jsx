import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login, logout, register } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;
    display:flex;
    align-items:center;
    justify-content:center;
    background-size: cover
`;
const Wrapper = styled.div`
    padding:20px;
    width:40%;
    background-color: white;
    ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight:300;
`;
const Form = styled.form`
    display:flex;
    flex-wrap:wrap
`;
const Input = styled.input`
    flex:1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px
`;
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px
`;
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: teal;
    cursor:pointer;
    ${mobile({ width: "100%" })}
`;

const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { isFetching, error, errorMessage } = useSelector(
    (state) => state.user
  );

  // useEffect(() => logout(dispatch),[])

  const handleSubmit = () => {
    register(dispatch, { email,userName, password, confirmPassword });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={e =>e.preventDefault()}>
          <Input required placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input required placeholder="last name" onChange={(e) => setLastName(e.target.value)} />
          <Input required placeholder="username" onChange={(e) => setUserName(e.target.value)} />
          <Input required placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input required placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Input required placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
          <Agreement>
            By creating an account, i consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
