import styled from "styled-components";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext/userContext";
import logo from "../assets/imgs/logo.svg";
export default function Header() {
  const { token, setToken } = useContext(UserContext);
  return (
    <HeaderWrapper>
      <Buttons>
        {token ? <p>Seja bem-vindo(a),</p> : <p></p>}
        {token ? (
          <RightButtons>
            <Link to="/">
              <span>Home</span>
            </Link>
            <Link to="/Ranking">
              <span>Ranking</span>
            </Link>

            <span onClick={() => setToken()}>Sair</span>
          </RightButtons>
        ) : (
          <RightButtons>
            <Link to="/login">
              <span>Entrar</span>
            </Link>
            <Link to="/signup">
              <p>Cadastrar-se</p>
            </Link>
          </RightButtons>
        )}
      </Buttons>
      <LogoWrapper>
        <h1>Shortly</h1>
        <img src={logo} alt="logo shortly" />
      </LogoWrapper>
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.div`
  max-width: 1300px;
  margin-top: 40px;
  font-size: 16px;
  font-weight: 400;
  color: #9c9c9c;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: #5d9040;
  }
  h1 {
    color: #000000;
    font-size: 64px;
  }
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const RightButtons = styled.div`
  display: flex;
  column-gap: 30px;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
