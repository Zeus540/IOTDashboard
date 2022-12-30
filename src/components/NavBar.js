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
  padding-right: 0px;
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
  position: fixed;
  background:#1d3e3f;
  right: 0;
  width: 50%;
  flex-direction: column;
  transition: 0.5s all ease;
  transform: ${(props) => !props.mobileMenu ? "translateX(100%)":"translateX(0%)"};
  justify-content: space-between;
  min-height: calc(100vh );
`;
const MenuLink = styled(NavLink)`
  margin: 0px 0px;
  padding: 16px 30px;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  color: white;
  text-decoration: none;
  &:hover {
    border-bottom: 4px solid #8bab50;
  
  }

`;
const MenuLinkActive = styled(NavLink)`
  margin: 0px 0px;
  padding: 16px 30px;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #8bab50;
  color: white;
  text-decoration: none;


`;
const MenuLinkMobile = styled(NavLink)`
  margin: 0px 0px;
  padding: 10px 15px;
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
padding: 20px 20px;
display: flex;
width: fit-content;
border: none;
background: #8bab50;
color: white;

cursor: pointer;


@media (min-width: 0px) and (max-width: 768px) {
  margin: 10px;
  display:none
}
`;
const ButtonM = styled.button`

width: fit-content;
border: none;
background: #8bab50;
color: white;
padding: 15px;
cursor: pointer;

display: flex;
@media (min-width: 768px){
  
  display:block
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
  align-items: center;
`;

const Pattie = styled.div`
  width: 20px;
  min-height: 2px;
  background: #fefefe;
  margin: 5px  0px;
`;
const Icon = styled.div`
  width: 30px;
  margin-right: 15px;
`;

const LinkHolderM = styled.div`
display: flex;
flex-direction: column;
`;
const UserInfoHolder = styled.div`
display: flex;
justify-content: space-between;
`;

const UserInfo = styled.div`
display: flex;
color: white;
padding: 0px 10px;
align-items: center;
`;

const UserAvatar = styled.div`
width: 15px;
height: 15px;
color: white;
    padding: 10px;
    background: #8bab50;
    margin-right: 10px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

`;
const SvgW = styled.svg`
fill: white;
width: 25px;
`;

const NavBar = () => {
  const { auth,logOut,user } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  console.log("userId",user)
  return (
    <Root>
      <Inner>
      <BurgerMenuHolder>
          <BurgerMenu
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
          >
         <SvgW xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M624.6 325.2c-12.3-12.4-29.7-19.2-48.4-17.2-43.3-1-49.7-34.9-37.5-98.8 22.8-57.5-14.9-131.5-87.4-130.8-77.4.7-81.7 82-130.9 82-48.1 0-54-81.3-130.9-82-72.9-.8-110.1 73.3-87.4 130.8 12.2 63.9 5.8 97.8-37.5 98.8-21.2-2.3-37 6.5-53 22.5-19.9 19.7-19.3 94.8 42.6 102.6 47.1 5.9 81.6-42.9 61.2-87.8-47.3-103.7 185.9-106.1 146.5-8.2-.1.1-.2.2-.3.4-26.8 42.8 6.8 97.4 58.8 95.2 52.1 2.1 85.4-52.6 58.8-95.2-.1-.2-.2-.3-.3-.4-39.4-97.9 193.8-95.5 146.5 8.2-4.6 10-6.7 21.3-5.7 33 4.9 53.4 68.7 74.1 104.9 35.2 17.8-14.8 23.1-65.6 0-88.3zm-303.9-19.1h-.6c-43.4 0-62.8-37.5-62.8-62.8 0-34.7 28.2-62.8 62.8-62.8h.6c34.7 0 62.8 28.1 62.8 62.8 0 25-19.2 62.8-62.8 62.8z"/></SvgW>
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
             
              <MenuLink to="/public-diaries" >Public Diaries</MenuLink>
              <MenuLink to="/diaries">My Diaries</MenuLink>
              <MenuLink to="/my-devices">My Devices</MenuLink>
         
              <Button onClick={()=>{logOut()}}>
              <SvgW xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></SvgW>
              </Button>
              
              {/* <MenuLink to="gallery">Gallery</MenuLink> */}
              {/* <Button>Log Out</Button> */}
            </>
          )}
        </LinkHolder>

     <Empty></Empty>
      </Inner>

      {/* //mobile */}
          

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
                <UserInfoHolder> 
                <UserInfo>
                  <UserAvatar>
                  {user?.User?.charAt(0)}
                  </UserAvatar>
               {user?.User}
                </UserInfo>
                <div>
                <ButtonM onClick={()=>{logOut()}}>
                <SvgW xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></SvgW>
                </ButtonM>
                </div>
                </UserInfoHolder>
              }
         
             
        

            </LinkHolderMobile>
            
       
    </Root>
  );
};

export default NavBar;
