import React, { useEffect, useState, useContext } from 'react';
import Back from './assets/back3.jpg'
import { ThemeProvider } from 'styled-components';
import styled from "styled-components";
import NavBar from './components/NavBar';
import { AuthContext } from './context/auth_context';
import MainContainer from './MainContainer';
import Footer from './components/Footer';
import Cookiepolicy from './components/shared/Cookiepolicy';
import Cookies from 'js-cookie';

const Root = styled.div`


  min-height: 100vh;

`;

const Image = styled.div`
  // background-image: url(${Back});
  background-size: cover;
  background-color:whitesmoke;
  background-blend-mode: saturation;
  min-height: 100vh;
  position: fixed;
  z-index: 2;
  width:100vw;

`;


const Inner = styled.div`

position: relative;
z-index: 5;

`;

function App() {

  const [mobileMenu, setMobileMenu] = useState(false);
  const [acceptCookies, setAcceptCookies] = useState(false);
const{loginAllTabs} = useContext(AuthContext)

  const OffClick = () => {
    if (mobileMenu == true) {
      setMobileMenu(false);
    }
  }

  useEffect(() => {
    let cookie = Cookies.get('cookies')

 console.log("cookiecookie",cookie)
    if(cookie !== undefined){
      setAcceptCookies(true)
    }
   }, [])

   const SetCookie = ()=>{

    setAcceptCookies(true)
    Cookies.set('cookies', "true", { expires: 7 })
   }
   
  return (
    <Root onClick={()=>{OffClick()}}>
      <Image></Image>
      <Inner>

         
              <NavBar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} OffClick={OffClick}/>
              <MainContainer />
              <Footer />
              {!acceptCookies && 
       <Cookiepolicy SetCookie={SetCookie}/>
      }
      </Inner>
    </Root>
  )
}

export default App