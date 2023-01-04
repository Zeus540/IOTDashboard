import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import axios from "axios";


const NotesOutter = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
background: #000000a1;
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
padding: 5px 25px;
margin: 10px 20px;
background: #8bab50;
border: none;
color: black;
border-radius: 50px;
cursor: pointer;
`;

const Input = styled.input`
padding: 5px 25px;
margin: 10px 20px;
background: #f2f2f2;
border: none;
color: #596876;
border-radius: 50px;
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
color:red;
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
padding: 5px 25px;
border-radius: 5px 5px 0px 0px;
justify-content: space-between;
background: #ffffff;
    color: black;
`;

const InputGrp = styled.div`
min-width: calc(100% /2 - 20px);
margin: 10px 20px;
align-items: center;
padding-top: 0px;
color:white;
display: flex;

`;
const Label = styled.label`
color:#596876;
font-weight:bold;
`;

const ToggleHolderLabel = styled.label`
color:black;

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
const NotesHolder = (props) => {

  const [notes, setNotes] = useState(props.daysNotes)
  const [keyNote, setKeyNote] = useState(false);

  useEffect(() => {
 if(props.keyNote == 1){
  setKeyNote(true)
 }else{
  setKeyNote(false)
 }
  }, [])
  
  
    const handleSubmit = ()=>{
        
        props.diaryDatas.Notes = notes
        if(keyNote === false){
          props.diaryDatas.KeyNote = 0
        }else{
          props.diaryDatas.KeyNote = 1
        }

        axios
        .post("https://api.sweetleaf.co.za/notes", props.diaryDatas)
        .then(function (response) {
          
       
            props.setDaysNotes(notes)
            props.setAddNotes(false)
            
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
    const handleActiveToggle = (e)=>{
      console.log(keyNote );
  
      setKeyNote(!keyNote)
    }

  return (
  <NotesOutter>
    <Notes>
      <NotesHeadingHolder>
      Add Notes
      <NotesClose onClick={()=>{props.setAddNotes(false)}}>X</NotesClose>
      </NotesHeadingHolder>
        <TextArea value={notes} onChange={(e)=>{setNotes(e.target.value)}}>

        </TextArea>
        <InputGrp>
        <label class="switch">
<input type="checkbox" checked={keyNote} onChange={(e)=>{handleActiveToggle()}}/>
<span class="slider round"></span>

</label> 
<ToggleHolderLabel>Key Note</ToggleHolderLabel>
      </InputGrp>

        <Button onClick={()=>{handleSubmit()}}>Save</Button>
  </Notes>

  </NotesOutter>
  )
}

export default NotesHolder