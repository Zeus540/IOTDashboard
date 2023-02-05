import React from 'react';
import Cookies from 'js-cookie'
import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  let User = Cookies.get('user')

  if (User !== undefined) {
    return true
}else {
  return false
}
 
}

const  ProtectedRoutes=(props) =>{

  const auth=useAuth()

  return auth?<Outlet/>: <Navigate to="/"/>
}

export default ProtectedRoutes;