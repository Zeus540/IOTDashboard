import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";




const Root = styled.div`
box-shadow:  0px 0px 20px #00000012;
margin: 0px;
    background: #ffffff;
    color: black;
    padding: 0px 0px;
    box-shadow:  0px 0px 20px #00000012;

  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;


const Inner = styled.div`

border-radius: 5px;
background: #ffffff;


padding: 20px 80px ;
  @media (max-width: 425px) {
    margin: 20px;
    padding: 10px 0px;
    border-radius: 5px;
    width: 90%;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 20px;
    padding: 10px;
    border-radius: 5px;
    width: 95%;
  }
`;
const LegalText = styled.p`
margin: 5px;
`;

const Footer = () => {
  return (
    <Root>
        <Inner>
        <LegalText>&copy; 2023 Copyright - SweetLeaf</LegalText>
    </Inner>
    </Root>
  )
}

export default Footer