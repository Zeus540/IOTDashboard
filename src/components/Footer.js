import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";


const Root = styled.div`
margin: 0px;
background:#596876;
color:white;
padding: 10px 15px;
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
const Footer = () => {
  return (
    <Root>
        <Inner>
        <p>&copy; 2023 Copyright - SweetLeaf</p>
    </Inner>
    </Root>
  )
}

export default Footer