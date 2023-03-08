import React from 'react'
import styled from "styled-components";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import AddDiary from './AddDiary';
import AddWeek from './AddWeek';
import EditWeek from './EditWeek';
import DeleteWeek from './DeleteWeek';
import DeleteDiary from './DeleteDiary';

import UploadFeeding from './UploadFeeding';
import DiarySettings from './DiarySettings';


import UploadImage from './UploadImage';
import UploadConditons from './UploadConditons';

const PopUpHolder = styled.div`
  background: #121b1cc4 ;
  top: 0;
  //background: rgb(5 11 36 / 75%);
  top: 0px;
  backdrop-filter: blur(5px);
  position: fixed;
  z-index: 999;
  min-height: 100vh;
  right: 0px;
  overflow: hidden;
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


const ClosePopUpHolderText = styled.div`
  text-align: center;

  font-size: 30px;
  margin: 0 auto;
  cursor: pointer;

  left: 0;
  color: #f44336;
  width: 100%;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
    color: #f44336;
  }
`;


const PopUp = (props) => {

    
  return (
    <PopUpHolder popUpOffset={props.popUpOffset}>
    

    <PopUpHolderInner>

    <ClosePopUpHolder
      onClick={() => {
        props.setPopUpOffset(-101);
      }}
    >
      <ClosePopUpHolderText>
      
        <FontAwesomeIcon icon={faTimesCircle} />

      </ClosePopUpHolderText>
    </ClosePopUpHolder>
      
      {props.type == "addD" && 
    <AddDiary setPopUpOffset={props.setPopUpOffset} popUpOffset={props.popUpOffset}/>
}
{props.type == "uploadImage" && 
    <UploadImage popUpOffset={props.popUpOffset} setPopUpOffset={props.setPopUpOffset} DiaryId={props.DiaryId} DayId={props.DayId}  WeekId={props.WeekId} update={props.update} updateDays={props.updateDays}/>
}
{props.type == "uploadConditons" && 
    <UploadConditons popUpOffset={props.popUpOffset} setPopUpOffset={props.setPopUpOffset} DiaryId={props.DiaryId} DayId={props.DayId}  WeekId={props.WeekId} update={props.update} updateDays={props.updateDays}/>
}


{props.type == "addWeek" && 
    <AddWeek setPopUpOffset={props.setPopUpOffset} DiaryId={props.DiaryId}  />
}

{props.type == "editWeek" && 
    <EditWeek popUpOffset={props.popUpOffset} setPopUpOffset={props.setPopUpOffset} DiaryId={props.DiaryId} week={props.week} updateTech={props.updateTech} UpdateWeeks={props.UpdateWeeks}/>
}

{props.type == "deleteWeek" && 
    <DeleteWeek setPopUpOffset={props.setPopUpOffset} DiaryId={props.DiaryId} week={props.week} setDays={props.setDays} setGalleryData={props.setGalleryData}/>
}

{props.type == "deleteDiary" && 
    <DeleteDiary setPopUpOffset={props.setPopUpOffset} Diary={props.Diary} week={props.week} />
}

{props.type == "uploadFeeding" && 
    <UploadFeeding popUpOffset={props.popUpOffset} setPopUpOffset={props.setPopUpOffset} DiaryId={props.DiaryId} DayId={props.DayId}  WeekId={props.WeekId} update={props.update}/>
}

{props.type == "diarySettings" && 
    <DiarySettings popUpOffset={props.popUpOffset} setPopUpOffset={props.setPopUpOffset} Diary={props.Diary}/>
}



    </PopUpHolderInner>
  </PopUpHolder>
  )
}

export default PopUp