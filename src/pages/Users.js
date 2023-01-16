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

const DiaryHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding:10px;
  @media (max-width: 619px) {
    padding:0px 0px;
  }
`;



const User = styled.div`
padding: 5px 10px;
width: calc(100% / 1 - 20px);
margin: 10px;
border-radius: 5px;
display: flex;
    justify-content: space-between;
text-decoration: none;
align-items: center;
color: black;

&:hover {
  background: ghostwhite;
}
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
display: flex;
align-items: center;
`;


const UserBtnHolder = styled.div`
display: flex;
align-items: center;
`;
const UserBtnLink = styled(NavLink)`
display: flex;
align-items: center;
background: unset;
border: unset;
cursor: pointer;
`;

const UserBtn = styled.button`
display: flex;
align-items: center;
background: unset;
border: unset;
cursor: pointer;
`;
const Tag = styled.sup`

  padding: 0px 0px;
  font-size: 18px;
  display: block;


`;

const Online = styled.div`
margin-left: 10px;
background: #8bab50;
width: 10px;
height: 10px;
border-radius: 50%;
`;

const Offline = styled.div`
margin-left: 10px;
background: #d32f2f;
width: 10px;
height: 10px;
border-radius: 50%;
`;

const Svg = styled.svg`
  fill:  #8bab50;
  padding: 10px;
  padding-right: 0px;
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



const Users = () => {

  const [userList, setUserList] = useState([]);
  const [popUpOffset, setPopUpOffset] = useState(-101);
  const navigate = useNavigate();
  const { auth,authToken,userId } = useContext(AuthContext);


  useEffect(() => {

    document.title = "Sweet Leaf - Users" 
  }, [])

  useEffect(() => {
  
    let config = {
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }

    axios.get('https://api.sweetleaf.co.za/users',config)
      .then(function (response) {
        setUserList(response.data)
        console.log("response", response.data);
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
        <Add>
          <MainHeading>Users</MainHeading>
       
        
        </Add>

        <DiaryHolder>
          {userList?.map((d) => {
            return (
              <User
  
              >
    
                <DiaryTextHolder>
                <Tag> {d?.UserName}</Tag>
                {d?.Online_Status == 1 && 
                  <Online></Online>
                }
                  {d?.Online_Status == 0 && 
                  <Offline></Offline>
                }
                
                </DiaryTextHolder>
              <UserBtnHolder>
                
             
              <UserBtn >
                 <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></Svg>
                </UserBtn>
                <UserBtnLink  to={`/profile/${d.UserName.replaceAll(" ","")}/${d.UserId}`}>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z"/></Svg>
                
                </UserBtnLink>

             
                </UserBtnHolder>
              </User>
            );
          })}
        </DiaryHolder>
      </Inner>
    </Root>
    </>
  );
};

export default Users;
