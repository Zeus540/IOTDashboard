import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/auth_context";
import { NavLink } from "react-router-dom";
import Chip from "../assets/chip.png";
import Journal from "../assets/journalW.png";

const Root = styled.div`
  background-color: #1a603d;
  display: flex;
  justify-content: center;
  position: sticky;
  padding: 0px 20px;
  top: 0;
  z-index: 50;
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
  @media (min-width: 0px) and (max-width: 768px) {
    display: none;
  }
`;
const LinkHolderMobile = styled.div`
  display: flex;
  position: fixed;
  background: #1a603d;
  right: 0;
  flex-direction: column;
  top: 74px;
  background: linear-gradient(360deg,#778062,#1a603d);
  min-height: 100vh;
`;
const MenuLink = styled(NavLink)`
  margin: 0px 0px;
  padding: 20px 30px;
  border-bottom: 2px solid transparent;
  color: white;
  text-decoration: none;
  &:hover {
    border-bottom: 4px solid #1a603d;
  }

`;
const MenuLinkMobile = styled(NavLink)`
  margin: 0px 0px;
  padding: 20px 15px;
  text-align: center;
  color: white;
  text-decoration: none;
  background:transparent


  &:hover {
    border-bottom: 4px solid #1a603d;
  }
  &:nth-child(even) {
    background: white;
    color: black!important;
  }
`;
const MenuLinklogo = styled(NavLink)`
  margin: 0px 0px;
`;

const LogOut = styled.p`
  margin: 0px 0px;
  padding: 30px 30px;
  border-bottom: 2px solid transparent;
  color: white;
  &:hover {
    border-bottom: 2px solid #1a603d;
  }
`;
const Button = styled.button`
  padding: 15px 30px;
  width: fit-content;
  margin: 20px;
  border: none;
  background: #1a603d;
  color: white;
  border-radius: 5px;
`;

const BurgerMenuHolder = styled.div`
  position: relative;
  @media (min-width: 768px) {
    display: none;
  }
`;

const BurgerMenu = styled.div``;

const FlexLink = styled.div`
  display: flex;
  flex-direction: column;
`;

const Pattie = styled.div`
  width: 25px;
  min-height: 2px;
  background: #fefefe;
  margin: 5px;
`;
const Icon = styled.div`
  width: 45px;
  margin: 0px auto;
`;

const NavBar = () => {
  const { auth } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <Root>
      <Inner>
        <MenuLinklogo to="/">
          <LogoHolder>
            <img src={Logo} width="100%" />
          </LogoHolder>
        </MenuLinklogo>
        <LinkHolder>
          {!auth && (
            <>
              {/* <MenuLink to="dashboard">DashBoard</MenuLink> */}
              <MenuLink to="/diaries">Diaries</MenuLink>
              <MenuLink to="/analyzer">Analyzer</MenuLink>
              {/* <MenuLink to="gallery">Gallery</MenuLink> */}
              {/* <Button>Log Out</Button> */}
            </>
          )}
        </LinkHolder>

        <BurgerMenuHolder>
          <BurgerMenu
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
          >
            <Pattie />
            <Pattie />
            <Pattie />
          </BurgerMenu>
          {mobileMenu && (
            <LinkHolderMobile>
              {!auth && (
                <>
                  {/* <MenuLink to="dashboard">DashBoard</MenuLink> */}
                  <MenuLinkMobile to="/diaries"  onClick={() => {setMobileMenu(false);}}>
                    <FlexLink>
                      <Icon>
                        <img src={Journal} width="100%" />
                      </Icon>
                      <div>Diaries</div>
                    </FlexLink>
                    </MenuLinkMobile>

                  <MenuLinkMobile to="/analyzer"  onClick={() => {setMobileMenu(false);}}>
                    <FlexLink>
                      <Icon>
                        <img src={Chip} width="100%" />
                      </Icon>
                      <div>Analyzer</div>
                    </FlexLink>
                  </MenuLinkMobile>

                  {/* <MenuLink to="gallery">Gallery</MenuLink> */}
                  {/* <Button>Log Out</Button> */}
                </>
              )}
            </LinkHolderMobile>
          )}
        </BurgerMenuHolder>
      </Inner>
    </Root>
  );
};

export default NavBar;
