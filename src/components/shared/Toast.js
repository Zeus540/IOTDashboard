import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import { AuthContext } from '../../context/auth_context';
import PlaceHolder from "../../assets/back3d.jpg";

const ToastHolder = styled.div`


`;

const ToastInner = styled.div`
display: flex;
position: fixed;
z-index: 5;
bottom: 0;
margin: 40px 20px;
right: ${(props) => props.toastPostion};
border-radius: 5px;
justify-content: end;
transition: 0.5s all ease;

`;

const ToastInnerImg = styled.div`
width: 150px;
background:url(${PlaceHolder});
height: 120px;
background-size: cover;
background-position: center;
border-radius: 5px 0px 0px 5px;

`;
const ToastInnerText = styled.div`
padding: 10px 20px;
width: 70%;
background: white;
box-shadow: 0px 0px 8px 2px #00000026;
border-radius: 0px 5px 5px 0px;
`;

const Toast = () => {

    const{newDiary,newDiaryData} = useContext(AuthContext)
const [toastPostion, setToastPostion] = useState("-100%")

 useEffect(() => {

     if(newDiary){
         setToastPostion("0%")
     }else{
         setToastPostion("-100%")
     }

     console.log("newDiaryData",newDiaryData)
 }, [newDiary])

  return (
   
  
         <ToastHolder >
          <ToastInner toastPostion={toastPostion}>
            <ToastInnerImg>

            </ToastInnerImg>
            <ToastInnerText>New {newDiaryData.Type} Journal has been added <br/>
           {newDiaryData.Title} <br/> <br/>by {newDiaryData.UserName}</ToastInnerText>
         
          
         </ToastInner>
         </ToastHolder>
       

    
  )
}

export default Toast