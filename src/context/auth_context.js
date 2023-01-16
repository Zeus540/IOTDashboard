import React, { createContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useLocation } from "react-router-dom"
import io from 'socket.io-client';

export const AuthContext = createContext();


const socket = io("https://api.sweetleaf.co.za");

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate ()
    const location = useLocation ()
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [auth, setAuth] = useState(false);
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('auth')));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));


     //Chat Config
  useEffect(() => {


    socket.off('connection').on('connection', () => {
      setIsConnected(true);
    });

    socket.off('disconnect').on('disconnect', () => {
      setIsConnected(false);
    });


   
  }, [])

  useEffect(() => {

    console.log("token.UserId",)
    if(auth){
        socket.off('online').emit('online', { UserId:userId.UserId});


    }


    
  })
  

    useEffect(() => {
        setUserId(JSON.parse(localStorage.getItem('auth')))
    }, [])
    
    const setToken = (token)=>{
        localStorage.setItem('token', token.token);
        localStorage.setItem('RefreshToken', token.refreshtoken);
     
        localStorage.setItem('auth', JSON.stringify({UserId:token.UserId}));
        localStorage.setItem('user', JSON.stringify({User:token.UserName}));
        setAuth(true)

        console.log(location.state)
        if(location.state !== null){
            navigate(location.state)
        }else{
            navigate('/')
        }
      
    }

    const logOut = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('RefreshToken');
        localStorage.removeItem('auth');
        setAuth(false)
        navigate('/')
    }
    const token = localStorage.getItem('token');
    useEffect(() => {
      
        if(token){
            setAuthToken(token)
            setAuth(true)
        }
    }, [token])
    
    return (
        <AuthContext.Provider value={{ auth, setToken,logOut,authToken,userId,user,socket }}>
            {children}
        </AuthContext.Provider>
    )
};
