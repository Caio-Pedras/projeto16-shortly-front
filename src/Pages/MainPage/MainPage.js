import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import axios from "axios";
import Input from "../../components/Input";
import Header from "../../components/Header";

export default function MainPage() {
  const { URL, token } = useContext(UserContext);
  const [link, setLink] = useState();
  const apiResult = [
    {
      id: 1,
      shortUrl: "asdasd46",
      url: "www.www.w.com.br",
      visitCount: 23,
    },
    {
      id: 2,
      shortUrl: "5a9wq7",
      url: "www.lllasdasdasd.com.br",
      visitCount: 99,
    },
  ];
  return (
    <Container>
      <Header></Header>
      <Box>
        <CreateBox>
          <Input
            type="text"
            placeholder="Links que cabem no bolso"
            // disabled={isLoading}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button>
            <p>Encurtar link</p>
          </Button>
        </CreateBox>
        {apiResult.map((element) => (
          <UrlBox>
            <UrlInfo>
              <p>{element.url}</p>
              <h2>{element.shortUrl}</h2>
              <h2>Quantidade de visitantes: {element.visitCount}</h2>
            </UrlInfo>
            <DeleteBox>
              <ion-icon name="trash"></ion-icon>
            </DeleteBox>
          </UrlBox>
        ))}
      </Box>
    </Container>
  );
}
const Container = styled.div`
  padding: 0px 10%;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  width: 100%;
  margin-top: 100px;
`;
const CreateBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 90px;
`;
const Button = styled.div`
  background-color: #5d9040;
  color: #ffffff;
  width: 200px;
  height: 55px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const UrlBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 40px;
  border-radius: 12px;
  border: 1px solid #78b15940;
`;
const UrlInfo = styled.div`
  background-color: #80cc74;
  border-radius: 12px 0 0 12px;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 30px;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  color: #ffffff;
  font-size: 15px;
  p {
    width: 180px;
  }
`;
const DeleteBox = styled.div`
  background-color: #ffffff;
  width: 150px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: #ea4f4f;
`;
