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
import { TailSpin } from  'react-loader-spinner'
import { useSnackbar} from 'notistack';
import {BASE_URL_PROD} from '../components/shared/Constants'
import MenuItem from '@mui/material/MenuItem';

const Input = styled(TextField)`

margin: 10px;
width: 100%;
margin-bottom: 0px;
`;

const InputG = styled(TextField)`
margin: 0px 10px;
width: 100%;
min-width: calc(100%  / 2 - 20px);
`;

const InputGTemp = styled(TextField)`
margin-right: 10px;
width: 100%;
max-width: calc(100%  / 3 - 20px);
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


`;


const Button = styled.button`
  padding: 8px 25px;
  background: #f0f8ff00;
  color: #8bab50;
  border: 1px  #8bab50 solid;
  border-radius: 5px;
  cursor: pointer;
  margin: 15px;
  margin-top: 0px;
`;



const ImgHolder = styled.div`
background-image: ${(props) => `url(${props.img })`};
height: ${(props) => props.img !== "" ? `200px` : `0px`};
background-size: cover;
margin-bottom: 20px;
background-position: center center;
border-radius: 5px;
margin: 0px 15px;
margin-top: 5px;
`;

const InputGroup = styled.div`
display:flex;
margin: 15px 5px;
`;

const InputGroupInner = styled.div`
display:flex;
min-width: 50%;
`;

const UploadConditons = (props) => {
  const {enqueueSnackbar} = useSnackbar()

  const [loading, setLoading] = useState(false);
  
  const [ph, setPh] = useState('');
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [co2, setCo2] = useState('');

  const [tempMeasurement, setTempMeasurement] = useState("");

  const { auth,authToken,userId } = useContext(AuthContext);


  useEffect(() => {

   
  }, [props.popUpOffset])
  


function SubmitData(e) {

  e.preventDefault()

  let values = {}

if(props.DayId !== ''){
  values = {
    DiaryId:props.DiaryId,
    WeekId:props.WeekId,
    DayId:props.DayId,

    ph:parseFloat(ph),
    temp:parseFloat(temp),
    tempMeasurement:tempMeasurement,
    humidity:parseFloat(humidity),
    co2:parseFloat(co2),
    }
}else{
  values = {
    DiaryId:props.DiaryId,
    WeekId:props.WeekId,
    DayId:null,
    tempMeasurement:tempMeasurement,
    ph:parseFloat(ph),
    temp:parseFloat(temp),
    humidity:parseFloat(humidity),
    co2:parseFloat(co2),
    }
}

  
   axios.post(`${BASE_URL_PROD}/weeks/conditions_add`,values)
   .then(function (response) {
     if(response.status == 200 ){
       props.setPopUpOffset(-101)
       setLoading(false)
       props.updateDays()
       props.update()
       enqueueSnackbar("Conditions Successfully Uploaded",{variant:'success'})
     }else{
       enqueueSnackbar(response.status,{variant:'error'})
     }

   
   })
   .catch(function (error) {
    enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
     console.log(error);
   })


  
 
}

const handleRoomTypeChange = (e, child) => {

  setTempMeasurement(e.target.value)
  
}

  return (

      <Form  encType="multipart/form-data">
         
         <FormHeadingGroup>
      <FormHeading>Upload Conditions</FormHeading>
     
        </FormHeadingGroup>
        <InputHolder>
      

<InputGroup>

<InputG type="number"  id="fileId"  label='Ph'
required
        onChange={(e)=>{setPh(e.target.value)}}/>

        <InputG type="number"  id="fileId" label='Co2' required
           onChange={(e)=>{setCo2(e.target.value)}}/>


</InputGroup>
  
<InputGroup>

<InputGroupInner>
<InputG type="number"  id="fileId"  label='Temperature' required
           onChange={(e)=>{setTemp(e.target.value)}}/>

<InputGTemp
  id="tempMeasurement"
  label="Measurement"
  value={tempMeasurement}
  variant="outlined"
  required
  onChange={(e, child) => { handleRoomTypeChange(e, child) }}
  select>
  <MenuItem value="&#8451;">Celsius</MenuItem>
  <MenuItem value="&#8457;">Fahrenheit</MenuItem>
</InputGTemp>
      
           </InputGroupInner>
        <InputG type="number"  id="fileId" label='Humidity' required
         onChange={(e)=>{setHumidity(e.target.value)}}/>


</InputGroup>

  {!loading ?
    <Button onClick={(e)=>{SubmitData(e)}}>
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

  )
}

export default UploadConditons