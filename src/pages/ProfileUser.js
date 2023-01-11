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
import { useLocation, useParams } from "react-router-dom";
const Root = styled.div`


  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;


const Inner = styled.div`

border-radius: 5px;
background: #ffffff;

padding: 20px 0px;
margin: 80px ;
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

const MainHeadingSmall = styled.div`
  margin: 0px 0px;
  font-size: 18px;
  margin-top: 0px;

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



const User = styled(NavLink)`
cursor: pointer;
width: calc(100% / 1 - 20px);
margin: 10px;
border-radius: 5px;
display: flex;
    justify-content: space-between;
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


const UserBtnHolder = styled.div`
display: flex;
align-items: center;
`;
const UserBtn = styled.button`
display: flex;
align-items: center;
background: unset;
border: unset;
`;

const Tag = styled.sup`

  padding: 0px 0px;
  font-size: 11px;
  display: block;


`;

const Svg = styled.svg`
  fill:  #8bab50;
  padding: 10px;
  width:20px;
 
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

const UserInfo = styled.div`
display: flex;
color: white;
padding: 0px 10px;
align-items: center;
`;

const UserInfoTop = styled.div`
display: flex;
color: black;
padding: 20px;

`;

const UserAvatar = styled.div`
width: 300px;
height: 300px;
color: white;
    padding: 10px;
    background: #8bab50;
    margin-right: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const ProfileUser = () => {

  const [userList, setUser] = useState([]);
  const [popUpOffset, setPopUpOffset] = useState(-101);
  const navigate = useNavigate();
  const { auth,authToken,userId } = useContext(AuthContext);
  const params = useParams();

  useEffect(() => {

    document.title = "Sweet Leaf - My Profile" 
  }, [])

  useEffect(() => {
  
    let config = {
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }

    axios.get('https://api.sweetleaf.co.za/users',config)
      .then(function (response) {

        console.log(response.data.filter((u) => u.UserId == params.userId))
        setUser(response.data.filter((u) => u.UserId == params.userId)[0])
   
      })
      .catch(function (error) {

        console.log(error);
      })

  
  }, [])
  

  


  const handleAddPopUp = (d) => {
    if (popUpOffset == -101) {
      setPopUpOffset(0);
    } else {
      setPopUpOffset(-101);
    }
  };


  



  
  return (

    <>


<PopUp popUpOffset={popUpOffset} setPopUpOffset={setPopUpOffset} type="addD"/>
    <Root>
    

      <Inner>
      

          <UserInfoTop>
                  <UserAvatar>
                  {userList?.UserName?.charAt(0)}
                  </UserAvatar>
                <div>
                <MainHeadingSmall>{userList.UserName}</MainHeadingSmall>
          {/* <MainHeading>{userList.Name} {userList.Surname}</MainHeading></div> */}
                </UserInfoTop>
        
        

        <DiaryHolder>
          
        </DiaryHolder>
      </Inner>
    </Root>
    </>
  );
};

export default ProfileUser;
