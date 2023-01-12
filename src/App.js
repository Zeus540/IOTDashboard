import React, { useEffect, useState, useContext } from 'react';
import Back from './assets/back3.jpg'
import { ThemeProvider } from 'styled-components';
import styled from "styled-components";
import NavBar from './components/NavBar';
import { AuthProvider } from '../src/context/auth_context';
import { DiaryProvider } from '../src/context/diary_context';
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


  return (
    <Root>
      <Image></Image>
      <Inner>
       
          <AuthProvider>
            <DiaryProvider>
         
              <NavBar />
              <MainContainer />
              <Footer />
            </DiaryProvider>
          </AuthProvider>
      
      </Inner>
    </Root>
  )
}

export default App