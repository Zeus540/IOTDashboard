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
import { useSnackbar } from 'notistack';
import { BASE_URL_PROD } from '../components/shared/Constants'

const Input = styled(TextField)`
margin-bottom: 20px;
width: 100%;
`;

const InputA = styled(TextField)`

width: 30%;
`;
const NutAmountHoler = styled.div`
justify-content: space-between;
align-items: center;
display: flex;
margin-bottom: 10px;
`;
const InputTop = styled(TextField)`
margin-bottom: 10px;
width: 100%;
`;

const FormHeading = styled.h1`
margin: 0px;
font-size: 20px;
color: #596876;

`;
const FormHeadingGroup = styled.div`
margin: 0px;
padding: 15px;
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
const Close = styled.p`
margin: 0px;
display: inline-block;
margin-right: 10px;
color: #fbfbfb;
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
  padding: 5px 25px;
  background: #8bab50;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;

`;


const UploadFeeding = (props) => {

  const { enqueueSnackbar } = useSnackbar()
  const { diaries, Update, loading } = useContext(DiaryContext);
  const [nutrientsTypes, setNutrientsTypes] = useState([]);
  const [nutrientsList, setNutrientsList] = useState([]);
  const [nutrientsListData, setNutrientsListData] = useState([]);
  const [type, setType] = useState("");

  const [roomType, setRoomType] = useState("");
  const [errorType, setErrorType] = useState(false);

  const [popUpOffset, setPopUpOffset] = useState(-100);
  const navigate = useNavigate();
  const { auth, authToken, userId, user } = useContext(AuthContext);

  let token = localStorage.getItem("token")

  useEffect(() => {

    if (props.popUpOffset == 0) {
      axios.get(`${BASE_URL_PROD}/nutrients`)
        .then((response) => {
          setNutrientsTypes(response.data)
          console.log("nutrients", response.data);
        })
        .catch((error) => {

          console.log(error);
        })
    }

    setNutrientsListData([])
  }, [props.popUpOffset])

  const addDiary = () => {


    console.log("sending",nutrientsListData)
     axios.post(`${BASE_URL_PROD}/nutrients/nutrient_feeding`, nutrientsListData,)
       .then(function (response) {
         if (response.status == 200 ) {
 
           enqueueSnackbar("Feeding Schedule Successfully Added ", { variant: 'success' })
           props.setPopUpOffset(-101);
         } else {
           enqueueSnackbar(response.status, { variant: 'error' })
         }

       })
       .catch(function (error) {

        console.log(error);
      })

  }

  const handleType = (type) => {
    if (errorType == true) {
      setErrorType(false)
    }
    setType(type)

  }




  const handleRoomTypeChange = (e, child) => {
    console.log("map",nutrientsListData.map((n) =>  n.Nutrient_Id )  )
    if(nutrientsListData.map((n) =>  n.Nutrient_Id ).includes(e.target.value.Nutrient_Id)){
      console.log("e", e.target.value)
      console.log("filter", nutrientsListData.filter((n) => n == n)[0] == e.target.value)
  

    }else{
      e.target.value.DiaryId = props.DiaryId
      e.target.value.WeekId = props.WeekId
      setNutrientsListData([...nutrientsListData, e.target.value])
    }
  
  }

  
  const handleAmountUpdate = (n, e) => {
 
    if(nutrientsListData.filter((nd) => nd.Nutrient_Id == n.Nutrient_Id)[0]){
      let found = nutrientsListData.filter((nd) => nd.Nutrient_Id == n.Nutrient_Id)[0]
      found.Nutrient_Amount = e.target.value
    }else{
      let found = nutrientsListData.filter((nd) => nd.Nutrient_Id == n.Nutrient_Id)[0]
      found.Nutrient_Amount = e.target.value
      
      setNutrientsListData([...nutrientsListData, found])
    }

  }
  
  const handleRemove = (n, e) => {
   

    let cleanedFilter = nutrientsListData.filter((nd) => nd.Nutrient_Id !== n.Nutrient_Id)
    setNutrientsListData(cleanedFilter)
  }

  
  useEffect(() => {
    console.log("nutrientsListData", nutrientsListData)
  }, [nutrientsListData])
  
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


                  <Input
                    id="NUTRIENTS"
                    label="Select Nutrients"
                    value={roomType}
                    variant="outlined"
           
                    onChange={(e, child) => { handleRoomTypeChange(e, child) }}
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
                    <div><Close  onClick={(e, child) => {handleRemove(n)}}>X</Close>{n?.Nutrient_Name} </div>
                  <InputA
               
                    label="Amount"
                
                    variant="outlined"
                    required
                 
                    onChange={(e, child) => {handleAmountUpdate(n,e)}}
                    >
                  

                  </InputA></NutAmountHoler>
                )
              })}



              <Button type="submit" >
                Submit
              </Button>
            </InputHolder>
          </Form>
        )}
      </Formik>

    </>
  )
}

export default UploadFeeding