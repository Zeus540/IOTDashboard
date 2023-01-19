import React, { useEffect, useState, useContext } from 'react';
import Back from './assets/back3.jpg'
import { ThemeProvider } from 'styled-components';
import styled from "styled-components";
import NavBar from './components/NavBar';
import { AuthContext } from './context/auth_context';
import MainContainer from './MainContainer';
import Footer from './components/Footer';

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
const{logoutAllTabs,loginAllTabs} = useContext(AuthContext)

  const OffClick = () => {
    if (mobileMenu == true) {
      setMobileMenu(false);
    }
  }

  useEffect(() => {
    logoutAllTabs()
    loginAllTabs()

   }, [])

   
  return (
    <Root onClick={()=>{OffClick()}}>
      <Image></Image>
      <Inner>

         
              <NavBar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} OffClick={OffClick}/>
              <MainContainer />
              <Footer />
       
      </Inner>
    </Root>
  )
}

export default App