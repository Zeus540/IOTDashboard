import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { DiaryContext } from "../context/diary_context";
import PlaceHolder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import axios from "../components/shared/axios";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useSnackbar} from 'notistack';
import {BASE_URL_PROD} from '../components/shared/Constants'
import { TailSpin } from  'react-loader-spinner'
const Inner = styled.div`

width: 20%;
background: #ffffff;
padding: 20px;
border-radius: 5px;
display: flex;
justify-content: center;
flex-direction: column;
@media (max-width: 425px) {
  width: 80%;
}
@media (min-width: 426px) and (max-width: 768px) {
  width: 80%;
}
`;
const InnerHolder = styled.div`


margin-top: 15px;

display: flex;
justify-content: center;

`;


const Button = styled.button`
  padding: 8px 25px;
  background: #f0f8ff00;
  color: #8bab50;
  border: 1px  #8bab50 solid;
  border-radius: 5px;
  cursor: pointer;
  margin: 0px 20px;
`;

const Heading = styled.h2`
text-align: center;
font-size: 20px;
margin-top: 0px;
`;
const Text = styled.p`
text-align: center;
color:#f44336!important;
margin-top: 0px;
`;


const DeleteWeek = (props) => {
  const {enqueueSnackbar} = useSnackbar()
    const { diaries,Update } = useContext(DiaryContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { auth,authToken,userId } = useContext(AuthContext);
    


    const deleteWeek = ()=>{
   
    
      setLoading(true)
    
      let data = {
        WeekId:props.week.WeekId
      }

        
        axios.post(`${BASE_URL_PROD}/weeks/delete_week`,data)
        .then(function (response) {
          if(response.data.affectedRows == 1){
            enqueueSnackbar("Week Successfully Deleted",{variant:'success'})
            Update()
            props.setPopUpOffset(-101);
            props.setDays([])
            props.setGalleryData([])
                
      setLoading(false)
          }else{
            enqueueSnackbar(response.status,{variant:'error'})
            setLoading(false)
          }
       
          console.log("response",response.data.insertId);
        })
        .catch(function (error) {
          setLoading(false)
          enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
          console.log(error);
        })
     
      }


  
  return (
  <>
    <Inner>
      <Heading>
        Are you sure you want to delete Week {props.week.Week} ?
      </Heading>
      <Text>
        Warning this action will deleted all information relating to week {props.week.Week} and is irreversible !
      </Text>
      
      {!loading ?
   <InnerHolder>
   <Button onClick={()=>{deleteWeek()}}>
           Yes
         </Button>
         <Button onClick={()=>{props.setPopUpOffset(-101)}}>
           Cancel
         </Button>
         </InnerHolder>
:
<InnerHolder>
<TailSpin
  height="40"
  width="40"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
</InnerHolder>
     }

   
        </Inner>  
  </>
  )
}

export default DeleteWeek