import React,{useContext} from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/auth_context";
import { NavLink } from "react-router-dom";

const Root = styled.div`
  background-color: #344E41;
  display: flex;
  justify-content: center;
  box-shadow: 2px 2px 11px 2px #344e41;
  position: sticky;
    top: 0;
    z-index:50;
    border-bottom: 2px solid white;
`;

const Inner = styled.div`
  max-width: 1770px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoHolder = styled.div`
  width: 200px;
`;
const LinkHolder = styled.div`
  display: flex;
  justify-content: center;
`;
const MenuLink = styled(NavLink)`
  margin: 0px 0px;
  padding:30px 30px;
  border-bottom:2px solid transparent;
  color:white;
  text-decoration:none;
  &:hover{
    border-bottom:4px solid #459343
  }
`;
const MenuLinklogo = styled(NavLink)`
  margin: 0px 0px;
 
`;

const LogOut = styled.p`
  margin: 0px 0px;
  padding:30px 30px;
  border-bottom:2px solid transparent;
  color:white;
  &:hover{
    border-bottom:2px solid #459343
  }
`;
const Button = styled.button`
padding: 15px 30px;
width: fit-content;
margin: 20px;
border:none;
background:#459343;
color:white;
border-radius:5px;
`;


const NavBar = () => {
  const {auth} = useContext(AuthContext)

  return (
    <Root>
      <Inner>
      <MenuLinklogo to="/">
        <LogoHolder>
          <img src={Logo} width="100%" />
        </LogoHolder>
        </MenuLinklogo>
        <LinkHolder>
         {auth && 
         <>
          {/* <MenuLink to="dashboard">DashBoard</MenuLink> */}
          <MenuLink to="diaries">Diaries</MenuLink>
          {/* <MenuLink to="gallery">Gallery</MenuLink> */}
          <Button>Log Out</Button>
        </>
         }


        </LinkHolder>
      </Inner>
    </Root>
  );
};

export default NavBar;
