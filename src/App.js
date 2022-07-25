import React,{ useEffect,useState} from 'react';
import axios from 'axios';
import DashBoard from './pages/dashBoard';
import Diaries from './pages/Diaries';
import Login from './pages/login';
import Back from './assets/back3.jpg'
import { ThemeProvider } from 'styled-components';
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from './components/NavBar';
import { AuthProvider } from '../src/context/auth_context';
import { DiaryProvider } from '../src/context/diary_context';

const Root = styled.div`
  background-image: url(${Back});
  background-size: cover;
  background-color: #f8f8ffc4;
  background-blend-mode: overlay;
  min-height: 100vh;

`;

function App() {

  const theme = {
  
  }



  return (
 <Root>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DiaryProvider>
      <NavBar/>
      
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="diaries" element={<Diaries />} />
        <Route path="diaries/:id" element={<DashBoard />} />

      </Routes>
      </DiaryProvider>
      </AuthProvider>
    </ThemeProvider>
    
    </Root>
  )
}

export default App