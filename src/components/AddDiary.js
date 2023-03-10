import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { DiaryContext } from "../context/diary_context";
import PlaceHolder from "../assets/placeholder.png";
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import axios from "../components/shared/axios";
import { useSnackbar} from 'notistack';
import {BASE_URL_PROD} from '../components/shared/Constants'
import { TailSpin } from  'react-loader-spinner'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Input = styled(TextField)`
margin-bottom: 10px;
width: 100%;
`;
const InputG = styled(TextField)`
margin-bottom: 10px;
width: calc(100% /2 - 8px);
`;

const InputTop = styled(TextField)`
margin-bottom: 10px;
width: 100%;
`;

const FormHeading = styled.h1`
margin: 0px;
font-size: 20px;
color: #354f41;

`;
const FormHeadingS = styled.h1`
margin: 0px;
margin-bottom: 10px;
font-size: 20px;
color: #354f41;
`;

const FormHeadingGroup = styled.div`
margin: 0px;
padding: 10px 15px;
padding-bottom: 0px;
`;

const RadioInput = styled(Radio)`
flex-direction: column;
display: flex;
width: 40%;

`;
const RadioGrouped = styled(RadioGroup)`
display: flex;
flex-direction: unset;
margin-bottom: 10px;
`;
const Label = styled(FormControlLabel)`
margin-left: unset;
margin-right: unset!important;
width: calc(100% / 2 - 10px);
`;
const FormSub = styled.p`
margin: 0px;

color: #354f41;
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
  width: 60%;
}
`;
const InputHolder = styled.div`
padding: 20px 15px;
padding-top: 0px;
`;
const InputHolderTop = styled.div`
padding: 10px 0px;
padding-bottom: 0px;
`;

const InputHolderType = styled.div`
display: flex;
flex-wrap: wrap;
margin-bottom: 10px;
justify-content: space-between;
`;
const Error = styled.p`
margin: 0px;
font-size: 12px;
color: red;
`;

const TypeBlock = styled.div`
padding: 10px;
margin-top: 10px;
margin-bottom: 10px;
border: 2px white solid;
background: #f8f8ff;
border-radius: 5px;
margin-left: 0px;
display: flex;
align-items: center;
flex-direction: column;
width: calc(100% /2 - 30px);
`;

const TypeBlockActive = styled.div`
padding: 10px;
margin-top: 10px;
margin-bottom: 10px;
border: 2px #8bab50 solid;
background: #f8f8ff;
border-radius: 5px;
margin-left: 0px;
display: flex;
align-items: center;
flex-direction: column;
width: calc(100% /2 - 30px);
`;

const TypeBlockImg = styled.img`
width: 55px;
`;
const TypeBlockText = styled.p`
margin: 0px;
`;
const LimitReached = styled.p`
margin: 0px;
    color: red!important;

    font-size: 18px;
    text-align: center;

`;
const LimitReachedUpgrade = styled.p`
margin: 0px;

padding-bottom: 20px;
font-size: 16px;
text-align: center;


`;
const Button = styled.button`
padding: 8px 25px;
background: #ffffff00;
color: #8bab50;
border-radius: 5px;
cursor: pointer;
border: 1px solid #8bab50;
`;

const AddStrainSvg = styled.svg`
width: 20px;
fill: #8bab50;
`;

const AddStrain = styled.div`
width: fit-content;
border-radius: 5px;
margin: 10px 10px;
min-width: 70px;
background: #f8f8ff00;
cursor: pointer;
opacity: 0.5;
display: flex;
height: 84px;
border: 1px solid #8bab50;
justify-content: center;
  &:hover {
    opacity: 1;
 
  }
`;

const StrainHolder = styled.div`
margin-bottom: 10px;
display: flex;
`;

const Strain = styled.div`

padding: 10px 20px;
background: #f8f8ff;
color: #354f41;
border-radius: 50px;
width: calc(100% / 4 - 20px);
margin: 0px 10px;
font-size: 14px;
display: flex;
align-items: center;
justify-content: center;
`;

