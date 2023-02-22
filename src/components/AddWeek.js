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
import { useSnackbar} from 'notistack';
import MenuItem from '@mui/material/MenuItem';
import {BASE_URL_PROD} from '../components/shared/Constants'
import { TailSpin } from  'react-loader-spinner'


const Input = styled(TextField)`
margin-bottom: 20px;
width: 100%;
`;

const FormHeading = styled.h1`
margin: 0px;
font-size: 20px;
color: #354f41;

`;
const FormHeadingGroup = styled.div`
margin: 0px;
padding: 10px 15px;
padding-bottom: 0px;
`;

const FormSub = styled.p`
margin: 0px;

color:white
`;

const Form = styled.form`
overflow: auto;
max-height: 80vh;

background: white;
border-radius: 5px;
width:20%;
overflow:auto;

@media (max-width: 768px) {
  width: 90%;
}
`;
const InputHolder = styled.div`
padding: 20px 15px;

`;


const Button = styled.button`
padding: 8px 25px;
background: #ffffff00;
color: #8bab50;
border-radius: 5px;
cursor: pointer;
border: 1px solid #8bab50;
`;

const AddWeek = (props) => {
  const {enqueueSnackbar} = useSnackbar()
    const { diaries,Update } = useContext(DiaryContext);
  
    const navigate = useNavigate();
    const { auth,authToken,userId } = useContext(AuthContext);
    let token = localStorage.getItem("token")
    const [stage, setStage] = useState("")
    const [week, setWeek] = useState("")
    const [loading, setLoading] = useState(false);

    const addWeek = (values)=>{
                
      setLoading(true)
    
   var dateobj = new Date();
 

   var B = dateobj.toISOString();
 
 
   


      values.DiaryId = props.DiaryId
      values.date = B.split("T")[0]
      values.weekType = stage
      values.Week = parseInt(week)
      


      
        axios.post(`${BASE_URL_PROD}/weeks/add_week`,values)
        .then(function (response) {
          if(response.data.insertId !== undefined){
            //Update()
            enqueueSnackbar("Week Successfully Added",{variant:'success'})
            props.setPopUpOffset(-101);
            setWeek("")
            setStage("")  
      setLoading(false)

          }else{
            enqueueSnackbar(response.status,{variant:'error'})
            setLoading(false)
          }
         
         
        })
        .catch(function (error) {
          setLoading(false)
          enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
          console.log(error);
        })
     
      }

      const handleStageChange =(e,child)=>{

        setStage(e.target.value)
            }
            const handleWeekChange =(e)=>{
        
              setWeek(e.target.value)
        
                  }
    
  return (
   
    <Formik
    initialValues={{ weekType: ""}}
    // validate={(values) => {
    //   const errors = {};
    //   if (!values.email) {
    //     errors.email = "Required";
    //   } else if (
    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
    //       values.email
    //     )
    //   ) {
    //     errors.email = "Invalid email address";
    //   }
    //   return errors;
    // }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        addWeek(values)
        setSubmitting(false);
      }, 400);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      /* and other goodies */
    }) => (

      <Form onSubmit={handleSubmit}>
         

      <FormHeadingGroup>
      <FormHeading>Add Week</FormHeading>

        </FormHeadingGroup>
        <InputHolder>
     
      
        <Input 
        id="Week" 
        label="Week" 
        required
        value={week}
        onChange={(e)=>{handleWeekChange(e)}}
        type="number"
        variant="outlined" 
      
        />

        <Input 
        id="weekType" 
        label="Stage" 
        required
        value={stage}
        variant="outlined" 
        onChange={(e,child)=>{handleStageChange(e,child)}}
        select>
      <MenuItem value="Germination">Germination</MenuItem>
            <MenuItem value="Vegetation">Vegetation</MenuItem>
            <MenuItem value="Flowering">Flowering</MenuItem>
            <MenuItem value="Harvest">Harvest</MenuItem>
        </Input>
    
     
 
      
        {!loading ?
     <Button type="submit" disabled={isSubmitting}>
     Submit
   </Button>
:
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
     }

   
        </InputHolder>

   
      </Form>
    )}
  </Formik>
  )
}

export default AddWeek