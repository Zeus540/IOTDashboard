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

padding: 0px 0px;
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
padding: 10px 20px;

border-radius: 5px;
@media (max-width: 425px) {
  padding: 10px 0px;

}
`;
const Block = styled.div`
display: flex;
color: black;
padding: 10px 20px;
background: whitesmoke;
border-radius: 5px;

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
const UserAvatar = styled.div`
width: 300px;
height: 300px;
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
                  <UserAvatar style={{backgroundImage:`url(${userList?.User_Img})`}}>
                  
                  </UserAvatar>
                <div>
                <MainHeadingSmall>{userList.UserName}</MainHeadingSmall>


                <MainHeading>Stats</MainHeading>


<BlockHolder>
               <Block>
               <BlockHeading>Diaries</BlockHeading>
                <BlockNum>{userList.Amount_of_Diaries}</BlockNum>
               </Block>
               </BlockHolder>
          </div>
                </UserInfoTop>
        
      </Inner>
    </Root>
    </>
  );
};

export default ProfileUser;
