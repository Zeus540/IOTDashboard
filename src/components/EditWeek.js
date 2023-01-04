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
import FormControl from '@mui/material/FormControl';



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

const EditWeek = (props) => {
    
    const { diaries,Update,loading } = useContext(DiaryContext);
  const [technique_Name, setTechnique_Name] = useState("Topping")
    const navigate = useNavigate();
    const { auth,authToken,userId } = useContext(AuthContext);
    const [stage, setStage] = useState("")
    const [week, setWeek] = useState("")

    



    const editWeek = (values)=>{
   
  
      var dateobj = new Date();
 

      var B = dateobj.toISOString();

         values.WeekId = props.week.WeekId
         values.Week = parseInt(week)
         values.weekType = stage
         
           console.log("values",values);
   
           let config = {
             headers: {
               authorization: 'Bearer ' + authToken,
             }

        }
        
        axios.post('https://api.sweetleaf.co.za/weeks/edit_week',values,config)
        .then(function (response) {
          if(response.data.insertId !== undefined){
            console.log("response.data",response.data);
            Update()
            props.setPopUpOffset(-101);
          
          }
         
          console.log("response",response.data.insertId);
        })
        .catch(function (error) {
      
          console.log(error);
        })
     
  }
        // let data = {
        //   WeekId:props.week.WeekId,
        //   Technique_Name:technique_Name
        // }

        //  axios.post('https://api.sweetleaf.co.za/techniques/add',data,config,)
        //   .then(function (response) {
        //     if(response.data.insertId !== undefined){
        //       console.log("response",response.data.insertId);
        //     }
           
        
        //   })
        //   .catch(function (error) {
        
        //     console.log(error);
        //   })
    


  


    


    useEffect(() => {
      axios.get('https://api.sweetleaf.co.za/techniques')
      .then(function (response) {
        
          console.log("techniques",response.data);
      
       
    
      })
      .catch(function (error) {
    
        console.log(error);
      })
    }, [])
    
  
    let data = { 
      weekType: props.week.Stage
    }
    
    useEffect(() => {
      console.log(  props?.week);
    
      setWeek(props?.week?.Week)
    if(props?.week?.Stage == "GER"){
      setStage("Germination")
    }
    if(props?.week?.Stage == "VEG"){
      setStage("Vegetation")
    }
    if(props?.week?.Stage == "FLO"){
      setStage("Flowering")
    }
    if(props?.week?.Stage == "HAR"){
      setStage("Harvest")
    }
    }, [props])
    

    const handleStageChange =(e)=>{

setStage(e.target.value)
    }
    const handleWeekChange =(e)=>{

      setWeek(e.target.value)

          }
  return (
   
    <Formik
    initialValues={data}
    enableReinitialize
   
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        editWeek(values)
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
      <FormHeading>Edit Week</FormHeading>

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
        onChange={(e)=>{handleStageChange(e)}}
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

export default EditWeek