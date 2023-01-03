import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './auth_context';

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {

  const [diaries, setDiaries] = useState([]);
  const [diariesPublic, setDiariesPublic] = useState([]);
  const [loading, setLoading] = useState(true);
const {authToken,auth,userId,logOut} = useContext(AuthContext)

let token = localStorage.getItem("token")

  const Update = ()=>{


    if(token !== null){
    let config = {
      headers: {
        authorization: 'Bearer ' + token,
      }
    }
    
    axios.get('https://api.sweetleaf.co.za/diaries',config)
    .then((response) => {
      if(response.data == "Forbiden"){
        logOut()
      }else{
        setDiaries(response.data)
      }

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
    UpdatePublic()
   
  }, [token])
  

    return (
        <DiaryContext.Provider value={{ diaries, setDiaries,Update,loading,UpdatePublic,diariesPublic }}>
            {children}
        </DiaryContext.Provider>
    )
};

