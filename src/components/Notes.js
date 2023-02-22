import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import axios from "../components/shared/axios";
import {BASE_URL_PROD} from '../components/shared/Constants'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar} from 'notistack';
const NotesOutter = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

position: fixed;
width: 100%;
top: 0;
height: 100vh;
min-height: 100vh;
left: 0;
z-index:50;

`;

const Notes = styled.div`


background: #ffffff;
width: 40%;
border-radius: 5px;
@media(max-width:425px){
    width: 90%;
  }
`;

const Button = styled.button`
padding: 8px 20px;
margin: 15px;
margin-top: 0px;
background: #8bab50;
border: none;
color: white;
border-radius: 5px;
cursor: pointer;
`;

const Input = styled.input`
padding: 8px 20px;
margin: 10px 20px;
background: #f2f2f2;
border: none;
color: #354f41;
border-radius: 5px;
cursor: pointer;
`;

const TextArea = styled.textarea`
width: 100%;
height: 350px;
padding: 20px 20px;
box-sizing: border-box;
border: none;

background-color: #f2f2f2;
font-size: 16px;
resize: none;
`;

const NotesClose = styled.div`
color:#f44336;
text-align: end;

  font-size: 22px;
  font-weight: bold;
  @media(max-width:425px){
    font-size: 16px;
  }
  @media(min-width:426px) and (max-width:768px){
    font-size: 16px;
  }
`;
const NotesHeadingHolder = styled.div`
display: flex;
align-items: center;
padding: 5px 15px;
border-radius: 5px 5px 0px 0px;
justify-content: space-between;
background: #ffffff;
    color: #354f41;
`;

const InputGrp = styled.div`
min-width: calc(100% /2 - 20px);
margin: 15px 15px;
align-items: center;
padding-top: 0px;
color:white;
display: flex;

`;
const Label = styled.label`
color:#354f41;
font-weight:bold;
`;

const ToggleHolderLabel = styled.label`
color:#354f41;

margin-left: 10px;
`;

const CheckFlex = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
@media (max-width: 425px) {
  margin: 5px 0px;
}

`;

const Heading = styled.h2`
text-align: center;
font-size: 20px;
margin: 0px;
`;

const ClosePopUpHolder = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 30px;
  color: #b62a2a;
  cursor: pointer;
`;

const ClosePopUpHolderText = styled.p`
  text-align: center;

  font-size: 30px;
  margin: 0 auto;
  cursor: pointer;

  left: 0;
  color: #a5a5a5;
  width: 100%;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.2);
    color: #b62a2a;
  }
`;
const NotesHolder = (props) => {
  const {enqueueSnackbar} = useSnackbar()
  const [notes, setNotes] = useState(props.daysNotes)
  const [keyNote, setKeyNote] = useState(false);

  useEffect(() => {
 if(props.keyNote == 1){
  setKeyNote(true)
 }else{
  setKeyNote(false)
 }

 setNotes(props.daysNotes)
  }, [props])
  
  
    const handleSubmit = ()=>{
        
        props.diaryDatas.Notes = notes
        if(keyNote === false){
          props.diaryDatas.KeyNote = 0
        }else{
          props.diaryDatas.KeyNote = 1
        }

        axios
        .post(`${BASE_URL_PROD}/notes`, props.diaryDatas)
        .then(function (response) {
          
       
            props.setDaysNotes({Notes:notes})
            props.setAddNotes(-101)
            
        })
        .catch(function (error) {
          enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
          console.log(error);
        });
    }
    
    const handleActiveToggle = (e)=>{

  
      setKeyNote(!keyNote)
    }

  return (
  <NotesOutter>
     <ClosePopUpHolder
      onClick={() => {
        props.setAddNotes(-101);
      }}
    >
      <ClosePopUpHolderText>
      
        <FontAwesomeIcon icon={faTimesCircle} />

      </ClosePopUpHolderText>
    </ClosePopUpHolder>
    <Notes>
      <NotesHeadingHolder>
        <Heading>
      Add Notes
      </Heading>
  
      </NotesHeadingHolder>
        <TextArea value={notes} onChange={(e)=>{setNotes(e.target.value)}}>

        </TextArea>
        <InputGrp>
        <label className="switch">
<input type="checkbox" checked={keyNote} onChange={(e)=>{handleActiveToggle()}}/>
<span className="slider round"></span>

</label> 
<ToggleHolderLabel>Key Note</ToggleHolderLabel>
      </InputGrp>

        <Button onClick={()=>{handleSubmit()}}>Save</Button>
  </Notes>

  </NotesOutter>
  )
}

export default NotesHolder