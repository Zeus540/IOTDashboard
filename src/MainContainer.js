import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../src/context/auth_context";
import Stats from './pages/stats';
import Harvest from './pages/harvest';
import Notes from './pages/notes';
import NotFound from './pages/NotFound';

import Register from './pages/register';
import UploadImage from './pages/UploadImage';
import RegistrationComplete from './pages/registrationComplete';
import VerifyComplete from './pages/verifyComplete';

import axios from 'axios';
import DashBoard from './pages/dashBoard';
import Diaries from './pages/Diaries';
import DiariesPublic from './pages/DiariesPublic';

import Login from './pages/login';
import MainPage from './pages/MainPage';


import Devices from './pages/Devices';

const MainContainer = () => {
    const { auth, setAuth } = useContext(AuthContext)
    return (
        <div>
            {!auth &&

                <Routes>
                    
                    <Route path="*" element={<NotFound />} />
             <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register/:name:surname/:email" element={<RegistrationComplete />} />
                    <Route path="/verify/:token" element={<VerifyComplete />} />
                </Routes>
            }

            {auth &&

                <Routes>
                           <Route path="*" element={<NotFound />} />
                      <Route path="/" element={<Diaries />} />
             
                      <Route path="/public-diaries" element={<DiariesPublic />} />
                      
                    <Route path="/diaries" element={<Diaries />} />
                    <Route path="/my-devices" element={<Devices />} />
                    <Route path="/my-devices/link-device/:deviceId" element={<Devices />} />
               
                    <Route path="/overview/:id" element={<DashBoard />} />
                    <Route path="/environment/:id" element={<Stats />} />
                    <Route path="/harvest/:id" element={<Harvest />} />
                    <Route path="/notes/:id" element={<Notes />} />
           
                </Routes>
            }
        </div>
    )
}

export default MainContainer