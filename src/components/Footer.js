import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth_context";


const Root = styled.div`
box-shadow:  0px 0px 20px #00000012;
margin: 0px;
    background: #ffffff;
    color: #354f41;
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
padding: 20px;
max-width: 1770px;
margin: 0 auto;

`;
const LegalText = styled.p`
margin: 5px 0px;
text-align: end;
margin-bottom: 0px;
`;

const MenuLinkMobileHeading = styled.h3`
margin: 5px 0px;

width: fit-content;
`;
const MenuLinkMobile = styled(NavLink)`
  margin: 0px 0px;
  padding: 5px 0px;

  text-align: center;
  color: #354f41;
  text-decoration: none;
  background:transparent
  display: block;
  width: fit-content;
  border-bottom: 4px solid white;
  &:hover {
    border-bottom: 4px solid #8bab50;
  }

`;

const FlexLink = styled.div`
  display: flex;
  align-items: center;

`;

const SectionHolder = styled.div`
display: flex;
@media (max-width: 768px) {
  flex-wrap: wrap;
}
`;

const Section = styled.div`
width: calc(100% /3);
padding: 10px 0px;
@media (max-width: 768px) {
  width: calc(100% /1);
  padding: 10px 0px;
}
`;



const Footer = () => {

  const { auth,logOut,user } = useContext(AuthContext)
  return (
    <Root>
        <Inner>
        <SectionHolder>      
    <Section>
    {/* <MenuLinkMobileHeading>Links</MenuLinkMobileHeading> */}
        <MenuLinkMobile to="/public-journals" >
                     <FlexLink>
                     
                       Public Journals
                     </FlexLink>
                   </MenuLinkMobile>

                   {auth && 
                   
                   <>
                      <MenuLinkMobile to="/my-diaries" >
                     <FlexLink>
                     
                      My Journals
                     </FlexLink>
                   </MenuLinkMobile>
                   <MenuLinkMobile to="/my-devices" >
                     <FlexLink>
                     
                      My Devices
                     </FlexLink>
                   </MenuLinkMobile>
                   <MenuLinkMobile to="/growers" >
                     <FlexLink>
                     
                      Growers
                     </FlexLink>
                   </MenuLinkMobile>
                   </>
                   }
      </Section>

      <Section>
    {/* <MenuLinkMobileHeading>Legal</MenuLinkMobileHeading> */}
    
        <MenuLinkMobile to="/terms" >
                     <FlexLink>
                     
                       Terms & Conditions
                     </FlexLink>
                   </MenuLinkMobile>

                   <MenuLinkMobile to="/privacy-policy" >
                     <FlexLink>
                     
                       Privacy Policy
                     </FlexLink>
                   </MenuLinkMobile>

                   <MenuLinkMobile to="/cookie-policy" >
                     <FlexLink>
                     
                       Cookie Policy
                     </FlexLink>
                   </MenuLinkMobile>

                   <MenuLinkMobile to="/cookie-policy" >
                     <FlexLink>
                     
                       Popi
                     </FlexLink>
                   </MenuLinkMobile>
      </Section>
      
  
      </SectionHolder>     
        <LegalText>&copy; {new Date().getFullYear()} Copyright - SweetLeaf 	&#174;</LegalText>
    </Inner>
    </Root>
  )
}

export default Footer