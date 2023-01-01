import React,{useContext,useEffect} from 'react';
import { useLocation, useParams } from "react-router-dom";
import { DiaryContext } from "../context/diary_context";
import { AuthContext } from "../context/auth_context";

import {Navigate, Outlet} from 'react-router-dom'



const useAuth=()=>{

  const params = useParams();
  const { diaries } = useContext(DiaryContext);
  const { userId } = useContext(AuthContext);
  
  let filtered = diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
  
  if(userId.UserId == filtered?.UserId){
    return true
  } else {
    return false
  }
}



const  ProtectedRoutes=() =>{

  
  const auth=useAuth()

  return auth?<Outlet/>: <Navigate to="/"/>
}

export default ProtectedRoutes;