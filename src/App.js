import React,{ useEffect,useState} from 'react';
import axios from 'axios';
import DashBoard from './pages/dashBoard';
import Diaries from './pages/Diaries';
import Login from './pages/login';
import MainPage from './pages/MainPage';
import Back from './assets/back3.jpg'
import { ThemeProvider } from 'styled-components';
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from './components/NavBar';
import { AuthProvider } from '../src/context/auth_context';
import { DiaryProvider } from '../src/context/diary_context';
import Stats from './pages/stats';
import Harvest from './pages/harvest';
import Register from './pages/register';
import UploadImage from './pages/UploadImage';
import RegistrationComplete from './pages/registrationComplete';
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
      <NavBar/>
      
        <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/diaries" element={<Diaries />} />
        <Route path="/overview/:id" element={<DashBoard />} />
        <Route path="/environment/:id" element={<Stats />} />
        <Route path="/harvest/:id" element={<Harvest />} />
        {/* <Route path="/analyzer" element={<UploadImage />} /> */}
        <Route path="/buy-now" element={<MainPage />} />
        <Route path="/register/:name:surname/:email" element={<RegistrationComplete />} />
      </Routes>
      </DiaryProvider>
      </AuthProvider>
    </ThemeProvider>
    </Inner>
    </Root>
  )
}

export default App