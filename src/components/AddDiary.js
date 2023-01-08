import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { DiaryContext } from "../context/diary_context";
import PlaceHolder from "../assets/placeholder.png";
import Cannabis from "../assets/sweetleaf-icons/cannabis.png";
import Mushrooms from "../assets/sweetleaf-icons/mushroom.png";
import Veg from "../assets/sweetleaf-icons/vegetables.png";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import axios from "axios";

const Input = styled(TextField)`
margin-bottom: 20px;
width: 100%;
`;
const FormHeading = styled.h1`
margin: 0px;
font-size: 20px;
color: #596876;

`;
const FormHeadingGroup = styled.div`
margin: 0px;
padding: 10px 15px;
padding-bottom: 0px;
`;


const FormSub = styled.p`
margin: 0px;

color: #596876;
`;

const Form = styled.form`
overflow: auto;
max-height: 80vh;

background: white;
border-radius: 5px;
min-width:20%;
overflow:auto;

@media (max-width:425px) {
  width: 90%;
}
@media (min-width: 426px) and (max-width: 970px) {
  width: 60%;
}
`;
const InputHolder = styled.div`
padding: 20px 15px;

`;
const InputHolderType = styled.div`
display: flex;
flex-wrap: wrap;
`;

const TypeBlock = styled.div`
padding: 10px;
margin: 10px;
border: 2px white solid;
background: #859ea34f;
border-radius: 5px;
margin-left: 0px;
display: flex;
align-items: center;
flex-direction: column;
`;

const TypeBlockActive = styled.div`
padding: 10px;
margin: 10px;
border: 2px #8bab50 solid;
background: #859ea34f;
border-radius: 5px;
margin-left: 0px;
display: flex;
align-items: center;
flex-direction: column;
`;

const TypeBlockImg = styled.img`
width: 55px;
`;
const TypeBlockText = styled.p`
margin: 0px;
`;

const Button = styled.button`
  padding: 5px 25px;
  background: #8bab50;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;
const AddDiary = (props) => {
    
    const { diaries,Update,loading } = useContext(DiaryContext);
    const [diaryList, setDiaryList] = useState([]);
    const [type, setType] = useState("");
    const [popUpOffset, setPopUpOffset] = useState(-100);
    const navigate = useNavigate();
    const { auth,authToken,userId,user } = useContext(AuthContext);
  
  
  

    const addDiary = (values)=>{
   

        values.userId = userId?.UserId
        values.UserName = user?.User
        values.Type = type

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

      const handleType = (type)=>{
        setType(type)
      }


      let types = [
        {
          type:'Cannabis',
          img:Cannabis,
        },
        {
          type:'Mushrooms',
          img:Mushrooms,
        },
        {
          type:'Fruit & Veg',
          img:Veg,
        },
      ]

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
      <FormHeading>New Diary</FormHeading>
 
        </FormHeadingGroup>
        <InputHolder>
        <FormHeading>Type of Diary</FormHeading>
        <InputHolderType>


         {types.map((t)=>{
          return(
          <>
            {type == t.type ?
            <TypeBlockActive >
            <TypeBlockImg src={t.img} width="100%"/>
            <TypeBlockText>{t.type}</TypeBlockText>
           </TypeBlockActive>:
            <TypeBlock onClick={()=>{handleType(t.type)}}>
            <TypeBlockImg src={t.img} width="100%"/>
            <TypeBlockText>{t.type}</TypeBlockText>
           </TypeBlock>
           }
          </>
                   
          )
         })}
         
        </InputHolderType>

        <div>
          <Input
            id="title"
            label="Title"
            type="title"
            variant="outlined" 
            onChange={handleChange}
            onBlur={handleBlur}
          />
          
        </div>
        
        <div>
          <Input
            id="roomType"
            label="Room Type"
            type="roomType"
                variant="outlined" 
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <Input
            id="potSize"
            label="Pot Size"
            type="potSize"
                variant="outlined" 
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <Input
            id="strain"
            label="Strain"
            type="strain"
                variant="outlined" 
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <Input
            id="lightSchedule"
            label="Light Schedule"
            type="lightSchedule"
                variant="outlined" 
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <Input
            id="lightWattage"
            label="Light Wattage"
            type="lightWattage"
                variant="outlined" 
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