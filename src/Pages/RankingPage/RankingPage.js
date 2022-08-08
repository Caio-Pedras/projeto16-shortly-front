import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import axios from "axios";

import Header from "../../components/Header";
import Loading from "../../components/Loading";
import ranking from "../../assets/imgs/ranking.svg";
export default function RakingPage() {
  const { URL, token } = useContext(UserContext);
  const [apiResult, setApiResult] = useState();
  useEffect(() => getRanking(), []);
  function getRanking() {
    console.log("entrei");
    axios
      .get(`${URL}/ranking`)
      .then((res) => {
        console.log(res);
        setApiResult(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("um erro ocorreu");
      });
  }
  if (!apiResult) {
    return <Loading></Loading>;
  }
  return (
    <Container>
      <Header></Header>
      <Box>
        <Title>
          <img src={ranking} alt="trofeu" />
          <h1>Ranking</h1>
        </Title>

        <RankingBox>
          {apiResult?.map((element, index) => (
            <RankingInfo key={index}>
              <h1>
                {index + 1}. {element.name} -{" "}
                <span>
                  {element.linksCount} links -{" "}
                  {element.visitCount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  visualizações
                </span>
              </h1>
            </RankingInfo>
          ))}
        </RankingBox>
        {token ? (
          <></>
        ) : (
          <Banner>
            <h1>Crie sua conta para usar nosso serviço!</h1>
          </Banner>
        )}
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
const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  h1 {
    font-size: 36px;
    font-weight: 700;
  }
`;
const RankingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: center;
  margin-top: 40px;
  border-radius: 12px;
  border: 1px solid #78b15940;
  padding: 20px 40px;
`;
const RankingInfo = styled.div`
  font-size: 22px;
  width: 100%;
  h1 {
    font-weight: 700;
  }
  span {
    font-weight: 400;
  }
`;
const Banner = styled.div`
  margin-top: 80px;
  width: 100%;
  text-align: center;
  h1 {
    font-size: 36px;
    font-weight: 700;
  }
`;
