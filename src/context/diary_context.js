import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../components/shared/axios';
import {BASE_URL_LOCAL,BASE_URL_PROD} from '../components/shared/Constants'

import { AuthContext } from './auth_context';
import Cookies from 'js-cookie'
export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {

  const [diaries, setDiaries] = useState([]);
  const [diariesPublic, setDiariesPublic] = useState([]);
  const [loading, setLoading] = useState(true);
  const {  auth, user, logOut, socket } = useContext(AuthContext)


  const Update = () => {

       axios.get(`${BASE_URL_PROD}/diaries`)
        .then((response) => {
          console.log("data",response.data)
          if(response.data.length > 0 ){
            setDiaries(response.data)
          }else{
            setDiaries([])
          }
      
        })
        .catch((error) => {

          console.log(error);
        })
    }
  



  useEffect(() => {
    socket.off('get_public_diaries').emit('get_public_diaries');
  }, [])

  //public_diaries Listen
  useEffect(() => {

    socket.off('public_diaries').on('public_diaries', (data) => {
      setDiariesPublic(data.filter((d) => d.UserId !== user.UserId))
      console.log("public_diaries", data)
    });

    socket.off('public_diary_delete').on('public_diary_delete', (data) => {
      setDiariesPublic(data)
      console.log("public_diaries", data)
    });
  })


  useEffect(() => {
console.log(user)
    if(user !== undefined){
      Update()
    }
      
  }, [user])


  return (
    <DiaryContext.Provider value={{ diaries, setDiaries, Update, loading, diariesPublic }}>
      {children}
    </DiaryContext.Provider>
  )
};

