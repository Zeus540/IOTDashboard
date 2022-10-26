import React, { useEffect, useState, useContext } from 'react';
import Back from './assets/back3.jpg'
import { ThemeProvider } from 'styled-components';
import styled from "styled-components";
import NavBar from './components/NavBar';
import { AuthProvider } from '../src/context/auth_context';
import { DiaryProvider } from '../src/context/diary_context';
import MainContainer from './MainContainer';

const Root = styled.div`


  min-height: 100vh;

`;

const Image = styled.div`
  background-image: url(${Back});
  background-size: cover;
  background-color: #121b1cc4;
  background-blend-mode: overlay;
  min-height: 100vh;
  position: fixed;
  z-index: 2;
  width:100vw;
  @media (max-width: 425px) {
    background-image:unset;
  }
`;


const Inner = styled.div`

position: relative;
z-index: 5;

`;

function App() {

  const theme = {

  }



  return (
    <Root>
      <Image></Image>
      <Inner>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <DiaryProvider>
              <NavBar />
              <MainContainer />
            </DiaryProvider>
          </AuthProvider>
        </ThemeProvider>
      </Inner>
    </Root>
  )
}

export default App