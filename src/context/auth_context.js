import React, { createContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate ()
    const [auth, setAuth] = useState(false);
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const setToken = (token)=>{
        localStorage.setItem('token', token);
        setAuth(true)
        navigate('/diaries')
    }

    const logOut = ()=>{
        localStorage.removeItem('token');
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
        <AuthContext.Provider value={{ auth, setToken,logOut,authToken }}>
            {children}
        </AuthContext.Provider>
    )
};
