import React,{ useEffect,useState} from 'react';
import axios from 'axios';
import DashBoard from './pages/dashBoard';
import Login from './pages/login';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThemeProvider } from 'styled-components';
import { Routes, Route, Link } from "react-router-dom";



function App() {
  const [datas,setDatas] = useState()

  const theme = {
    mh:`${datas?.slice(-1)[0]?.Moisture}px`,
    mc:`180deg,#0088b0,#005a74`,

    bh:`${datas?.slice(-1)[0]?.Batt}px!important`,
    bc:`180deg,#7adb76,#057101`,

    th:`${datas?.slice(-1)[0]?.Temp}px!important`,
    tc:` 180deg,#fc6565,#e43030`,
  }


  useEffect(() => {

    setInterval(() => {
     axios.get('https://api.odinsgate.co.za/cricket/data')
     .then(function (response) {
   
       setDatas(response.data)
   
    
     })
     .catch(function (error) {
   
       console.log(error);
     })
    }, 10000);
   
   }, [])
   
  return (
 
    <ThemeProvider theme={theme}>
    <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="login" element={<Login />} />
      </Routes>

    </ThemeProvider>
  
  )
}

export default App