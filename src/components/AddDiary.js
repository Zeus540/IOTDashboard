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

const AddDiary = (props) => {
    
    const { diaries,Update,loading } = useContext(DiaryContext);
    const [diaryList, setDiaryList] = useState([]);
    const [popUpOffset, setPopUpOffset] = useState(-100);
    const navigate = useNavigate();
    const { auth,authToken,userId,user } = useContext(AuthContext);
  
  
  

    const addDiary = (values)=>{
   

        values.userId = userId?.UserId
        values.UserName = user?.User
        
        console.log("values",values);
        let config = {
          headers: {
            authorization: 'Bearer ' + authToken,
          }
        }
        
        axios.post('https://api.sweetleaf.co.za/diaries/add',values,config,)
        .then(function (response) {
          if(response.data.insertId !== undefined){
            Update()
            props.setPopUpOffset(-101);
          }
         
          console.log("response",response.data.insertId);
        })
        .catch(function (error) {
      
          console.log(error);
        })
     
      }

  return (
   
    <Formik
    initialValues={{ title: "", roomType: "", userId:userId?.UserId }}
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
        addDiary(values)
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
      <FormHeading>Lets Get Setup</FormHeading>
      <FormSub>Fill out the form below</FormSub>
        </FormHeadingGroup>
        <InputHolder>
     
        <div>
          <Input
            id="title"
            label="Title"
            type="title"
            variant="filled"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        
        <div>
          <Input
            id="roomType"
            label="Room Type"
            type="roomType"
            variant="filled"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <Input
            id="potSize"
            label="Pot Size"
            type="potSize"
            variant="filled"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <Input
            id="strain"
            label="Strain"
            type="strain"
            variant="filled"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <Input
            id="lightSchedule"
            label="Light Schedule"
            type="lightSchedule"
            variant="filled"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <Input
            id="lightWattage"
            label="Light Wattage"
            type="lightWattage"
            variant="filled"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

     

      
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        </InputHolder>
      </Form>
    )}
  </Formik>
  )
}

export default AddDiary