import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import io from 'socket.io-client';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie'
import { BroadcastChannel } from 'broadcast-channel';
import {BASE_URL_PROD,BASE_URL_PROD_SOCKET} from '../components/shared/Constants'
import axios from '../components/shared/axios';
export const AuthContext = createContext();



const socket = io(`${BASE_URL_PROD_SOCKET}`);

export const AuthProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar()

    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState();






    //Check Authentication
    useEffect(() => {
     
        console.log("session",Cookies.get('session'))
        console.log("checkAuthentication",Cookies.get('session_refresh'))
        let User = Cookies.get('user')
        
        if (User !== undefined) {
            setUser(JSON.parse(User))
            setAuth(true)
        }
        
    }, [])



    const setAuthentication = async (user) => {
       let User = JSON.parse(Cookies.get('user'))
    
        setUser(await User)
        setAuth(true)
        navigate('/my-diaries')
    }


    const logoutChannel = new BroadcastChannel('logout');

    const logOut = () => {
     
        axios.post(`${BASE_URL_PROD}/logout`).then((results)=>{

        })
        //logoutChannel.postMessage("logout")

        setAuth(false)
        navigate('/')
        //alert("You have Been Logged Out")
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
        <AuthContext.Provider value={{ auth, logOut, user, socket, setAuthentication }}>
            {children}
        </AuthContext.Provider>
    )
};
