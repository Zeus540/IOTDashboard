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
import UploadImage from './pages/UploadImage';

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
        
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<Login />} />
       
        <Route path="diaries" element={<Diaries />} />
        <Route path="overview/:id" element={<DashBoard />} />
        <Route path="stats/:id" element={<Stats />} />
        <Route path="upload" element={<UploadImage />} />
      </Routes>
      </DiaryProvider>
      </AuthProvider>
    </ThemeProvider>
    
    </Root>
  )
}

export default App