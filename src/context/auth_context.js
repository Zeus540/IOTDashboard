import React, { createContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useLocation } from "react-router-dom"
import io from 'socket.io-client';
import { useSnackbar} from 'notistack';
export const AuthContext = createContext();


const socket = io("https://api.sweetleaf.co.za");

export const AuthProvider = ({ children }) => {
    const {enqueueSnackbar} = useSnackbar()
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
    
    useEffect(() => {
        socket.off('diary_added').on('diary_added', (data) => {
            if(data.UserId !== userId?.UserId){
                enqueueSnackbar(`New Diary ${data.Title} Added by ${data.UserName}`)
            }

  
            console.log("diary_added",  data)
          });

          if(token){
            socket.off('liked_diary').on('liked_diary', (data) => {
        
                if(data.UserId == userId?.UserId){
                    enqueueSnackbar(`${data.UserName} Liked ${data.Diary}`)
                }
                console.log("liked_diary",  data)
              });
        }
   

       
    })
    
    return (
        <AuthContext.Provider value={{ auth, setToken,logOut,authToken,userId,user,socket }}>
            {children}
        </AuthContext.Provider>
    )
};
