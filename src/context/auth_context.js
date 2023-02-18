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
   
        let User = Cookies.get('user')
        
        if (User !== undefined) {
            setUser(JSON.parse(User))
            setAuth(true)
        }else{
            setUser(undefined)
            setAuth(false)
        }
        
    }, [])



    const setAuthentication = async (user) => {
       let User = JSON.parse(Cookies.get('user'))
    console.log("User",User.UserId)
    socket.off('user_login').emit('user_login', { UserId: User.UserId });
   

        setUser(await User)
        setAuth(true)
        navigate('/my-diaries')
    }


    //const logoutChannel = new BroadcastChannel('logout');

    const logOut = () => {
     
        
        let User = JSON.parse(Cookies.get('user'))
        console.log("User",User.UserId)
        socket.off('user_logout').emit('user_logout', { UserId: User.UserId });

        axios.post(`${BASE_URL_PROD}/logout`).then((results)=>{
        if(results.status == 200){
            setAuth(false)
            setUser(undefined)
            navigate('/')
            // Cookies.remove("user")
        }
        })
        //logoutChannel.postMessage("logout")

      
        //alert("You have Been Logged Out")
    }

  





    //Chat Config
    useEffect(() => {


        socket.off('connection').on('connection', () => {
            setIsConnected(true);
        });

    



    }, [])


    useEffect(() => {
        socket.off('diary_added').on('diary_added', (data) => {
            if (data.UserId !== user?.UserId) {
                enqueueSnackbar(`New Diary ${data.Title} Added by ${data.UserName}`, { variant: 'info' })
            }



        });

        if (true) {
            socket.off('liked_diary').on('liked_diary', (data) => {

                if (data.UserId !== user?.UserId) {
                    enqueueSnackbar(`${data.UserName} Liked ${data.Diary}`, { variant: 'info' })
                }
              
            });
        }



    })

    return (
        <AuthContext.Provider value={{ auth, logOut, user, socket, setAuthentication }}>
            {children}
        </AuthContext.Provider>
    )
};
