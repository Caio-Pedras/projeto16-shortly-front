import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import axios from "axios";
import Input from "../../components/Input";
import Header from "../../components/Header";
export default function SignUpPage() {
  const { URL } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function postSignup() {
    if (isLoading) return;
    setIsLoading(true);
    if (password !== confirmPassword) {
      alert("As senhas precisam ser iguais");
      setIsLoading(false);
      return;
    }

    const body = {
      email,
      name,
      password,
      confirmPassword,
    };

    axios
      .post(`${URL}/signup`, body)
      .then((res) => {
        setIsLoading(false);
        navigate("/login");
        alert("Conta cadastrada com sucesso");
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
          placeholder="Nome"
          disabled={isLoading}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          type="password"
          placeholder="Confirme a senha"
          disabled={isLoading}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Box>
      <Button onClick={() => postSignup()}>
        <p>Criar Conta</p>
      </Button>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  padding: 0px 200px;
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
  margin-top: 50px;
  cursor: pointer;
`;
const Box = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-top: 40px;
  input {
    margin-bottom: 30px;
  }
`;
