import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import io from 'socket.io-client';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie'
import {BASE_URL_PROD,BASE_URL_PROD_SOCKET} from '../components/shared/Constants'
import axios from '../components/shared/axios';
import { faL } from '@fortawesome/free-solid-svg-icons';
export const AuthContext = createContext();



const socket = io(`${BASE_URL_PROD_SOCKET}`,
{
    withCredentials:true
}
);



export const AuthProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar()

    const navigate = useNavigate()
    const location = useLocation()
    
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [auth, setAuth] = useState(false);
    const [newDiary, setNewDiary] = useState(false);
    const [newDiaryData, setNewDiaryData] = useState([]);
    
    const [user, setUser] = useState();
    const [userList, setUserList] = useState();
    





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
        navigate('/my-journals')
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

     
        socket.on('connect', () => {
            setIsConnected(socket.connected);
      
            console.log("connected")
        });
      
    
     
      

    }, [])



    useEffect(() => {
        
        if(isConnected){

       
            if(location.pathname !== "/"){

            
        socket.off('diary_added').on('diary_added', (data) => {
            if (data.UserId !== user?.UserId) {
                setNewDiary(true)
                setNewDiaryData(data)
                setTimeout(() => {
                    setNewDiary(false)
                }, 5000);

                //enqueueSnackbar(`New Diary ${data.Title} Added by ${data.UserName}`, { variant: 'info' })
            }
        });
    }
     
        
        

        if (auth) {
            socket.off('liked_diary').on('liked_diary', (data) => {
             
                if (data.user.UserId !== user?.UserId) {
                    if (data.DiaryUserId == user?.UserId) {
                        enqueueSnackbar(`${data.user.UserName} Liked Your ${data.Diary}`, { variant: 'info' })
                    }
                }
            });


            socket.off('users').on('users', (data) => {
                console.log("users",data)
                setUserList(data.filter((r)=> r.UserId !== user.UserId))
            });

         
            
        }

 }

    })

    return (
        <AuthContext.Provider value={{ auth, logOut, user, socket, setAuthentication,userList,newDiary,newDiaryData }}>
            {children}
        </AuthContext.Provider>
    )
};
