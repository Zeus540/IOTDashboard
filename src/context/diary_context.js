import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './auth_context';

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {

  const [diaries, setDiaries] = useState([]);
const {authToken} = useContext(AuthContext)

  const Update = ()=>{
    let config = {
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }
    
    axios.get('https://api.sweetleaf.co.za/diaries',config)
    .then(function (response) {
   
      setDiaries(response.data)
    })
    .catch(function (error) {
  
      console.log(error);
    })
  }

  useEffect(() => {

 
    let config = {
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }
    
    axios.get('https://api.sweetleaf.co.za/diaries',config)
    .then(function (response) {
   
      setDiaries(response.data)
    })
    .catch(function (error) {
  
      console.log(error);
    })
 
  }, [authToken])
  

    return (
        <DiaryContext.Provider value={{ diaries, setDiaries,Update }}>
            {children}
        </DiaryContext.Provider>
    )
};

