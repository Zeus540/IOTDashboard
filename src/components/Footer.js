import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";


const Root = styled.div`
margin: 0px;
    background: #ffffff;
    color: black;
    padding: 10px 15px;
    box-shadow:  0px 0px 20px #00000012;
    position: relative;
`;

const Inner = styled.div`
  max-width: 1770px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content:end;
  margin: 0 auto;
  @media (max-width: 767px) {
    flex-direction: row-reverse;
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