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

const Input = styled(TextField)`
margin-bottom: 20px;
width: 100%;
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
background: #859ea34f;
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
background: #859ea34f;
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

const Button = styled.button`
  padding: 5px 25px;
  background: #8bab50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const AddDiary = (props) => {

  const {enqueueSnackbar} = useSnackbar()
  const { diaries, Update, loading } = useContext(DiaryContext);
  const [diaryTypes, setDiaryTypes] = useState([]);
  const [type, setType] = useState("");
  
  const [roomType, setRoomType] = useState("");
  const [errorType, setErrorType] = useState(false);
  
  const [popUpOffset, setPopUpOffset] = useState(-100);
  const navigate = useNavigate();
  const { auth, authToken, userId, user } = useContext(AuthContext);

  let token = localStorage.getItem("token")

useEffect(() => {

  
  axios.get(`${BASE_URL_PROD}/diaries/types`)
  .then((response) => {
    setDiaryTypes(response.data)
    console.log(response.data);
  })
  .catch((error) => {

    console.log(error);
  })
}, [])


  const addDiary = (values) => {


    values.Type = type

    

    axios.post(`${BASE_URL_PROD}/diaries/add`, values, )
      .then(function (response) {
        if (response.data.insertId !== undefined) {
          Update()
          enqueueSnackbar("Diary Successfully Added ",{variant:'success'})
          props.setPopUpOffset(-101);
        }else{
          enqueueSnackbar(response.status,{variant:'error'})
        }

      })
      .catch(function (error) {

        console.log(error);
      })

  }

  const handleType = (type) => {
    if(errorType == true){
      setErrorType(false)
    }
    setType(type)
  
  }




  const handleRoomTypeChange = (e, child) => {

    setRoomType(e.target.value)
    setErrorType(false)
  }

  return (

    <Formik
      initialValues={{  }}
      
      onSubmit={(values, { setSubmitting }) => {
     
        setTimeout(() => {
       if(type == ""){
        setErrorType(true)
       }else{
        addDiary(values)
        setSubmitting(false);
      
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
            <FormHeading>New Diary</FormHeading>
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
          </FormHeadingGroup>
          <InputHolder>
            <FormHeading>Type of Diary</FormHeading>
        {errorType &&   <Error>Select a Type</Error>}
            <InputHolderType>


              {diaryTypes?.map((t,index) => {
                return (
                  < >
                    {type == t.Diary_Types_Name ?
                      <TypeBlockActive key={index}>
                        <TypeBlockImg src={t.Diary_Types_Img} width="100%" />
                        <TypeBlockText>{t.Diary_Types_Name}</TypeBlockText>
                      </TypeBlockActive> :
                      <TypeBlock key={index} onClick={() => { handleType(t.Diary_Types_Name) }}>
                        <TypeBlockImg src={t.Diary_Types_Img} width="100%" />
                        <TypeBlockText>{t.Diary_Types_Name}</TypeBlockText>
                      </TypeBlock>
                    }
                  </>

                )
              })}


            </InputHolderType>
          
{type !== "" && 
<>

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
<Input
  id="potSize"
  label="Pot Size"
  type="potSize"
  variant="outlined"
  onChange={handleChange}
  onBlur={handleBlur}
/>
</div>

</>
}



<div>
<Input
  id="strain"
  label="Strain"
  type="strain"
  required
  variant="outlined"
  onChange={handleChange}
  onBlur={handleBlur}
/>
</div>


{roomType !== "Outdoor" &&
<>
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

</>
}


</>}

           




            <Button type="submit" >
              Submit
            </Button>
          </InputHolder>
        </Form>
      )}
    </Formik>
  )
}

export default AddDiary