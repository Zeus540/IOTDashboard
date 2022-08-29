import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { DiaryContext } from "../context/diary_context";

import Tabs from "../components/Tabs";




const Root = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 425px) {
    margin-top: 20px;
  }
`;

const Inner = styled.div`
  box-shadow: 2px 16px 20px 4px #a9a9a966;
  max-width: 1770px;
  border-radius: 0px 10px 10px 10px;
  width: 100%;
  background: #d6d0bb;
  padding: 20px 0px;
  @media (max-width: 425px) {
    margin: 16px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 16px;
  }
`;

const InnerText = styled.h1`
 text-align:center;
`;





const Stats = () => {
 


  const { diaries } = useContext(DiaryContext);
  






  return (

  
    <Root>
   
   <Tabs/>
      <Inner>
   
        <InnerText>Coming Soon</InnerText>
      </Inner>
    </Root>
   
  );
};

export default Stats;


