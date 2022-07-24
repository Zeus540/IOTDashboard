import React,{useState} from 'react'
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
left: 0;
z-index:50;
`;

const Notes = styled.div`


background: #d6d0bb;
width: 40%;
border-radius: 10px;
@media(max-width:425px){
    width: 90%;
  }
`;

const Button = styled.button`
padding: 10px 40px;
margin:10px 20px;
background: green;
border:none;
color:white;
border-radius: 50px;
`;

const TextArea = styled.textarea`
width: 100%;
height: 350px;
padding: 20px 20px;
box-sizing: border-box;
border: 2px solid #ccc;
border-radius: 4px;
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
padding: 10px 20px;
justify-content: space-between;
`;

const NotesHolder = (props) => {

  const [notes, setNotes] = useState(props.daysNotes)

    const handleSubmit = ()=>{
        
        props.diaryDatas.Notes = notes
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
    
  return (
  <NotesOutter>
    <Notes>
      <NotesHeadingHolder>
      Add Notes
      <NotesClose onClick={()=>{props.setAddNotes(false)}}>X</NotesClose>
      </NotesHeadingHolder>
        <TextArea value={notes} onChange={(e)=>{setNotes(e.target.value)}}>

        </TextArea>
        <Button onClick={()=>{handleSubmit()}}>Save</Button>
  </Notes>

  </NotesOutter>
  )
}

export default NotesHolder