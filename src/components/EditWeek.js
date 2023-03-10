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
import Mainline from '../assets/mainline.svg'
import LST from '../assets/lst.svg'

import Topping from '../assets/topping.svg'
import Defoliation from '../assets/defoil.svg'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {BASE_URL_PROD} from '../components/shared/Constants'
import { useSnackbar} from 'notistack';
import { TailSpin } from  'react-loader-spinner'
const Input = styled(TextField)`
margin-bottom: 10px;
width: 100%;
`;




const GrowTechniques = styled.div`
padding: 5px 20px;
display: flex;
flex-wrap: wrap;
`;
const FormHeadingSmall = styled.h1`
margin: 0px;
font-size: 18px;
color: #354f41;
padding: 0px 20px;
padding-top: 20px;


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

`;
const Root = styled.div`
overflow: auto;
max-height: 80vh;

background: white;
border-radius: 5px;
width:20%;
overflow:auto;

@media (max-width: 768px) {
  width: 90%;
}
@media (min-width: 769px) and (max-width: 1333px) {
  width: 50%;
}
`;

const InputHolder = styled.div`
padding: 20px 15px;
padding-top: 0px;
`;
const GrowTechniquesBlock = styled.button`
border:none;
padding: 5px 20px;
margin-bottom: 20px;
margin-right: 20px;
display: flex;
background: #f8f8ff;
border-radius: 5px;
align-items: center;
`;
const GrowTechniquesBlockIcon = styled.div`
width: 40px;
margin-right:10px;
display: flex;
`;

const Button = styled.button`
padding: 8px 25px;
background: #ffffff00;
color: #8bab50;
border-radius: 5px;
cursor: pointer;
border: 1px solid #8bab50;
`;
const EditWeek = (props) => {
  const {enqueueSnackbar} = useSnackbar()
    const { diaries,Update } = useContext(DiaryContext);
  const [technique_Name, setTechnique_Name] = useState("Topping")
    const navigate = useNavigate();
    const { auth,authToken,userId } = useContext(AuthContext);
    const [stage, setStage] = useState("")
    const [week, setWeek] = useState("")
    const [techniques, setTechniques] = useState([])
    const [loading, setLoading] = useState(false);
    



    const editWeek = (values)=>{
   
      setLoading(true)
      var dateobj = new Date();
 

      var B = dateobj.toISOString();

         values.WeekId = props.week.WeekId
         values.Week = parseInt(week)
         values.weekType = stage
         
           console.log("values",values);
   
       
        
        axios.post(`${BASE_URL_PROD}/weeks/edit_week`,values)
        .then(function (response) {
          if(response.data.insertId !== undefined){
            console.log("response.data",response.data);
            enqueueSnackbar("Week Successfully Edited",{variant:'success'})
            Update()
    
            props.setPopUpOffset(-101);
            setLoading(false)
          }else{
            setLoading(false)
            enqueueSnackbar(response.status,{variant:'error'})
          }
  

        })
        .catch(function (error) {
                  setLoading(false)
          enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
          console.log(error);
        })
     
  }
      


  
const addTech = (t)=>{


     let data = {
           WeekId:props.week.WeekId,
           Technique_Name:t.Grow_Techniques_Option_Name,
         }

          axios.post(`${BASE_URL_PROD}/techniques/add`,data)
           .then(function (response) {
             if(response.data.insertId !== undefined){
              Update()
              props.updateTech()
              enqueueSnackbar("Grow Technique Successfully Added",{variant:'success'})
      
              props.setPopUpOffset(-101);
             }else{
              enqueueSnackbar(response.status,{variant:'error'})
            }
           
        
           })
           .catch(function (error) {
            enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
             console.log(error);
           })
    
}


    useEffect(() => {

      if(props.popUpOffset == 0){
      axios.get(`${BASE_URL_PROD}/techniques`)
      .then(function (response) {
        setTechniques(response.data)
        
      })
      .catch(function (error) {
        enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
        console.log(error);
      })
    }
    }, [props.popUpOffset])
    
  
    let data = { 
      weekType: props.week.Stage
    }
    
    useEffect(() => {
    
    
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
   

  <Root>
         

         <FormHeadingGroup>
      <FormHeading>Edit Week</FormHeading>

        </FormHeadingGroup>
      
        <FormHeadingSmall>Grow Techniques</FormHeadingSmall>
      <GrowTechniques>      
      
        {techniques?.map((t)=>{
          return(
            <GrowTechniquesBlock onClick={()=>{addTech(t)}}>
              <GrowTechniquesBlockIcon>
              {t.Grow_Techniques_Option_Name == "Topping" && 
              <img src={Topping}/>
              }
                  {t.Grow_Techniques_Option_Name == "Main-Lining" && 
              <img src={Mainline}/>
              }
                  {t.Grow_Techniques_Option_Name == "LST" && 
              <img src={LST}/>
              }
                {t.Grow_Techniques_Option_Name == "HST" && 
              <img src={Topping}/>
              }
                {t.Grow_Techniques_Option_Name == "Defoliation" && 
              <img src={Defoliation}/>
              }
                {t.Grow_Techniques_Option_Name == "Feeding" && 
              <img src={Topping}/>
              }
              </GrowTechniquesBlockIcon>
              <div>
              {t.Grow_Techniques_Option_Name}
              </div>
            </GrowTechniquesBlock>
          )
        })}
      </GrowTechniques>

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
  </Root>
  )
}

export default EditWeek