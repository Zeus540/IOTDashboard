import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../components/shared/axios';
import { BASE_URL_LOCAL, BASE_URL_PROD } from '../components/shared/Constants'
import { useSnackbar} from 'notistack';
import { AuthContext } from './auth_context';
import Cookies from 'js-cookie'
export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {

  const [diaries, setDiaries] = useState([]);
  const [diariesPublic, setDiariesPublic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPublic, setLoadingPublic] = useState(true);
  const { auth, user, logOut, socket } = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()

  const Update = () => {

    axios.get(`${BASE_URL_PROD}/diaries`)
      .then((response) => {
   
        if (response.data.length > 0) {
          setDiaries(response.data?.sort((a, b) => b.DiaryId - a.DiaryId))
          setLoading(false)
        } else {
          setDiaries([])
        }

      })
      .catch((error) => {
        enqueueSnackbar(`${error?.response?.status} ${error?.response?.statusText}`,{variant:'error'})

      })
  }


  //public_diaries Listen
  useEffect(() => {

    socket.off('public_diaries').on('public_diaries', (data) => {

      if (user?.UserId !== undefined) {

        setDiariesPublic(data.filter((d) => d.UserId !== user.UserId)?.sort((a, b) => b.DiaryId - a.DiaryId))
        setLoadingPublic(false)
      } else {
        setDiariesPublic(data?.sort((a, b) => b.DiaryId - a.DiaryId))
        setLoadingPublic(false)
      }

    });

    socket.off('public_diary_delete').on('public_diary_delete', (data) => {
      setDiariesPublic(data?.sort((a, b) => b.DiaryId - a.DiaryId))

    });
  })


  const getPublic = () => {

    socket.off('get_public_diaries').emit('get_public_diaries');
  }
  
  useEffect(() => {

  
console.log("updating public")
    getPublic()

  }, [])


  return (
    <DiaryContext.Provider value={{ diaries, setDiaries, Update, loading,loadingPublic, diariesPublic,getPublic }}>
      {children}
    </DiaryContext.Provider>
  )
};

