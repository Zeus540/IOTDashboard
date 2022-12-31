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

padding: 20px 0px;
margin: 0 auto;
  @media (max-width: 425px) {
    margin: 0px;
    padding: 0px;
    border-radius: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px;
    padding: 0px;
    border-radius: 0px;
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
max-width: calc(100% / 6 - 20px);
margin: 10px;
border-radius: 5px;
width: 100%;
text-decoration: none;
color: black;
@media (max-width: 619px) {
  max-width: calc(100% / 2 - 20px);
  width: 100%;
  margin: 10px 10px;
  border-radius: 0px;
}
  @media (min-width: 620px) and (max-width: 699px) {
    width: calc(100% / 2 - 20px);
    margin: 10px;
  }
  @media (min-width: 700px) and (max-width: 940px) {
    width: calc(100% / 2 - 20px);
  }
`;

const DiaryImageHolder = styled.div`
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;
  line-height: 0px;
  border-radius: 5px;
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
    padding: 20px;
    padding: 20px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding: 5px 25px;
    padding: 20px;
  }
`;

const Button = styled.button`
padding: 8px 20px;
  background: #275557;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin: 0px 20px;
  @media (max-width: 425px) {
    margin: 0px 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px 0px;
  }
`;

const DiaryText = styled.p`
font-size: 14px;
padding-bottom: 5px;
white-space: nowrap;
font-weight: bold;
margin: 0px;
`;

const UserAvatarHolder = styled.div`
display: flex;
align-items: center;
}
`

const UserAvatar = styled.div`
width: 5px;
height: 5px;
color: white;
    padding: 10px;
    font-size: 11px;
    background: #8bab50;
    margin-right: 10px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const Diaries = () => {
  const { diaries,Update,loading } = useContext(DiaryContext);
  const [diaryList, setDiaryList] = useState([]);
  const [popUpOffset, setPopUpOffset] = useState(-100);
  const navigate = useNavigate();
  const { auth,authToken,userId } = useContext(AuthContext);


  useEffect(() => {

    document.title = "Sweet Leaf - My Diaries" 
  }, [])

  useEffect(() => {
  
    Update()
  }, [])
  
  useEffect(() => {
    console.log("loading",loading)
    if(!loading){

      setDiaryList(diaries)
    }

  }, [diaries,userId])
  


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
          <MainHeading>My Diaries</MainHeading>
          {auth &&   
          <Button
            onClick={() => {
              handleAddPopUp();
            }}
          >
            Add New Diary
          </Button>}
        
        </Add>

        <DiaryHolder>
          {diaries?.sort((a,b)=> b.DiaryId - a.DiaryId)?.map((d) => {
            return (
              <Diary
          to={`/overview/${d.DiaryId}`}
              >
                
                <DiaryImageHolder >
                 
                  <DiaryImage
                    src={d?.ThumbNail == "" ? PlaceHolder : d?.ThumbNail}
                    width="100%"
                  />
                </DiaryImageHolder>

                <DiaryTextHolder>
      
                  <DiaryText>{d?.Title} </DiaryText>
                  <Tag> {d?.UserName}</Tag>
                    <Tag> {d?.Strain}</Tag>
                    <UserAvatarHolder>
                    {/* <UserAvatar>
                  {d?.UserName.charAt(0)}
                  </UserAvatar> */}
                  
                    
                    </UserAvatarHolder>
                 
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
