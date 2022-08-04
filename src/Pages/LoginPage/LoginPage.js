import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import axios from "axios";
import Input from "../../components/Input";
import Header from "../../components/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { URL, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  function logIn() {
    if (isLoading) return;
    setIsLoading(true);
    const body = {
      email,
      password,
    };

    axios
      .post(`${URL}/signin`, body)
      .then((res) => {
        setToken(res.data);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        alert(
          "Houve um erro, preencha os dados corretamente e tente novamente"
        );
      });
  }
  return (
    <Container opacity={isLoading ? 0.5 : 1}>
      <Header></Header>
      <Box>
        <Input
          type="text"
          placeholder="E-mail"
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button onClick={() => logIn()}>
        <p>Entrar</p>
      </Button>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  padding: 0px 10%;
  align-items: center;
  opacity: ${(props) => props.opacity};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.div`
  background-color: #5d9040;
  color: #ffffff;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Box = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-top: 40px;
`;
