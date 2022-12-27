import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/auth_context";
import { NavLink } from "react-router-dom";
import Chip from "../assets/chip.png";
import Journal from "../assets/journalW.png";

const Root = styled.div`
  background-color: #234a4c;
  display: flex;
  justify-content: center;
  position: sticky;
  padding: 0px 20px;
  top: 0;
  z-index: 50;

`;
const Empty = styled.div`
width: calc(30px + 5px);
@media (min-width: 768px) {
  display: none;
}
`;

const Inner = styled.div`
  max-width: 1770px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoHolder = styled.div`
  width: 150px;
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
  position: absolute;
  background:#1d3e3f;
  right: 0;
  flex-direction: column;
  transition: 0.5s all ease;
  transform: ${(props) => !props.mobileMenu ? "translateX(100%)":"translateX(0%)"};
  justify-content: space-between;
  min-height: calc(100vh );
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
  padding: 20px 5px;
  text-align: center;
  color: white;
  text-decoration: none;
  background:transparent


  &:hover {
    border-bottom: 4px solid #8bab50;
  }
  // &:nth-child(even) {
  //   background: white;
  //   color: black!important;
  // }
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
    border-bottom: 2px solid #234a4c;
  }
`;
const Button = styled.button`
padding: 10px 20px;
width: fit-content;
border: none;
background: #8bab50;
color: #234a4c;
border-radius: 5px;
cursor: pointer;
font-weight: 700;

@media (min-width: 0px) and (max-width: 768px) {
  margin: 10px;
}
`;

const BurgerMenuHolder = styled.div`

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
  width: 20px;
  min-height: 2px;
  background: #fefefe;
  margin: 5px  0px;
`;
const Icon = styled.div`
  width: 30px;
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

      
        </BurgerMenuHolder>

        <MenuLinklogo to="/">
          <LogoHolder>
            <img src={Logo} width="100%" />
          </LogoHolder>
        </MenuLinklogo>
        <LinkHolder>
          {!auth && (
            <>
              {/* <MenuLink to="dashboard">DashBoard</MenuLink> */}

       
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
              <MenuLink to="/my-devices">My Devices</MenuLink>
         
              <Button onClick={()=>{logOut()}}>Log Out</Button>
              
              {/* <MenuLink to="gallery">Gallery</MenuLink> */}
              {/* <Button>Log Out</Button> */}
            </>
          )}
        </LinkHolder>

     <Empty></Empty>
      </Inner>
          

            <LinkHolderMobile mobileMenu={mobileMenu}>
             
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

              <MenuLinkMobile to="/my-devices" onClick={() => { setMobileMenu(false); }}>
                <FlexLink>
                  <Icon>
            
                  </Icon>
                  <div>My Devices</div>
                </FlexLink>
              </MenuLinkMobile>
  </>
              

         }

            
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
            
       
    </Root>
  );
};

export default NavBar;
