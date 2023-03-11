import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { TextField,Rating } from "@mui/material";
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
margin-bottom: 15px;
width: 100%;
`;

const InputG = styled(TextField)`
margin-bottom: 10px;
width: calc(100% /2 - 8px);
`;
const InputGrp = styled.div`
display: flex;
justify-content: space-between;
`;
const InputGrpSmells = styled.div`
display: flex;
flex-wrap: wrap;
margin-bottom: 15px;
`;

const FormHeadingTop = styled.h1`
margin: 0px;
font-size: 20px;
color: #354f41;

`;
const FormHeading = styled.h1`
margin: 0px;
font-size: 20px;
color: #354f41;
margin-bottom: 10px;
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
width:50em;
overflow:auto;

@media (max-width:425px) {
  width: 90%;
}
@media (min-width: 426px) and (max-width: 970px) {
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

const Smell = styled.div`
padding: 10px 20px;
background: ${(props) => props.back};
width: 100%;
text-align: center;
@media (max-width:425px) {
  margin: 10px;
}
@media (min-width: 426px) and (max-width: 970px) {
  margin: 10px;
}
`;
const SmellMain = styled.div`
padding: 10px 20px;

color: #354f41;
border-radius: 5px;
width: calc(100% / 3 - 60px);
margin: 0px 10px;
flex-direction: column;
font-size: 14px;
display: flex;
align-items: center;
justify-content: space-between;
@media (max-width:425px) {
  margin: 10px;
}
@media (min-width: 426px) and (max-width: 970px) {
  margin: 10px;
}
`;

const SmellRemove = styled.div`
padding-bottom: 10px;
color: #F44336;
`;
const AddWeek = (props) => {
  const {enqueueSnackbar} = useSnackbar()
    const { diaries,Update } = useContext(DiaryContext);
  
    const navigate = useNavigate();
    const { auth,authToken,userId } = useContext(AuthContext);
    let token = localStorage.getItem("token")
    const [stage, setStage] = useState("")
    const [germinationMethod, setGerminationMethod] = useState("")
    const [germination_Methods, setGermination_Methods] = useState([])
    const [smells, setSmells] = useState([])
    const [selectedSmells, setSelectedSmells] = useState([])
    const [smell, setSmell] = useState("")
    const [week, setWeek] = useState("")
    const [loading, setLoading] = useState(false);


    useEffect(() => {
       console.log(stage)

      if(stage.toLowerCase() == "germination" ){
        axios.get(`${BASE_URL_PROD}/germination`)
        .then(function (response) {
          setGermination_Methods(response.data)
  
        }).catch((err)=>{
          console.log(err)
          enqueueSnackbar(err.status,{variant:'error'})
        })
      }
      
      if(stage.toLowerCase() == "harvest" ){
        axios.get(`${BASE_URL_PROD}/smells`)
        .then(function (response) {
          setSmells(response.data)
  
        }).catch((err)=>{
          console.log(err)
          enqueueSnackbar(err.status,{variant:'error'})
        })
      }
  

      
    }, [stage])
  

    const addWeek = (values)=>{
                
      setLoading(true)
    
   var dateobj = new Date();
 

   var B = dateobj.toISOString();
 
 



      values.DiaryId = props.DiaryId
      values.Start_Date = props.activeDiary.Start_Date
      values.date = B.split("T")[0]
      values.weekType = stage
      values.germination_Method = germinationMethod
      values.Week = parseInt(week)
      values.selectedSmells = selectedSmells
      

      
        axios.post(`${BASE_URL_PROD}/weeks/add_week`,values)
        .then(function (response) {
          if(response.data.insertId !== undefined){
            Update()
            enqueueSnackbar("Week Successfully Added",{variant:'success'})
            props.setPopUpOffset(-101);
            setWeek("")
            setStage("")  
            setGerminationMethod("")  
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

            const handleGerminationChange =(e,child)=>{

              setGerminationMethod(e.target.value)
                  }

                  const handleSmellChange =(e,child)=>{

                    let obj = child.props.value
                    if(selectedSmells.length < 4){
                      setSelectedSmells([...selectedSmells,obj])
                 
                      setSmell(e.target.value)
                    }
              
                        
                  }

                  const handleSmellRemove =(s)=>{

                    let obj = s

                   

                    setSelectedSmells( selectedSmells.filter((ss)=> ss !== obj))
                   
              
                        
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
      <FormHeadingTop>Add Week</FormHeadingTop>

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
    
    {stage == "Germination" && 
    <>
          <FormHeading>Germination Method</FormHeading>
          <Input 
        id="GerminationMethod" 
        label="Germination Method" 
        required
        value={germinationMethod}
        variant="outlined" 
        onChange={(e,child)=>{handleGerminationChange(e,child)}}
        select>
          {germination_Methods.map((m)=>{
            return(
              <MenuItem value={m.Germination_MethodId}>{m.Germination_Method}</MenuItem>
            )
          })}
    
       
        </Input>
    </>
    }
     
     {stage == "Harvest" && 
    <>
          <FormHeading>Weight</FormHeading>
          <InputGrp>
          <InputG 
        id="Wet_Weight" 
        label="Wet Weight" 
 type="number"
        variant="outlined" 
        onChange={handleChange}
       
        >
        </InputG>

        <InputG 
        id="Dry_Weight" 
        label="Dry Weight"  
        type="number"
        variant="outlined" 
        onChange={handleChange}
   
        >
        </InputG>
        </InputGrp>

        <FormHeading>Plants Harvested</FormHeading>
        <Input 
        id="Plants_Harvested" 
        label="Plants Harvested"  
        type="number"
        variant="outlined" 
        onChange={handleChange}
   
        >
        </Input>
{/* 
        <Rating
  name="simple-controlled"
  value="2"

/> */}
        <FormHeading>Smells Like</FormHeading>
        
          <Input 
        id="SmellsLike" 
        label="Smells Like" 
      
        value={smell}
        variant="outlined" 
        onChange={(e,child)=>{handleSmellChange(e,child)}}
        select>
          {smells.map((s)=>{
            return(
              <MenuItem value={s}>{s?.Smell_Profile_Name}</MenuItem>
            )
          })}
             </Input >

             <InputGrpSmells>
             {selectedSmells.map((s)=>{
            return(
              <SmellMain>
              <SmellRemove onClick={()=>{handleSmellRemove(s)}}>X</SmellRemove>
              <Smell back={s?.Smell_Profile_Color}>
           <div>{s?.Smell_Profile_Name}</div>
      
               </Smell>
            </SmellMain>
            )
          })}
              </InputGrpSmells>
       
    </>
    }
 
      
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