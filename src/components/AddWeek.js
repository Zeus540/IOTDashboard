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

import MenuItem from '@mui/material/MenuItem';




const Input = styled(TextField)`
margin-bottom: 20px;
width: 100%;
`;

const FormHeading = styled.h1`
margin: 0px;
font-size: 24px;
color:white
`;
const FormHeadingGroup = styled.div`
margin: 0px;
background:#275557;
color:white;
padding: 10px 15px;
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
  padding: 5px 25px;
  background: #275557;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

const AddWeek = (props) => {
    
    const { diaries,Update,loading } = useContext(DiaryContext);
  
    const navigate = useNavigate();
    const { auth,authToken,userId } = useContext(AuthContext);
    let token = localStorage.getItem("token")
    const [stage, setStage] = useState("")
    const [week, setWeek] = useState("")
  

    const addWeek = (values)=>{
   
    
   var dateobj = new Date();
 

   var B = dateobj.toISOString();
 
 
   


      values.DiaryId = props.DiaryId
      values.date = B.split("T")[0]
      values.weekType = stage
      values.Week = parseInt(week)
      
        console.log("values",values);

        let config = {
          headers: {
            authorization: 'Bearer ' + authToken,
          }
        }
        
        axios.post('https://api.sweetleaf.co.za/weeks/add_week',values,config,)
        .then(function (response) {
          if(response.data.insertId !== undefined){
            Update()
            props.setPopUpOffset(-101);
            setWeek("")
            setStage("")
          }
         
          console.log("response",response.data.insertId);
        })
        .catch(function (error) {
      
          console.log(error);
        })
     
      }

      const handleStageChange =(e,child)=>{
console.log("child",child)
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
        value={week}
        onChange={(e)=>{handleWeekChange(e)}}
        type="number"
        variant="outlined" 
      
        />

        <Input 
        id="weekType" 
        label="Stage" 
        value={stage}
        variant="outlined" 
        onChange={(e,child)=>{handleStageChange(e,child)}}
        select>
      <MenuItem value="Germination">Germination</MenuItem>
            <MenuItem value="Vegetation">Vegetation</MenuItem>
            <MenuItem value="Flowering">Flowering</MenuItem>
            <MenuItem value="Harvest">Harvest</MenuItem>
        </Input>
    
     
 
      
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        </InputHolder>

   
      </Form>
    )}
  </Formik>
  )
}

export default AddWeek