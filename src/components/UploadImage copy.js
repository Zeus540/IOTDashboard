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

color:white
`;
const FormHeadingGroup = styled.div`
margin: 0px;
background:#596876;
color:white;
padding: 20px;
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
padding: 20px;

`;


const Button = styled.button`
  padding: 5px 25px;
  background: #596876;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

const UploadImage = (props) => {
    
    const { diaries,Update,loading } = useContext(DiaryContext);
    const [img, setImg] = useState([]);
    const [popUpOffset, setPopUpOffset] = useState(-100);
    const navigate = useNavigate();
    const { auth,authToken,userId } = useContext(AuthContext);
  
  
    const handleSetImage = (e)=>{
    
      setImg(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
      console.log("img",img)
    }, [img])
    

    const UploadImage = (e,img)=>{
      console.log("e",e)
      console.log("upload img",img)
      
        // values.userId = userId?.UserId
        // console.log("values",values);
        // let config = {
        //   headers: {
        //     authorization: 'Bearer ' + authToken,
        //   }
        // }
        
        // axios.post('https://api.sweetleaf.co.za/diaries/add',values,config,)
        // .then(function (response) {
        //   if(response.data.insertId !== undefined){
        //     Update()
        //     props.setPopUpOffset(-101);
        //   }
         
        //   console.log("response",response.data.insertId);
        // })
        // .catch(function (error) {
      
        //   console.log(error);
        // })
     
      }

  return (
   
    <Formik
    initialValues={{ userId:userId?.UserId }}
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
        UploadImage(values)
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

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
         

      <FormHeadingGroup>
      <FormHeading>Image Upload</FormHeading>
     
        </FormHeadingGroup>
        <InputHolder>
     
     <img src={img} width="100%"/>
        <div>
          <Input
            id="image"
            //label="Title"
            type="file"
            variant="filled"
            onChange={handleSetImage}
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

export default UploadImage