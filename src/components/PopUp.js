import React from 'react'
import styled from "styled-components";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import AddDiary from './AddDiary';
import UploadImage from './UploadImage';

const PopUpHolder = styled.div`
  background: #121b1cc4 ;
  top: 0;
  position: fixed;
  z-index: 999;
  min-height: 100vh;
  right: 0px;
  height: calc(100vh - 74px);
  left: 0px;
  transform: translateY(${(props) => props.popUpOffset}%);
  transition: all 0.2s ease;
`;
const PopUpHolderInner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;

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


const PopUp = (props) => {

    
  return (
    <PopUpHolder popUpOffset={props.popUpOffset}>
    

    <PopUpHolderInner>

    <ClosePopUpHolder
      onClick={() => {
        props.setPopUpOffset(-100);
      }}
    >
      <ClosePopUpHolderText>
      
        <FontAwesomeIcon icon={faTimesCircle} />

      </ClosePopUpHolderText>
    </ClosePopUpHolder>
      
      {props.type == "addD" && 
    <AddDiary setPopUpOffset={props.setPopUpOffset}/>
}
{props.type == "uploadImage" && 
    <UploadImage setPopUpOffset={props.setPopUpOffset}/>
}

    </PopUpHolderInner>
  </PopUpHolder>
  )
}

export default PopUp