import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../src/context/auth_context";
import Stats from './pages/stats';
import Harvest from './pages/harvest';
import Register from './pages/register';
import UploadImage from './pages/UploadImage';
import RegistrationComplete from './pages/registrationComplete';
import VerifyComplete from './pages/verifyComplete';

import axios from 'axios';
import DashBoard from './pages/dashBoard';
import Diaries from './pages/Diaries';
import Login from './pages/login';
import MainPage from './pages/MainPage';

const MainContainer = () => {
    const { auth, setAuth } = useContext(AuthContext)
    return (
        <div>
            {!auth &&

                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* <Route path="/analyzer" element={<UploadImage />} /> */}
                    <Route path="/buy-now" element={<MainPage />} />
                    <Route path="/register/:name:surname/:email" element={<RegistrationComplete />} />
                    <Route path="/verify/:token" element={<VerifyComplete />} />
                </Routes>
            }

            {auth &&

                <Routes>
                    <Route path="/diaries" element={<Diaries />} />
                    <Route path="/overview/:id" element={<DashBoard />} />
                    <Route path="/environment/:id" element={<Stats />} />
                    <Route path="/harvest/:id" element={<Harvest />} />
                    <Route path="/buy-now" element={<MainPage />} />
                </Routes>
            }
        </div>
    )
}

export default MainContainer