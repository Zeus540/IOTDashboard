import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../src/context/auth_context";
import Stats from './pages/stats';
import Harvest from './pages/harvest';
import Notes from './pages/notes';
import NotFound from './pages/NotFound';
import Register from './pages/register';
import UploadImage from './pages/UploadImage';
import RegistrationComplete from './pages/registrationComplete';
import VerifyComplete from './pages/verifyComplete';
import DashBoard from './pages/dashBoard';
import DashBoardPublic from './pages/dashBoardPublic';

import Diaries from './pages/Diaries';
import DiariesPublic from './pages/DiariesPublic';
import Users from './pages/Users';

import ProfileUser from './pages/ProfileUser';

import Login from './pages/login';
import Devices from './pages/Devices';
import ProtectedRoutes from './components/shared/PrivateRoute';
import Terms from './components/Terms';
import CookiePolicy from './components/CookiePolicy';
import PrivacyPolicy from './components/PrivacyPolicy';
import HomePage from './pages/HomePage';

const MainContainer = (props) => {
    const { auth, userId, setAuth, user, socket } = useContext(AuthContext)


    const [hidden, setHidden] = useState(true)

 

    return (
        <div>


            <Routes>

                 {!user ?
                      <Route path="/" element={<HomePage />} /> :
                      <Route path="/" element={<DiariesPublic />} />

                } 
              
                <Route path="*" element={<NotFound />} />

                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<Register />} />
                <Route path="/sign-up/:name/:email" element={<RegistrationComplete />} />
                <Route path="/verify/:token" element={<VerifyComplete />} />
                <Route path="/public-journals" element={<DiariesPublic />} />
                <Route path="/public-journals/overview/:id" element={<DashBoardPublic />} />

                <Route path="/terms" element={<Terms />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                <Route path="/harvest/:id" element={<Harvest />} />



                <Route element={<ProtectedRoutes />}>
                    <Route path="/my-journals" element={<Diaries mobileMenu={props.mobileMenu} setMobileMenu={props.setMobileMenu} OffClick={props.OffClick} />} />
                    <Route path="/my-journals/overview/:id" element={<DashBoard />} />
                    <Route path="/my-journals/notes/:id" element={<Notes />} />
                    <Route path="/growers" element={<Users />} />

                    <Route path="/profile/:username/:userId" element={<ProfileUser />} />



                    <Route path="/profile/:username/:userId" element={<ProfileUser />} />


                    <Route path="/my-devices" element={<Devices />} />


                    <Route path="/my-devices/link-device/:deviceId" element={<Devices />} />
                </Route>

            </Routes>



        </div>
    )
}

export default MainContainer