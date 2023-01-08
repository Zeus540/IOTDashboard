import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/auth_context";
import { NavLink } from "react-router-dom";
import Chip from "../assets/chip.png";
import Journal from "../assets/journalW.png";
import { ThemeProvider } from 'styled-components';

const Root = styled.div`
  background-color: #596876;
  background-color:   #ffffff;

  display: flex;
  justify-content: center;
  position: sticky;
  box-shadow:  0px 0px 20px #00000012;

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
  width: 140px;
  margin-left:15px;

  @media (max-width: 767px) {
    margin-left:0px;
    width: 130px;
  }
`;
const Img = styled.img`
filter: drop-shadow(4px 1px 3px black)
`;

const LogoHolderText = styled.span`

color: black;
font-size: 12px;
margin-top: -16px;
display: block;
text-align: end;
padding-bottom: 3px;
`;

const LinkHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767px) {
    display: none;
  }
`;
const LinkHolderMobile = styled.div`
  display: flex;
  position: fixed;
  background: ghostwhite;
  left: 0;
  min-width: 15%;
  bottom:0px;
  flex-direction: column;
  transition: 0.5s all ease;
  transform: ${(props) => !props.mobileMenu ? "translateX(-101%)":"translateX(0%)"};
  justify-content: space-between;
  min-height: calc(100vh - 60px );
  @media (min-width: 0px) and (max-width: 767px) {
    min-height: calc(100vh - 54px );
  }
`;
const MenuLink = styled(NavLink)`
  margin: 0px 0px;
  padding: 16px 10px;

  color: black;
  align-items: center;
  text-decoration: none;
  display: flex;
 

`;

const Svg = styled.svg`
width:20px;
fill:#8bab50;
margin-right: 10px;
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
  padding: 15px 15px;
  text-align: center;
  color: black;
  text-decoration: none;
  background:transparent


  &:hover {
    border-bottom: 4px solid #8bab50;
  }

`;
const MenuLinklogo = styled(NavLink)`
  margin: 0px 0px;
  text-decoration: none!important;
`;

const LogOut = styled.p`
  margin: 0px 0px;
  padding: 30px 30px;
  border-bottom: 2px solid transparent;
  color: white;
  &:hover {
    border-bottom: 2px solid #596876;
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


@media (min-width: 0px) and (max-width: 767px) {
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


`;

const BurgerMenu = styled.div`
display: flex;
`;

const FlexLink = styled.div`
  display: flex;
  align-items: center;
  padding:0px 20px
`;

const Pattie = styled.div`
  width: 20px;
  min-height: 2px;
  background: #fefefe;
  margin: 5px  0px;
`;
const IconW = styled.svg`
  width: 20px;
  margin-right: 15px;
  fill: white;
`;

const IconB = styled.svg`
  width: 20px;
  margin-right: 15px;
  fill: #596876;
`;

const LinkHolderM = styled.div`
display: flex;
flex-direction: column;
`;
const UserInfoHolder = styled.div`
display: flex;
justify-content: space-between;
background: #596876;
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
const SvgWMenu = styled.svg`
padding-left: 20px;
fill: #8bab50;
width: 25px;
position: absolute;
z-index: 5;
top: 50%;
transform: translate(0%, -50%);
@media (max-width: 425px) {
 
}
`;


const NavBar = () => {
  const { auth,logOut,user } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  const OffClick = () =>{
    if(mobileMenu ==  true){
      setMobileMenu(false);
    }
  }

  // Define what props.theme will look like
const theme = {
  dark: "#275557"
};

  return (

    <Root onClick={() => {
      OffClick();
    }}>
      <Inner>
      <BurgerMenuHolder onClick={() => {
              setMobileMenu(!mobileMenu);
            }}>
          <BurgerMenu
            
          >
         <SvgWMenu xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M624.6 325.2c-12.3-12.4-29.7-19.2-48.4-17.2-43.3-1-49.7-34.9-37.5-98.8 22.8-57.5-14.9-131.5-87.4-130.8-77.4.7-81.7 82-130.9 82-48.1 0-54-81.3-130.9-82-72.9-.8-110.1 73.3-87.4 130.8 12.2 63.9 5.8 97.8-37.5 98.8-21.2-2.3-37 6.5-53 22.5-19.9 19.7-19.3 94.8 42.6 102.6 47.1 5.9 81.6-42.9 61.2-87.8-47.3-103.7 185.9-106.1 146.5-8.2-.1.1-.2.2-.3.4-26.8 42.8 6.8 97.4 58.8 95.2 52.1 2.1 85.4-52.6 58.8-95.2-.1-.2-.2-.3-.3-.4-39.4-97.9 193.8-95.5 146.5 8.2-4.6 10-6.7 21.3-5.7 33 4.9 53.4 68.7 74.1 104.9 35.2 17.8-14.8 23.1-65.6 0-88.3zm-303.9-19.1h-.6c-43.4 0-62.8-37.5-62.8-62.8 0-34.7 28.2-62.8 62.8-62.8h.6c34.7 0 62.8 28.1 62.8 62.8 0 25-19.2 62.8-62.8 62.8z"/></SvgWMenu>
          </BurgerMenu>

      
        </BurgerMenuHolder>

        <MenuLinklogo to="/">
          <LogoHolder>
            <Img src={Logo} width="100%" />
            <LogoHolderText>Master Your Grow</LogoHolderText>
          </LogoHolder>
        </MenuLinklogo>

        <LinkHolder>
          {!auth && (
            <>
              <MenuLink to="/login"> <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></Svg>Login</MenuLink>
              <MenuLink to="/register"> 
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></Svg>Sign Up</MenuLink>
            </>
          )}
          {auth && (
            <> 
              <Button onClick={()=>{logOut()}}>
              <SvgW xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></SvgW>
              </Button>

            </>
          )}
        </LinkHolder>

     <Empty></Empty>
      </Inner>

      {/* //mobile */}
          

            <LinkHolderMobile mobileMenu={mobileMenu}>
             
    

     
             <section>
             <MenuLinkMobile to="/public-diaries" onClick={() => { setMobileMenu(false); }}>
                     <FlexLink>
                     
                       <div>Home</div>
                     </FlexLink>
                   </MenuLinkMobile>

                 {auth && 
                  <>
                   <MenuLinkMobile to="/diaries" onClick={() => { setMobileMenu(false); }}>
                   <FlexLink>
                   
                     <div>My Diaries</div>
                   </FlexLink>
                 </MenuLinkMobile>

                 <MenuLinkMobile to="/my-devices" onClick={() => { setMobileMenu(false); }}>
                   <FlexLink>
                   
                     <div>My Devices</div>
                   </FlexLink>
                 </MenuLinkMobile>
                  </>
                 }
             </section>
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
                <div onClick={()=>{logOut()}}>
                <ButtonM >
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
