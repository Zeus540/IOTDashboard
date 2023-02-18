import Axios from "axios";

import io from 'socket.io-client';
import {BASE_URL_PROD,BASE_URL_PROD_SOCKET} from '../../components/shared/Constants'
import Cookies from 'js-cookie'

let axios = Axios.create()
const socket = io(`${BASE_URL_PROD_SOCKET}`);

axios.defaults.withCredentials = true
axios.interceptors.response.use(
    function (response){
        return response
    },
    function (error){

    
        console.log("error.response.status",)

       if(error.response.status === 401){
        let User = JSON.parse(Cookies.get('user'))
        socket.off('user_logout').emit('user_logout', { UserId: User.UserId });

        axios.post(`${BASE_URL_PROD}/logout`).then((results)=>{
            window.location.replace('/')
            })
       }
       return Promise.reject(error)
    }
)

export default axios