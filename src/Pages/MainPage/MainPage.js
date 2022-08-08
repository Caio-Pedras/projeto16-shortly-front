import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import axios from "axios";
import Input from "../../components/Input";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

export default function MainPage() {
  const { URL, token } = useContext(UserContext);
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const [apiResult, setApiResult] = useState();
  useEffect(() => {
    if (!token) navigate("/ranking");
    getUsersLinks();
  }, [token]);

  function getUsersLinks() {
    if (!token) return;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);
    axios
      .get(`${URL}/users/me`, config)
      .then((res) => setApiResult(res.data.shortenedUrls))
      .catch((err) => {
        console.log(err);
        alert("ocorreu um erro");
      });
  }
  function postLink() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = { url: link };
    axios
      .post(`${URL}/urls/shorten`, body, config)
      .then(getUsersLinks())
      .catch((err) => {
        console.log(err);
        alert("ocorreu um erro, preencha o link corretamente");
      });
  }
  function deleteUrl(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${URL}/urls/${id}`, config)
      .then((res) => getUsersLinks())
      .catch((err) => console.log(err));
  }
  if (!apiResult) {
    return <Loading></Loading>;
  }
  return (
    <Container>
      <Header></Header>
      <Box>
        <CreateBox>
          <Input
            type="text"
            placeholder="Links que cabem no bolso"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button onClick={() => postLink()}>
            <p>Encurtar link</p>
          </Button>
        </CreateBox>
        {apiResult.map((element, index) => (
          <UrlBox key={index}>
            <UrlInfo>
              <p>{element.url}</p>
              <h2>{element.shortUrl}</h2>
              <h2>Quantidade de visitantes: {element.visitCount}</h2>
            </UrlInfo>
            <DeleteBox onClick={() => deleteUrl(element.id)}>
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
