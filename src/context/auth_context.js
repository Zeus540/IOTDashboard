import React, { createContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate ()
    const [auth, setAuth] = useState(false);
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('auth')));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const setToken = (token)=>{
        localStorage.setItem('token', token.token);
        localStorage.setItem('RefreshToken', token.refreshtoken);
     
        localStorage.setItem('auth', JSON.stringify({UserId:token.UserId}));
        localStorage.setItem('user', JSON.stringify({User:token.UserName}));
        setAuth(true)
        navigate('/diaries')
    }

    const logOut = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('RefreshToken');
        localStorage.removeItem('auth');
        setAuth(false)
        navigate('/login')
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setAuthToken(token)
            setAuth(true)
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{ auth, setToken,logOut,authToken,userId,user }}>
            {children}
        </AuthContext.Provider>
    )
};
