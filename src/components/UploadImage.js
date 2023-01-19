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
  background: #8bab50;
  color: black;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;



const ImgHolder = styled.div`
background-image: ${(props) => `url(${props.img })`};
height: ${(props) => props.img !== "" ? `200px` : `0px`};
background-size: cover;
margin-bottom: 20px;
background-position: center center;
`;

const UploadImage = (props) => {
  const {enqueueSnackbar} = useSnackbar()
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [imgName, setImgName] = useState('');
  const [imgBase64, setImgBase64] = useState("");
  const { auth,authToken,userId } = useContext(AuthContext);

    
let base64String = "";
  
function imageUploaded() {
    var file = document.querySelector(
        'input[type=file]')['files'][0];
  
    var reader = new FileReader();
  
      
    reader.onload = function () {
        base64String = reader.result
  
        setImgBase64(base64String)
     
    }
    reader.readAsDataURL(file);
    setImg(URL.createObjectURL(file));

    let name =  new Date().toLocaleDateString().replaceAll("/","-") + new Date().toLocaleTimeString().replaceAll("PM","").replaceAll("AM","") 
    // name.trim()+ "." + file.name.split(".")[file.name.split(".").length - 1]
    setImgName(file.name)
   
}
  


function displayString(e) {
  console.log(imgBase64)
  e.preventDefault()
 if(imgBase64 !== ""){
 
  setLoading(true)
  let values = {}

if(props.DayId !== ''){
  values = {
    image:imgBase64,
    DiaryId:props.DiaryId,
    WeekId:props.WeekId,
    DayId:props.DayId,
    name:imgName
    }
}else{
  values = {
    image:imgBase64,
    DiaryId:props.DiaryId,
    WeekId:props.WeekId,
    DayId:null,
    name:imgName
    }
}


  
  axios.post(`${BASE_URL_PROD}/upload/image`,values)
  .then(function (response) {
    if(response.status == 200 ){
      props.setPopUpOffset(-101)
      setImg("");
      setImgName("")
      setLoading(false)
      props.update()
      enqueueSnackbar("Image Successfully Uploaded",{variant:'success'})
    }else{
      enqueueSnackbar(response.status,{variant:'error'})
    }

   
  })
  .catch(function (error) {

    console.log(error);
  })


  
 }
}

  return (

      <Form  encType="multipart/form-data">
         
         <FormHeadingGroup>
      <FormHeading>Image Upload</FormHeading>
     
        </FormHeadingGroup>
        <InputHolder>
        <ImgHolder img={img}>
{/* <img src={img} width="100%"/> */}
  </ImgHolder>
         <Input type="file" name="" id="fileId" 
        onChange={()=>{imageUploaded()}}/>

  
  {!loading ?
    <Button onClick={(e)=>{displayString(e)}}>
        Upload
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

export default UploadImage