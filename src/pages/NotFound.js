import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import Back2 from '../assets/unsplash.jpg'
import { NavLink } from "react-router-dom";

const Root = styled.div`

  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;


const Inner = styled.div`

background-image: url(${Back2});

background-size: cover;
min-height: calc(100vh - 198px);
width: 100%;
background-position: center;
margin: 0 auto;
display: flex;
    justify-content: center;
    align-items: center;
    background-color: #193637;
    background-blend-mode: overlay;
  @media (max-width: 425px) {
    min-height: calc(100vh - 198px);
  }
  @media (min-width: 426px) and (max-width: 768px) {
    min-height: calc(100vh - 63px);
  }
`;

const TextHolder = styled.div`


`;

const Heading = styled.h1`
font-size: 15em;
text-align: center;
color: white;
margin: 20px 0px;
line-height: 0.8em;
@media (max-width: 425px) {
  font-size: 13em;
}
`;
const HeadingSmall = styled.p`
font-size: 2.5em;
text-align: center;
color: white;
margin: 0px;
@media (max-width: 425px) {
  font-size: 2em;
}
`;

const Button = styled.button`

text-align: center;
font-size: 1em;
    display: block;
    border: none;
    padding: 8px 25px;
    border-radius: 5px;
    margin: 40px auto;
    cursor: pointer;
    background: #8bab50;
    color: white;
`;

const MenuLink = styled(NavLink)`
text-decoration: none;
`;


const NotFound = () => {

 
  return (
    <Root> 
      <Inner>
        <TextHolder>
        <Heading>404</Heading>
        <HeadingSmall>Oops! You seem lost</HeadingSmall>

        <MenuLink to="/"><Button>GO HOME</Button></MenuLink>
        
        </TextHolder>
        </Inner>
    </Root>
  )
}

export default NotFound