const AddStrainBtn = styled.div`
padding: 8px 40px;
background: #ffffff00;
color: #8bab50;
border-radius: 5px;
cursor: pointer;
border: 1px solid #8bab50;
width: fit-content;
margin-bottom: 18px;

font-size: 13.33px;

`;


const InputGrp = styled.div`
display: flex;
justify-content: space-between;
`;


const ErrMsg = styled.p`
color: #f44336!important;
    margin: 0px;
    font-size: 16px;
    margin-bottom: 10px;
`;

const AddDiary = (props) => {

  const {enqueueSnackbar} = useSnackbar()
  const { diaries, Update } = useContext(DiaryContext);
  const [diaryTypes, setDiaryTypes] = useState([]);
  const [type, setType] = useState("");
  
  const [roomType, setRoomType] = useState("");
  const [potType, setPotType] = useState("");
  const [strainName, setStrainName] = useState("");
  
  const [strains, setStrains] = useState([]);
  const [errorType, setErrorType] = useState(false);

  
  const [popUpOffset, setPopUpOffset] = useState(-100);
  const navigate = useNavigate();
  const { auth, authToken, userId, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [limitedMsg, setLimitedMsg] = useState("")
  const [limitedMsgUpgrade, setLimitedMsgUpgrade] = useState("")
  const [strainErr, setStrainErr] = useState(false)
  

  useEffect(() => {
   console.log("strains",strains.length)
  }, [strains])
  


useEffect(() => {
  setType("")
  setRoomType("")
  setPotType("")
  setStrains([])
  setStrainErr(false)
  setStrainName("")
  setLimitedMsg("")
  setLimitedMsgUpgrade("")
  setErrorType(false)
  if(props.popUpOffset == 0){
    axios.get(`${BASE_URL_PROD}/diaries/types`)
    .then((response) => {
      setDiaryTypes(response.data)
 
    })
    .catch((error) => {

      enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
      console.log(error);
    })
  }
  

}, [props])


  const addDiary = (values) => {
 
    console.log(strains.length > 0)

    if(strains.length > 0){
      setLoading(true)
    const d = new Date()
   
    values.Date = d.toISOString().split("T")[0]
    values.roomType = roomType
    values.potType = potType
    values.strain = strains

    

     axios.post(`${BASE_URL_PROD}/diaries/add`, values, )
       .then(function (response) {
         if (response.data.insertId !== undefined) {
           Update()
           enqueueSnackbar("Diary Successfully Added ",{variant:'success'})
           props.setPopUpOffset(-101);
           setLoading(false)
         }else{
       
          if(response.data.msg){
            setLimitedMsg(response.data.msg)
            setLimitedMsgUpgrade(response.data.msgUpgrade)
            setLoading(false)
          }
          
         }

       })
       .catch(function (error) {
        setLoading(false)
        enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
         console.log(error.response.statusText);
       })

  }
}
  const handleType = (type) => {
    if(errorType == true){
      setErrorType(false)
    }
    setType(type)
  
  }

    
  const handleAddNameStrain = (strain) => {

    let strainObj = {
      name : strain
    }
    setStrainName(strainObj)

  
  }
  const handleAddStrain = () => {

    console.log('strainName',strainName)
    if(strains.length < 4 ){
      if(strainName !== ""){
        let strainObj = {
          name : ""
        }
    
        setStrainName(strainObj)
        setStrains([...strains,strainName])
         setStrainErr(false)
      }
    }
    
  
  }


  
  const handlePotTypeChange = (e, child) => {

    setPotType(e.target.value)
 
  }

  const handleRoomTypeChange = (e, child) => {

    setRoomType(e.target.value)
    setErrorType(false)
  }


  
  const handleMeasurementUpdate = (values,e) => {

    switch (e.target.value) {
      case "gallons":
   
        values.pot_Size_Measurment = e.target.value
        console.log("values",values)
        break;
    
        case "Litres":
   
        values.pot_Size_Measurment = e.target.value
        console.log("values",values)
        break;

        case "inch":
  
        values.pot_Size_Measurment = e.target.value
        console.log("values",values)
        break;
      default:
        break;
    }



  }

  return (

    <Formik
      initialValues={{ pot_Size_Measurment:'Litres' }}
  enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
     
        setTimeout(() => {
       if(strains.length < 1 ){
        setStrainErr(true)
       }else{
        addDiary(values)
        setSubmitting(false);
        setStrainErr(false)
       }

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
            <FormHeading>New Journal</FormHeading>

            {props.popUpOffset == 0 && 
            <InputHolderTop>
              <div>
                <InputTop
                  id="title"
                  label="Title"
                  type="title"
                  variant="outlined"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

              </div>

        
            </InputHolderTop>
            }
          </FormHeadingGroup>
          <InputHolder>
        

        
          



<div>


<Input
  id="roomType"
  label="Room Type"
  value={roomType}
  variant="outlined"
  required
  onChange={(e, child) => { handleRoomTypeChange(e, child) }}
  select>
  <MenuItem value="Indoor">Indoor</MenuItem>
  <MenuItem value="Green House">Green House</MenuItem>
  <MenuItem value="Outdoor">Outdoor</MenuItem>
  <MenuItem value="Hydroponics">Hydroponics</MenuItem>
</Input>

</div>

{roomType !== "Hydroponics" &&
<>
<div>

<InputGrp>
<InputG
  id="potType"
  label="Pot Type"
  value={potType}
  variant="outlined"
 
  onChange={(e, child) => { handlePotTypeChange(e, child) }}
  select>
  <MenuItem value="Air Pot">Air Pot</MenuItem>
  <MenuItem value="Fabric Pot">Fabric Pot</MenuItem>
  <MenuItem value="Plastic Pot">Plastic Pot</MenuItem>
</InputG>

<InputG
  id="potSize"
  label="Pot Size"
  type="number"
required={potType !== "" ? true : false}
  variant="outlined"
  onChange={handleChange}
  onBlur={handleBlur}
/>
</InputGrp>

{potType &&
<>


<RadioGrouped
                aria-labelledby="demo-radio-buttons-group-label"
                
                name="radio-buttons-group"
              
                onChange={(e, child) => {handleMeasurementUpdate(values,e)}}
              >
                <Label value="Litres" required control={<RadioInput required />} label="Litres" />
              <Label value="Inchs" required control={<RadioInput required />} label="Inchs" />
              <Label value="Gallons" required control={<RadioInput required />} label="Gallons" />
             </RadioGrouped >
</>
              }

{roomType !== "Outdoor" &&
<InputGrp>

    <InputG
      id="lightSchedule"
      label="Light Schedule"
      type="lightSchedule"
      variant="outlined"
      onChange={handleChange}
      onBlur={handleBlur}
    />



  <InputG
    id="lightWattage"
    label="Light Wattage"
    type="lightWattage"
    variant="outlined"
    onChange={handleChange}
    onBlur={handleBlur}
  />


</InputGrp>
}


</div>





<div>

<FormHeadingS>Add Up To 4 Strain</FormHeadingS>


<>
<Input
  id="strain"
  label="Strain"
  type="strain"
  value={strainName?.name}
  required={strains.length < 1 ? true : false}
  variant="outlined"
  onChange={(e)=>[handleAddNameStrain(e.target.value)]}
  onBlur={handleBlur}
/>

{strainErr && <ErrMsg>Add A Strain</ErrMsg>}
{strains.length > 0 && 
<StrainHolder>
{strains?.map((s)=>{
  return(
    <Strain>
   {s.name}
    </Strain>
  )
})} 
</StrainHolder>
}

<AddStrainBtn onClick={(e)=>[handleAddStrain(values)]}>Add</AddStrainBtn>

</>







</div>





</>}

           



  
{!loading ?

<>
{limitedMsg !== "" && 
<>
<LimitReached>
  {limitedMsg}
</LimitReached>
<LimitReachedUpgrade>
  {limitedMsgUpgrade}
</LimitReachedUpgrade>
</>
}
<Button type="submit" >
       Submit
     </Button>
</>
       
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

export default AddDiary