import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../components/shared/axios';
import { BASE_URL_LOCAL, BASE_URL_PROD } from '../components/shared/Constants'

import { AuthContext } from './auth_context';
import Cookies from 'js-cookie'
export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {

  const [diaries, setDiaries] = useState([]);
  const [diariesPublic, setDiariesPublic] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth, user, logOut, socket } = useContext(AuthContext)


  const Update = () => {

    axios.get(`${BASE_URL_PROD}/diaries`)
      .then((response) => {
        console.log("data", response.data)
        if (response.data.length > 0) {
          setDiaries(response.data?.sort((a, b) => b.DiaryId - a.DiaryId))
        } else {
          setDiaries([])
        }

      })
      .catch((error) => {

        console.log(error);
      })
  }


  //public_diaries Listen
  useEffect(() => {

    socket.off('public_diaries').on('public_diaries', (data) => {
      console.log("user.UserId", user?.UserId)
      if (user?.UserId !== undefined) {
        setDiariesPublic(data.filter((d) => d.UserId !== user.UserId)?.sort((a, b) => b.DiaryId - a.DiaryId))
        console.log("public_diaries", data)
      } else {
        setDiariesPublic(data?.sort((a, b) => b.DiaryId - a.DiaryId))
      }

    });

    socket.off('public_diary_delete').on('public_diary_delete', (data) => {
      setDiariesPublic(data?.sort((a, b) => b.DiaryId - a.DiaryId))
      console.log("public_diaries", data)
    });
  })


  useEffect(() => {

    socket.off('get_public_diaries').emit('get_public_diaries');

    if (user !== undefined) {
      Update()
    }

  }, [user])


  return (
    <DiaryContext.Provider value={{ diaries, setDiaries, Update, loading, diariesPublic }}>
      {children}
    </DiaryContext.Provider>
  )
};

