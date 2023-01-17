import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './auth_context';

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {

  const [diaries, setDiaries] = useState([]);
  const [diariesPublic, setDiariesPublic] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken, auth, userId, logOut, socket } = useContext(AuthContext)

  let token = localStorage.getItem("token")

  const Update = () => {


    if (token !== null) {
      let config = {
        headers: {
          authorization: 'Bearer ' + token,
        }
      }

      axios.get('https://api.sweetleaf.co.za/diaries', config)
        .then((response) => {
          if (response.data == "Forbiden") {
            logOut()
          } else {
            setDiaries(response.data)
          }

        })
        .catch((error) => {

          console.log(error);
        }).finally((response) => {
          if (response?.data !== "Forbiden") {
            setLoading(false)
          }

        })
    }
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

    if (token) {
      Update()
    }


  }, [token])


  return (
    <DiaryContext.Provider value={{ diaries, setDiaries, Update, loading, diariesPublic }}>
      {children}
    </DiaryContext.Provider>
  )
};

