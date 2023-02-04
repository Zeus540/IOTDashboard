import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../components/shared/axios';
import {BASE_URL_LOCAL,BASE_URL_PROD} from '../components/shared/Constants'

import { AuthContext } from './auth_context';

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {

  const [diaries, setDiaries] = useState([]);
  const [diariesPublic, setDiariesPublic] = useState([]);
  const [loading, setLoading] = useState(true);
  const {  auth, user, logOut, socket } = useContext(AuthContext)


  const Update = () => {

       axios.get(`${BASE_URL_PROD}/diaries`)
        .then((response) => {
          if (response.data == "Forbiden") {
            logOut()
          } else {
            setDiaries(response.data)
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
      setDiariesPublic(data)
      console.log("public_diaries", data)
    });

    socket.off('public_diary_delete').on('public_diary_delete', (data) => {
      setDiariesPublic(data)
      console.log("public_diaries", data)
    });
  })


  useEffect(() => {
    if(user){
      Update()
    }
      
  }, [user])


  return (
    <DiaryContext.Provider value={{ diaries, setDiaries, Update, loading, diariesPublic }}>
      {children}
    </DiaryContext.Provider>
  )
};

