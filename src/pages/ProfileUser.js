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
import axios from "../components/shared/axios";
import PopUp from "../components/PopUp";
import { NavLink } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import {BASE_URL_PROD} from '../components/shared/Constants'

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

padding: 0px 0px;
margin: 80px auto;
max-width: 1770px ;
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


const MainHeadingSmall = styled.div`
  margin: 0px 0px;
  font-size: 18px;
  margin-top: 0px;

  padding: 0px 10px;
  @media (max-width: 425px) {
    padding: unset;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding: unset;
  }
`;

const MainHeading = styled.div`
  margin: 0px 0px;
  font-size: 24px;
  margin-top: 0px;

  padding: 0px 20px;
  @media (max-width: 425px) {
    padding: unset;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding: unset;
  }
`;


const UserInfoTop = styled.div`
display: flex;
color: black;
padding: 20px;
@media (max-width: 425px) {
  flex-direction: column;
}
@media (min-width: 426px) and (max-width: 768px) {
  flex-direction: column;
}
`;

const BlockHolder = styled.div`
display: flex;
color: black;
padding: 10px 10px;
flex-wrap: wrap;
border-radius: 5px;
width: calc(100% / 3 - 40px);
background: whitesmoke;
margin: 10px 10px;
justify-content: center;
@media (max-width: 425px) {

  padding: 10px 0px;
  min-width: calc(100% / 2 - 10px);
  margin: 10px 0px;

}

@media (min-width: 426px) and (max-width: 768px) {
  padding: 10px 0px;
  min-width: calc(100% / 2 - 20px);
}


`;
const Block = styled.div`
display: flex;
color: black;
padding: 10px 20px;

border-radius: 5px;


`;

const BlockHolderFlex = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;

const BlockHeading = styled.div`
margin: 0px 0px;
font-size: 16px;
margin-top: 0px;

padding: 0px 0px;
@media (max-width: 425px) {
  padding: unset;
}
@media (min-width: 426px) and (max-width: 768px) {
  padding: unset;
}
`;

const BlockNum = styled.div`
margin: 0px 0px;
font-size: 16px;
margin-top: 0px;

padding-left: 10px ;

`;

const UserInfoTopRight = styled.div`
margin: 0px 0px;
font-size: 16px;
margin-top: 0px;
width: 80%;
@media (max-width: 425px) {
  width: 100%;
}

`;

const UserAvatar = styled.div`
width: 300px;
height: 300px;
min-width: 20%;
color: white;
background-size: cover!important;
    padding: 10px;
    background: #8bab50;
    margin-right: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 425px) {
      width: 150px;
      height: 150px;
      margin-right: 0px;
      margin-bottom: 10px;
    }
    @media (min-width: 426px) and (max-width: 768px) {
      width: 150px;
      height: 150px;
      margin-right: 0px;
      margin-bottom: 10px;
    }

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
  
 

    axios.get(`${BASE_URL_PROD}/users`)
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
                  <UserAvatar style={{backgroundImage:`url(${userList?.User_Img})`}}>
                  
                  </UserAvatar>

                <UserInfoTopRight>
                <MainHeadingSmall>{userList.UserName}</MainHeadingSmall>


               

                <BlockHolderFlex>
<BlockHolder>
               <Block>
               <BlockHeading>Diaries</BlockHeading>
                <BlockNum>{userList.Amount_of_Diaries}</BlockNum>
               </Block>
               </BlockHolder>

               <BlockHolder>
               <Block>
               <BlockHeading>Comments</BlockHeading>
                <BlockNum>{userList.Amount_of_Diaries}</BlockNum>
               </Block>
               </BlockHolder>

               <BlockHolder>
               <Block>
               <BlockHeading>Diaries</BlockHeading>
                <BlockNum>{userList.Amount_of_Diaries}</BlockNum>
               </Block>
               </BlockHolder>
               </BlockHolderFlex>
          </UserInfoTopRight>
                </UserInfoTop>
        
      </Inner>
    </Root>
    </>
  );
};

export default ProfileUser;
