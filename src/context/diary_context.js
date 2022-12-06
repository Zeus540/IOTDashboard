import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './auth_context';

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {

  const [diaries, setDiaries] = useState([]);
  const [diariesPublic, setDiariesPublic] = useState([]);
  const [loading, setLoading] = useState(true);
const {authToken,auth,userId} = useContext(AuthContext)

let token = localStorage.getItem("token")

  const Update = ()=>{

    if(token !== ""){
    let config = {
      headers: {
        authorization: 'Bearer ' + token,
      }
    }
    
    axios.get('https://api.sweetleaf.co.za/diaries',config)
    .then((response) => {
      console.log("response",response.data)
      setDiaries(response.data)
    })
    .catch((error) => {
  
      console.log(error);
    }).finally((response)=>{
      if(response?.data !== "Forbiden"){
        setLoading(false)
      }
     
    })
  }
  }

  const UpdatePublic = ()=>{

    axios.get('https://api.sweetleaf.co.za/diaries/public')
    .then((response) => {
      console.log("response",response.data)
      setDiariesPublic(response.data)
    })
    .catch((error) => {
  
      console.log(error);
    }).finally((response)=>{
      if(response?.data !== "Forbiden"){
        setLoading(false)
      }
     
    })
  }


  
  useEffect(() => {

    if(token){
      Update()
    }
   
   
  }, [token])
  

    return (
        <DiaryContext.Provider value={{ diaries, setDiaries,Update,loading,UpdatePublic,diariesPublic }}>
            {children}
        </DiaryContext.Provider>
    )
};

