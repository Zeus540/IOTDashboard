import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth_context";


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
padding: 20px 0px;
max-width: 1770px;
margin: 0 auto;
  @media (max-width: 425px) {
    margin: 0px 20px;
    padding: 10px 0px;
    border-radius: 5px;
    width: 90%;
    margin-bottom: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 20px;
    padding: 10px;
    border-radius: 5px;
    width: 95%;
    margin-bottom: 0px;
  }
`;
const LegalText = styled.p`
margin: 5px 0px;
text-align: end;
margin-bottom: 0px;
`;

const MenuLinkMobileHeading = styled.h3`
margin: 5px 0px;
border-bottom: 2px solid #8bab50;
width: fit-content;
`;
const MenuLinkMobile = styled(NavLink)`
  margin: 0px 0px;
  padding: 5px 0px;
  text-align: center;
  color: black;
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

`;

const Section = styled.div`
width: calc(100% /3);

`;



const Footer = () => {

  const { auth,logOut,user } = useContext(AuthContext)
  return (
    <Root>
        <Inner>
        <SectionHolder>      
    <Section>
    <MenuLinkMobileHeading>Links</MenuLinkMobileHeading>
        <MenuLinkMobile to="/public-diaries" >
                     <FlexLink>
                     
                       <div>Public Diaries</div>
                     </FlexLink>
                   </MenuLinkMobile>

                   {auth && 
                   
                   <>
                      <MenuLinkMobile to="/my-diaries" >
                     <FlexLink>
                     
                       <div>My Diaries</div>
                     </FlexLink>
                   </MenuLinkMobile>
                   <MenuLinkMobile to="/my-devices" >
                     <FlexLink>
                     
                       <div>My Devices</div>
                     </FlexLink>
                   </MenuLinkMobile>
                   <MenuLinkMobile to="/users" >
                     <FlexLink>
                     
                       <div>Users</div>
                     </FlexLink>
                   </MenuLinkMobile>
                   </>
                   }
      </Section>

      <Section>
    <MenuLinkMobileHeading>Legal</MenuLinkMobileHeading>
    
        <MenuLinkMobile to="/terms" >
                     <FlexLink>
                     
                       <div>Terms & Conditions</div>
                     </FlexLink>
                   </MenuLinkMobile>

                   <MenuLinkMobile to="/privacy-policy" >
                     <FlexLink>
                     
                       <div>Privacy Policy</div>
                     </FlexLink>
                   </MenuLinkMobile>

                   <MenuLinkMobile to="/cookie-policy" >
                     <FlexLink>
                     
                       <div>Cookie Policy</div>
                     </FlexLink>
                   </MenuLinkMobile>

                   <MenuLinkMobile to="/cookie-policy" >
                     <FlexLink>
                     
                       <div>Popi</div>
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