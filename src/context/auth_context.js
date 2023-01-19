import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import io from 'socket.io-client';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie'
import { BroadcastChannel } from 'broadcast-channel';
import {BASE_URL_PROD,BASE_URL_PROD_SOCKET} from '../components/shared/Constants'
export const AuthContext = createContext();



const socket = io(`${BASE_URL_PROD_SOCKET}`);

export const AuthProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar()

    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState();




    const checkAuthentication = async () => {
        console.log("checkAuthentication")
        let user =  JSON.parse(localStorage.getItem("user"))
        if (user) {
            setUser(user)
            setAuth(true)
        }
    }

    //Check Authentication
    useEffect(() => {
     
        checkAuthentication()
    }, [])

    const loginChannel = new BroadcastChannel('login');

    const setAuthentication = async (user) => {
        loginChannel.postMessage("login")
        localStorage.setItem("user", JSON.stringify(user))
        setUser(await user)
        setAuth(true)
        navigate('/')
    }


    const logoutChannel = new BroadcastChannel('logout');

    const logOut = () => {
     
        logoutChannel.postMessage("logout")
        localStorage.removeItem("user")
        setAuth(false)
        alert("You have Been Logged Out")
    }

  

    const logoutAllTabs = () => {
        logoutChannel.onmessage = () => {
            logOut();
            logoutChannel.close();
    
    
        }
    }



    const loginAllTabs = () => {
        loginChannel.onmessage = () => {
            checkAuthentication(true);
            loginChannel.close();
    
    
        }
    }

  

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
        socket.off('diary_added').on('diary_added', (data) => {
            if (data.UserId !== user?.UserId) {
                enqueueSnackbar(`New Diary ${data.Title} Added by ${data.UserName}`)
            }


            console.log("diary_added", data)
        });

        if (true) {
            socket.off('liked_diary').on('liked_diary', (data) => {

                if (data.UserId !== user?.UserId) {
                    enqueueSnackbar(`${data.UserName} Liked ${data.Diary}`)
                }
                console.log("liked_diary", data)
            });
        }



    })

    return (
        <AuthContext.Provider value={{ auth, logOut, user, socket,logoutAllTabs,loginAllTabs, setAuthentication }}>
            {children}
        </AuthContext.Provider>
    )
};
