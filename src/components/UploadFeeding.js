import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { DiaryContext } from "../context/diary_context";
import PlaceHolder from "../assets/placeholder.png";
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import axios from "../components/shared/axios";
import { useSnackbar } from 'notistack';
import { BASE_URL_PROD } from '../components/shared/Constants'
import { TailSpin } from  'react-loader-spinner'

const Input = styled(TextField)`
margin-bottom: 20px;
width: 100%;
`;
const Label = styled(FormControlLabel)`
margin-left: unset;
margin-right: unset!important;
width: calc(100% / 2 - 10px);
`;
const InputA = styled(TextField)`


`;
const RadioGrouped = styled(RadioGroup)`
display: flex;
flex-direction: unset;

`;

const NutAmountHoler = styled.div`
justify-content: space-between;
align-items: center;
display: flex;
margin-bottom: 10px;
`;
const NutName = styled.div`
width: 90%;
`;

const MainNutHolder = styled.div`
flex-direction: column;
display: flex;

`;

const RadioInput = styled(Radio)`
flex-direction: column;
display: flex;
width: 40%;

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
const FormHeadingGroup = styled.div`
margin: 0px;
padding: 15px;
padding-bottom: 0px;
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
`;
const Error = styled.p`
margin: 0px;
font-size: 12px;
color: red;
`;

const TypeBlock = styled.div`
padding: 10px;
margin: 10px;
border: 2px white solid;
background: #f8f8ff;
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
background: #f8f8ff;
border-radius: 5px;
margin-left: 0px;
display: flex;
align-items: center;
flex-direction: column;
`;

const TypeBlockImg = styled.img`
width: 55px;
`;
const Close = styled.p`
margin: 0px;
display: inline-block;
margin-right: 10px;
color: white!important;
background: red;
width: 25px;
height: 25px;
font-weight: 900;
display: inline-flex;
justify-content: center;
align-items: center;
border-radius: 50%;
cursor:pointer;
`;

const Button = styled.button`
padding: 8px 25px;
background: #ffffff00;
color: #8bab50;
border-radius: 5px;
cursor: pointer;
border: 1px solid #8bab50;
`;

const ErrMsg = styled.div`
padding: 8px 0px;
color:#f44336;
padding-top: 0px;
cursor: pointer;

`;

const UploadFeeding = (props) => {

  const { enqueueSnackbar } = useSnackbar()
  const { diaries, Update } = useContext(DiaryContext);
  const [nutrientsTypes, setNutrientsTypes] = useState([]);
  const [nutrientsList, setNutrientsList] = useState([]);
  const [nutrientsListData, setNutrientsListData] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  
  const [popUpOffset, setPopUpOffset] = useState(-100);
  const navigate = useNavigate();
  const { auth, authToken, userId, user } = useContext(AuthContext);

  let token = localStorage.getItem("token")

  useEffect(() => {
    setError(false)
    if (props.popUpOffset == 0) {
      axios.get(`${BASE_URL_PROD}/nutrients`)
        .then((response) => {
          setNutrientsTypes(response.data.sort())
          console.log("nutrients", response.data);
        })
        .catch((error) => {
          enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
          console.log(error);
        })
    }

    setNutrientsListData([])
  }, [props.popUpOffset])

  const addDiary = () => {

    if(nutrientsListData.length > 0 ){
      setError(false)
  
    setLoading(true)

    console.log("sending",nutrientsListData)
     axios.post(`${BASE_URL_PROD}/nutrients/nutrient_feeding`, nutrientsListData,)
       .then(function (response) {
         if (response.status == 200 ) {
          setLoading(false)
           enqueueSnackbar("Feeding Schedule Successfully Added ", { variant: 'success' })
           props.setPopUpOffset(-101);
         } else {
           enqueueSnackbar(response.status, { variant: 'error' })
         }

       })
       .catch(function (error) {
        setLoading(false)
        enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
        console.log(error);
      })
    }else{
      setError(true)
    }
  }






  const handleAdd = (e, child) => {
    setError(false)

    if(nutrientsListData.map((n) =>  n.Nutrient_Id ).includes(e.target.value.Nutrient_Id)){

  

    }else{
      e.target.value.Nutrient_Measurement = 'ml'
      e.target.value.DiaryId = props.DiaryId
      e.target.value.WeekId = props.WeekId
      setNutrientsListData([...nutrientsListData, e.target.value])
    }
  
  }

  
  const handleAmountUpdate = (n, e) => {
 
    if(nutrientsListData.filter((nd) => nd.Nutrient_Id == n.Nutrient_Id)[0]){
      let found = nutrientsListData.filter((nd) => nd.Nutrient_Id == n.Nutrient_Id)[0]

      if(found.Nutrient_Measurement == undefined){
        console.log("err")
        setErrorMsg(true)
      }else{
        found.Nutrient_Amount = e.target.value
      }
  
 
  
    }else{
      let found = nutrientsListData.filter((nd) => nd.Nutrient_Id == n.Nutrient_Id)[0]
      if(found.Nutrient_Measurement == undefined){
        console.log("err")
        setErrorMsg(true)
      }else{
        found.Nutrient_Amount = e.target.value
      }
 
      console.log(found)
      setNutrientsListData([...nutrientsListData, found])
    }

  }
  
  const handleMeasurementUpdate = (n, e) => {
 
    if(nutrientsListData.filter((nd) => nd.Nutrient_Id == n.Nutrient_Id)[0]){
      let found = nutrientsListData.filter((nd) => nd.Nutrient_Id == n.Nutrient_Id)[0]
      found.Nutrient_Measurement = e.target.value
    }

  }
  const handleRemove = (n, e) => {
   

    let cleanedFilter = nutrientsListData.filter((nd) => nd.Nutrient_Id !== n.Nutrient_Id)
    setNutrientsListData(cleanedFilter)
  }

  

  
  return (
    <>
      <Formik
        initialValues={{}}

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
              <FormHeading>Nutrient Schedule</FormHeading>
              <InputHolderTop>
                <div>
                {error && <ErrMsg>Select Nutrients</ErrMsg>}

                  <Input
                    id="NUTRIENTS"
                    label="Select Nutrients"
                    value={roomType}
                    variant="outlined"
           
                    onChange={(e, child) => { handleAdd(e, child) }}
                    select>
                    {nutrientsTypes?.map((n) => {
                      return (
                        <MenuItem value={n}>{n?.Nutrient_Name}</MenuItem>
                      )
                    })}


                  </Input>
           
                </div>


              </InputHolderTop>
            </FormHeadingGroup>
            <InputHolder>



              {nutrientsListData.length > 0 && nutrientsListData?.map((n) => {
                return (
                  <NutAmountHoler > 
                    <NutName><Close  onClick={(e, child) => {handleRemove(n)}}>X</Close>{n?.Nutrient_Name} </NutName>
                <MainNutHolder>
                <InputA
               
               label="Amount"
           
               variant="outlined"
               required
            
               onChange={(e, child) => {handleAmountUpdate(n,e)}}
               >
        

             </InputA>
             <RadioGrouped
                aria-labelledby="demo-radio-buttons-group-label"
                required
                name="radio-buttons-group"
                defaultValue="ml"
                onChange={(e, child) => {handleMeasurementUpdate(n,e)}}
              >
              <Label value="ml" required control={<RadioInput />} label="ml" />
              <Label value="grams" required control={<RadioInput />} label="grams" />
                
             </RadioGrouped >
             </MainNutHolder>
                  </NutAmountHoler>
                )
              })}


{!loading ?
     <Button type="submit" >
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

    </>
  )
}

export default UploadFeeding