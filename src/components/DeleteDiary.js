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
import axios from "axios";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';



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


display: flex;
justify-content: center;

`;


const Button = styled.button`
  padding: 5px 25px;
  background: #8bab50;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin: 0px 20px;
`;

const Heading = styled.h2`
text-align: center;
font-size: 21px;
margin-top: 0px;
`;
const Text = styled.p`
text-align: center;
color:#f44336;
margin-top: 0px;
`;


const DeleteDiary = (props) => {
    
    const { diaries,Update,loading } = useContext(DiaryContext);
  
    const navigate = useNavigate();
    const { auth,authToken,userId } = useContext(AuthContext);
    


    const deleteDiary = ()=>{

      let data ={
        DiaryId:props.Diary.DiaryId
      }
  
      let config = {
        headers: {
          authorization: 'Bearer ' + authToken,
        }
      }
      axios.post('https://api.sweetleaf.co.za/diaries/delete',data,config)
      .then(function (response) {
        if(response.data.affectedRows > 0){
          navigate('/')
          props.setPopUpOffset(-101);
        }
  
       
      })
      .catch(function (error) {
    
        console.log(error);
      })
   
    }

  
  return (
  <>
    <Inner>
      <Heading>
        Are you sure you want to delete <br/> {props.Diary.Title} ?
      </Heading>
      <Text>
        Warning this action will delete all information relating to {props.Diary.Title} <br/> this action is irreversible !
      </Text>
      
      <InnerHolder>
  <Button onClick={()=>{deleteDiary()}}>
          Yes
        </Button>
        <Button onClick={()=>{props.setPopUpOffset(-101)}}>
          Cancel
        </Button>
        </InnerHolder>
        </Inner>  
  </>
  )
}

export default DeleteDiary