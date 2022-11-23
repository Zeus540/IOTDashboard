import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/auth_context";
import { NavLink } from "react-router-dom";
import Chip from "../assets/chip.png";
import Journal from "../assets/journalW.png";

const Root = styled.div`
  background-color: #345153;
  display: flex;
  justify-content: center;
  position: sticky;
  padding: 0px 20px;
  top: 0;
  z-index: 50;

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
  align-items: center;
  @media (min-width: 0px) and (max-width: 768px) {
    display: none;
  }
`;
const LinkHolderMobile = styled.div`
  display: flex;
  position: fixed;
  background: #39595b;
  right: 0;
  flex-direction: column;
  top: 70px;
  justify-content: space-between;
  min-height: calc(100vh - 70px);
`;
const MenuLink = styled(NavLink)`
  margin: 0px 0px;
  padding: 20px 30px;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  color: white;
  text-decoration: none;
  &:hover {
    border-bottom: 4px solid #8bab50;
  
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
    border-bottom: 4px solid #8bab50;
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
    border-bottom: 2px solid #39595b;
  }
`;
const Button = styled.button`
padding: 10px 20px;
width: fit-content;
border: none;
background: #8bab50;
color: #345153;
border-radius: 5px;
cursor: pointer;
font-weight: 700;

@media (min-width: 0px) and (max-width: 768px) {
  margin: 10px;
}
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

const LinkHolderM = styled.div`
display: flex;
flex-direction: column;
`;

const NavBar = () => {
  const { auth,logOut } = useContext(AuthContext);
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

              <MenuLink to="/store">Store</MenuLink>
              <MenuLink to="/login">Login</MenuLink>
              <MenuLink to="/register">Register</MenuLink>
              {/* <MenuLink to="gallery">Gallery</MenuLink> */}
              {/* <Button>Log Out</Button> */}
            </>
          )}
          {auth && (
            <>
              {/* <MenuLink to="dashboard">DashBoard</MenuLink> */}
             
              <MenuLink to="/public-diaries">Public Diaries</MenuLink>
              <MenuLink to="/diaries">My Diaries</MenuLink>
              <MenuLink to="/store">Store</MenuLink>
              <Button onClick={()=>{logOut()}}>Log Out</Button>
              
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
             
      <LinkHolderM >

         
      {auth && 
  <>
        <MenuLinkMobile to="/public-diaries" onClick={() => { setMobileMenu(false); }}>
                <FlexLink>
                  <Icon>
                    <img src={Journal} width="100%" />
                  </Icon>
                  <div>Public Diaries</div>
                </FlexLink>
              </MenuLinkMobile>

                <MenuLinkMobile to="/diaries" onClick={() => { setMobileMenu(false); }}>
                <FlexLink>
                  <Icon>
                    <img src={Journal} width="100%" />
                  </Icon>
                  <div>My Diaries</div>
                </FlexLink>
              </MenuLinkMobile>
  </>
              

         }

                <MenuLinkMobile to="/store" onClick={() => { setMobileMenu(false); }}>
                  <FlexLink>
                    {/* <Icon>
                        <img src={Chip} width="100%" />
                      </Icon> */}
                    <div>Store</div>
                  </FlexLink>
                </MenuLinkMobile>
      </LinkHolderM>

                {!auth && 
            <LinkHolderM>
                <MenuLinkMobile to="/login" onClick={() => { setMobileMenu(false); }}>
                  <FlexLink>
                    {/* <Icon>
                        <img src={Chip} width="100%" />
                      </Icon> */}
                    <div>Login</div>
                  </FlexLink>
                </MenuLinkMobile>

                <MenuLinkMobile to="/register" onClick={() => { setMobileMenu(false); }}>
                  <FlexLink>
                    {/* <Icon>
                        <img src={Chip} width="100%" />
                      </Icon> */}
                    <div>Register</div>
                  </FlexLink>
                </MenuLinkMobile>
            </LinkHolderM>
         }
          
             {auth && 
                <div>
                <Button onClick={()=>{logOut()}}>Log Out</Button>
                </div>
              }
         
             
        

            </LinkHolderMobile>
          )}
        </BurgerMenuHolder>
      </Inner>
    </Root>
  );
};

export default NavBar;
