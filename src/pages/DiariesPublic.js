import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import { DiaryContext } from "../context/diary_context";
import PlaceHolder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import  faTrash  from "../assets/trash-can-regular.svg";
import { AuthContext } from "../context/auth_context";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import axios from "axios";
import PopUp from "../components/PopUp";
import { NavLink } from "react-router-dom";

const Root = styled.div`

  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;


const Inner = styled.div`
max-width: 1770px;
border-radius: 5px;
background: #ffffff;
width: 100%;
padding: 20px 0px;
margin: 80px auto;
@media (max-width: 425px) {
  margin: 20px;
  padding: 0px;
  border-radius: 5px;
  width: 90%;
}
@media (min-width: 426px) and (max-width: 768px) {
  margin: 20px;
  padding: 0px;
  border-radius: 5px;
  width: 95%;
}
`;

const MainHeading = styled.div`
  margin: 0px 0px;
  font-size: 24px;
  margin-top: 0px;
  font-weight: bolder;
  padding: 0px 20px;
  @media (max-width: 425px) {
    padding: unset;
    
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding: unset;
  }
`;

const DiaryHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding:10px;
  @media (max-width: 619px) {
    padding:0px 10px;
  }
`;

const Diary = styled(NavLink)`
cursor: pointer;
width: calc(100% / 6 - 20px);
margin: 10px;
border-radius: 5px;

text-decoration: none;
color: black;
@media (max-width: 425px) {
  max-width: calc(100% / 1 - 20px);
  width: 100%;
  margin: 10px 10px;
  border-radius: 0px;
}
@media (min-width: 426px) and (max-width: 699px) {
  width: calc(100% / 2 - 20px);
  margin: 10px;
}
  @media (min-width: 700px) and (max-width: 940px) {
    width: calc(100% / 2 - 20px);
  }
  @media (min-width: 941px) and (max-width: 1330px) {
    width: calc(100% / 4 - 20px);
  }
`;

const DiaryImageHolder = styled.div`
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;
  line-height: 0px;
  border-radius: 5px;
  min-height: 190px;
  background-position: center!important;
  background-size: cover!important;
  @media (max-width: 425px) {

    border-radius: 5px;
  }
`;

const DiaryImage = styled.img`
border-radius: 5px;
  @media (max-width: 425px) {

    border-radius: 5px;
  }
`;
const DiaryTextHolder = styled.div`
padding: 5px 0px;
overflow: auto;
`;

const Tag = styled.sup`

  padding: 0px 0px;
  font-size: 11px;
  display: block;


`;

const TagHolder = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Add = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  @media (max-width: 425px) {
    padding:20px;
   
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding: 20px;
  
  }
`;

const Button = styled.button`
padding: 8px 20px;
  background: #596876;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;


const DiaryText = styled.p`
font-size: 14px;
padding-bottom: 5px;
white-space: nowrap;
font-weight: bold;
margin: 0px;
`;





const Diaries = () => {
  const { diariesPublic,UpdatePublic,loading } = useContext(DiaryContext);
  const [diaryHavestList, setDiaryHavestList] = useState([]);
  const [diaryOnGoingList, setDiaryOnGoingList] = useState([]);
  const [popUpOffset, setPopUpOffset] = useState(-101);
  const navigate = useNavigate();
  const { auth,authToken,userId } = useContext(AuthContext);



  useEffect(() => {
    setDiaryHavestList(diariesPublic.filter((d)=> d.HavestId !== null))
    setDiaryOnGoingList(diariesPublic.filter((d)=> d.HavestId == null))
    console.log(diariesPublic)
    console.log(diariesPublic)
  }, [diariesPublic])
  
  useEffect(() => {

    document.title = "Sweet Leaf - Public Diaries" 
  }, [])

  useEffect(() => {
  
    UpdatePublic()
  }, [])
  

  

  const handleAddPopUp = (d) => {
    if (popUpOffset == -100) {
      setPopUpOffset(0);
    } else {
      setPopUpOffset(-100);
    }
  };


  



  
  return (

    <>


<PopUp popUpOffset={popUpOffset} setPopUpOffset={setPopUpOffset} type="addD"/>
    <Root>
    

      <Inner>
        <Add>
          <MainHeading>On-Going Diaries</MainHeading>
        
       
        </Add>

        <DiaryHolder>
          {diaryOnGoingList?.sort((a,b)=> b.DiaryId - a.DiaryId)?.map((d) => {
            return (
              <Diary
              to={`/overview/${d.DiaryId}`}
              >
                <DiaryImageHolder style={{background:`url(${d?.ThumbNail == "" ? PlaceHolder : d?.ThumbNail})`}}>
                 
              
                </DiaryImageHolder>

                <DiaryTextHolder>
      
                  <DiaryText>{d?.Title} </DiaryText>
                  <Tag> {d?.UserName}</Tag>
                    <Tag> {d?.Strain}</Tag>

                 
                 
                  {/* <Tag> {d?.Start_Date?.split("T")[0]}</Tag> */}
            
                </DiaryTextHolder>
              
              </Diary>
            );
          })}
        </DiaryHolder>

        <Add>
        <MainHeading>Havested</MainHeading>
        </Add>

        <DiaryHolder>
          {diaryHavestList?.sort((a,b)=> b.DiaryId - a.DiaryId)?.map((d) => {
            return (
              <Diary
              to={`/overview/${d.DiaryId}`}
              >
                  <DiaryImageHolder style={{background:`url(${d?.ThumbNail == "" ? PlaceHolder : d?.ThumbNail})`}}>
                 
              
                 </DiaryImageHolder>

                <DiaryTextHolder>
      
                  <DiaryText>{d?.Title} </DiaryText>
                  <Tag> {d?.UserName}</Tag>
                    <Tag> {d?.Strain}</Tag>

                 
                 
                  {/* <Tag> {d?.Start_Date?.split("T")[0]}</Tag> */}
            
                </DiaryTextHolder>
              
              </Diary>
            );
          })}
        </DiaryHolder>

      </Inner>
    </Root>
    </>
  );
};

export default Diaries;
