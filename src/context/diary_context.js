import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {

  const [diaries, setDiaries] = useState([]);

  useEffect(() => {

 
    axios.get('http://api.sweetleaf.co.za/nodemcu/diaries')
    .then(function (response) {
   
      setDiaries(response.data)
    })
    .catch(function (error) {
  
      console.log(error);
    })
 
  }, [])
  

    return (
        <DiaryContext.Provider value={{ diaries, setDiaries }}>
            {children}
        </DiaryContext.Provider>
    )
};

