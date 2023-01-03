import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Image from "../assets/imagesrsadere.png";
import Image2 from "../assets/imagesrsaderes.png";
import Image3 from "../assets/seedling.jpg";
import axios from "axios";
import { DiaryContext } from "../context/diary_context";
import LightBox from "../components/LightBox";
import PlaceHolder from "../assets/placeholder.png";
import NotesPopUp from "../components/Notes";
import IndoorIcon from "../assets/sweetleaf-icons/indoors.svg"
import {useNavigate} from 'react-router-dom'
import Tabs from "../components/Tabs";
import { AuthContext } from "../context/auth_context";
import PopUp from "../components/PopUp";
import  faTrash  from "../assets/trash-can-regular.svg";
import Mainline from '../assets/mainline.svg'
import Topping from '../assets/topping.svg'
import Defoliation from '../assets/defoil.svg'

import { InfinitySpin } from  'react-loader-spinner'

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
  border-radius: 0px 5px 5px 5px;
  width: 100%;
  background: #ffffff;
  padding: 20px 0px;
  padding-top:0px;
  @media (max-width: 425px) {
    margin: 0px;
    padding-top: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px;
    padding-top: 0px;
  }
`;


const IntroHolder = styled.div`
  margin-bottom: 0px;
  padding: 0px 0px;
  display: flex;
  justify-content: space-between;


`;

const IntroHolderDay = styled.div`
  margin-bottom: 0px;
  padding: 20px 0px;
  display: flex;
  justify-content: end;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding-bottom: 10px;


`;

const Flex = styled.div`
width: 100%;
display: flex;
align-items: center;

`;

const RightFlex = styled.div`
  margin-bottom: 0px;
  border-radius: 5px;
  background: #ffffff;

  @media (max-width: 425px) {
    box-shadow: 0px 1px 8px 2px #00000047;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    box-shadow: 0px 1px 8px 2px #00000047;
    margin-bottom: 20px;
  }
`;
const RightFlexInner = styled.div`
padding:  20px;

`;


const RightFlexHolder = styled.div`
width: 50%;
@media (max-width: 425px) {
  margin: 0px auto;
  padding: 0px 0px;
  width: 90%;
  margin-top: -70px;
  border-radius: 5px;
  
}
@media (min-width: 426px) and (max-width: 768px) {
  margin: 0px auto;
  padding: 0px 0px;
  width: 90%;
  margin-top: -70px;
  border-radius: 5px;
  
}
`
;
const ToggleHolder= styled.div`
display: flex;

flex-wrap: wrap;

flex-direction: row;
justify-content: end;
align-items: center;
@media (max-width: 425px) {
  flex-direction: column;
  align-items: end;

}

`
const ToggleHolderLabel= styled.div`
color:black;
padding: 0px 10px;
display: flex;
`

const FlexTop = styled.div`
  display: flex;
  padding: 0px 0px;

  @media (max-width: 425px) {
    flex-direction: column;
    padding: 0px 0px;
    background: unset;
    margin-bottom: 20px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    flex-direction: column;
    padding: 0px 0px;
  }
`;

const Flex3B = styled.div`
background: #275557;
color:white;
padding: 40px 0px;

@media (max-width: 425px) {
  background: #275557;
  color: white;
}
`;
const Flex3BtnHolder = styled.div`
justify-content: end;
padding: 0px 20px;
display: flex;

`;


const WeekHolder = styled.div`
  width: fit-content;
  text-align: center;
  border-radius: 5px;
  margin: 10px 10px;
  min-width: 70px;
  background: white;
  cursor: pointer;

  display: flex;
  color: black;
  opacity: 0.8;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    opacity: 1;
 
  }
`;
const AddWeek = styled.div`
width: fit-content;
border-radius: 5px;
margin: 10px 10px;
min-width: 70px;
background: white;
cursor: pointer;
opacity: 0.8;
display: flex;
height: 88px;
justify-content: center;
  &:hover {
    opacity: 1;
 
  }
`;

const WeekHolderActive = styled.div`
  width: fit-content;
  text-align: center;
  border-radius: 5px;
  margin: 10px 10px;
  min-width: 70px;
  background: white;
  cursor: pointer;
  color: black;

  transition: all 0.2s ease;
  display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const WeekHolderHeading = styled.div`
  background: #8bab50;
  border-radius: 0px 0px 5px 5px;
  padding: 5px 10px;
  color: white;
  font-size: 12px;
`;
const WeekHolderHeadingRed = styled.div`
  background: #de8605;
  border-radius: 0px 0px 5px 5px;
  padding: 5px 10px;
  color: white;
  font-size: 12px;
`;
const WeekHolderHeadingRedd = styled.div`
  background: #f44336;
  border-radius: 0px 0px 5px 5px;
  padding: 5px 10px;
  color: white;
  font-size: 12px;
`;


const WeekHolderHeadingBlue = styled.div`
  background: #5db7ff;
  border-radius: 0px 0px 5px 5px;
  padding: 5px 10px;
  color: white;
  font-size: 12px;
`;

const WeekHolderText = styled.div`
  text-align: center;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
`;

const WeekHolderTextSub = styled.div`
  text-align: center;
`;

const ImgHolder = styled.div`

background-image: ${props => `url(${props.img})`};
        background-size: cover;
        min-height: 500px;
        background-position: center;
  max-width: 50%;
  width: 100%;


  @media (max-width: 425px) {
    max-width: unset;
    height: 300px;
    min-height: unset;
  border-radius: unset;

  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
    height: 400px;
    border-radius: unset;

  }
`;
const TextHolder = styled.div`
  display: flex;
  flex-direction: column;


  width: 100%;

  
  border-radius: 5px;
  @media (max-width: 425px) {

    width: unset;
    padding: 20px 0px;
    padding-top:0px;
    padding-bottom:0px;
    min-height: unset; 
    
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin-left: 0px;
    width: unset;
    padding: 0px;
    min-height: unset; 
  }
`;

const TextHolderHeading = styled.h3`
  margin-bottom: 0px;
  color:white;
`;
const DairyHeading = styled.h3`
color:black;
  margin-top: 0px;
  font-size: 30px;
  margin-bottom: 0px;
  @media (max-width: 425px) {
    font-size: 24px;
  }
`;
const DairyHeadingTitle = styled.p`
color:black;
  margin-top: 0px;
  font-size: 16px;
  margin-bottom: 0px;
  @media (max-width: 425px) {
    font-size: 14px;
    padding-top: 0px;
  }
`;

const DairyHeadingSmall = styled.sup`
color: white;
margin-top: 0px;
font-size: 16px;
background: #275557;
margin-bottom: 0px;
padding: 5px 15px;
height: fit-content;
border-radius: 50px;
margin-right: 10px;
display: flex;
`;
const DairyViewsSmall = styled.sup`
display: flex;
color:  #275557;
margin-top: 0px;
font-size: 16px;

margin-bottom: 0px;
padding: 5px 15px;
padding-left: 0px;
padding-top: 0px;
height: fit-content;
border-radius: 50px;
margin-right: 10px;
`;

const DairyHeadingSmallAccent = styled.span`
color:#275557;
  margin-top: 0px;
  font-size: 16px;
  margin-bottom: 0px;
`;



const GalleryImageHolderFlex = styled.div`
display: flex;
min-width: calc(100% / 4 - 30px);
background-image: ${props => `url(${props.img})`};
margin: 0px 15px;
border-radius: 5px;
position: relative;
cursor:pointer;
height: 300px;
background-size: cover;
flex-direction: column;

@media (max-width: 425px) {
  min-width: calc(100% / 1 - 30px);
  
}
@media (min-width: 426px) and (max-width: 768px) {
  max-width: calc(100% / 2 - 20px);
  min-width: calc(100% / 2 - 20px);
}
`;

const GalleryImageHolder = styled.div`

background-image: ${props => `url(${props.img})`};

border-radius: 5px 5px  0px 0px;
position: relative;
cursor:pointer;
height: 300px;
background-size: cover;

`;


const GalleryImageOverlay = styled.div`
  
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  top: 0;
  z-index: 40;
  color: white;
  padding: 10px;
  font-size: 14px;
  border-radius: 0px 0px  5px 5px;
  background: #275557;
`;

const GalleryHolderInnerMain = styled.div`
overflow:hidden;
position: relative;
width: 100%;
`;
const GalleryNext = styled.div`
right: 10px;
cursor: pointer;
position: absolute;
background: #275557;
padding: 10px;
color: white;
z-index: 2;
opacity: 0.8;
display: flex;
border-radius: 50px;
transform: translate(0%, -50%);
transition: all 0.2s ease;
    top: 50%;
    &:hover {
      opacity: 1;
    
    }
`;

const GalleryBack = styled.div`
left: 10px;
border-radius: 50px;
cursor: pointer;
position: absolute;
background: #275557;
padding: 10px;
color: white;
z-index: 2;
opacity: 0.8;
display: flex;
transform: translate(0%, -50%);
transition: all 0.2s ease;
    top: 50%;
    &:hover {
      opacity: 1;
    
    }
`;


const GalleryHolderInner = styled.div`
  display: flex;
  transform: translateX(${props => props.position}%);
  transition: 0.5s all ease;
  @media (max-width: 425px) {
    transform: translateX(${props => props.position * 4}%);
  }

 
`;

const GalleryHolderOutter = styled.div`
position: relative;
`;

const WeekHolderInner = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap:wrap;
  width: 40%;
  margin: 0 auto;
  @media (min-width: 0px) and (max-width: 768px) {
    width: 100%;
  }
`;

const Heading = styled.h4`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  display: flex;
  margin-bottom: 10px;
  margin-top: 30px;
  align-items: center;
  &::before {
    content: "";
    display: block;
    background: #8bab50;
    height: 2px;
    width: 15%;
    margin: 0px 20px;
  }
  &::after {
    content: "";
    display: block;
    background: #8bab50;
    height: 2px;
    width: 15%;
    margin: 0px 20px;
  },

`;

const HeadingCta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  margin-top:0px;
`;

const HeadingCtaButton = styled.button`
padding: 5px 25px;

background: #8bab50;
border: none;
color: black;
border-radius: 50px;
cursor: pointer;
`;

const NoData = styled.div`
  padding: 15px 0px;
  font-size: 20px;
`;
const NoDataHolder = styled.div`
  width: 100%;
  text-align: center;
`;

const DayDotHolder = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0px;
`;
const DayDotInner = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 10px;
  flex-direction: column;
  align-items: center;

`;

const DayDot = styled.div`
  width: 10px;
  height: 10px;

  border-radius: 50%;
  margin: 0px 5px;
  cursor: pointer;
  opacity: 0.5;
 
  background: #ffffff;
  &:hover {
    opacity: 1;
 
  }
  @media (max-width: 425px) {
    background: #ffffff;
  }
 
`;

const fadeIn = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.4);
  }
`
const DayDotActive = styled.div`
  width: 10px;
  height: 10px;
  background: #8bab50;
  border-radius: 50%;
  margin: 0px 5px;
  cursor: pointer;
  transform: scale(1.4);
 
  animation: 0.5s ${fadeIn} ease-out;
`;

const Notes = styled.div`
  padding: 20px;
  height: 100%;
  background: #859ea34f;

  border-radius: 5px;
`;
const DayDotOutter = styled.div`
  
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
 
 
`;


const Helper = styled.p`
text-align:center
`;

const HelperBtnHolder = styled.div`

margin-left: 20px;
display: flex;
justify-content: end;

   
`;

const HelperBtn = styled.button`
display: flex;
align-items: center;
text-align: center;
    padding: 2px 20px;
    background: #8bab50;
    border: none;
    color: white;
    border-radius: 50px;
    
    cursor: pointer;

`;
const HelperBtnText = styled.p`

padding: 5px 10px;
margin: 0;
`;

const Dot = styled.div`
  background: ${props => props.index == props.positionIndex ? "#8bab50": "#275557"};
  border-radius: 50%;
  height: 10px;
  width: 10px;
  margin:0px 5px;
  margin-top:10px;
  opacity:${props => props.index == props.positionIndex ? "1": "0.5"}
`;

const DotHolder= styled.div`

justify-content: center;
display: none;
@media (min-width: 0px) and (max-width: 768px) {
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin: 10px auto;
}
`;


const AssignButton = styled.button`
padding: 5px 20px;

width: fit-content;
border: none;
background: #8bab50;
color: black;
border-radius: 50px;
cursor: pointer;

margin:0px 10px;
@media (max-width: 425px) {
  margin: 10px 10px;
 
}
`;

const LikeButton = styled.button`
display: flex;
align-items: center;
display: flex;
align-items: center;
background: #8bab50;
padding: 5px 20px;

width: fit-content;
border: none;

color: #275557;
border-radius: 50px;
cursor: pointer;


@media (max-width: 425px) {

 
}
`;

const LikeButtonText = styled.p`
margin: 0px;
padding: 0px 10px;
color: #ffffff;

`;


const ButtonUpload = styled.button`
padding: 5px 25px;
background: #275557;
color: white;
border: none;
border-radius: 50px;
cursor: pointer;
margin: 0px 17px;
margin-bottom : 17px;
float: right;
`;


const QuickActionHeading = styled.h2`
color: black;
margin: 10px 0px;
font-weight: bold;
margin-bottom: 10px;
font-size: 18px;

`;
const QuickActionBlockFlex = styled.div`
display: flex;
flex-wrap: wrap;
padding-top: 15px;
`;
const CheckFlex = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
@media (max-width: 425px) {
  margin: 5px 0px;
}

`;

const QuickActionBlockIcon = styled.img`
width: 40px;
margin-right:10px;
`;

const QuickActionBlock = styled.button`
padding: 5px 10px;
background: #275557;
margin: 0px 10px;
color: white;
margin-left: 0px;
margin-bottom: 10px;
border-radius: 5px;
text-align: center;
border: none;
display: flex;
cursor: pointer;
align-items: center;
@media (max-width: 425px) {

  margin-bottom:20px
}
`
const Input = styled.input`

background: transparent;
border: none;
border-bottom: 2px solid #8bab50;
padding: ${(props) => !props.assignDevice ? "0px":"5px 5px"};
width: ${(props) => !props.assignDevice ? "0px":"unset"};
color: black;
transition: 0.5s all ease;
@media (max-width: 425px) {
  width: ${(props) => !props.assignDevice ? "0px":"100%"};
}

`

;

const InputHolder = styled.div`
padding: 20px 0px;

width: ${(props) => !props.assignDevice ? "0px":"unset"};


display: ${(props) => !props.assignDevice ?"none" : "flex"};
transition: 0.5s all ease;
@media (max-width: 425px) {
  width: ${(props) => !props.assignDevice ? "0px":"100%"};
}

`

;

const InputHolderSubmit = styled.button`
display: ${(props) => !props.assignDevice ? "none":"block"};
padding: 5px 20px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    border: none;
    background: #8bab50;
    color: black;
    border-radius: 50px;
    cursor: pointer;
;
    margin: 0px 10px;
    margi
    transition: 0.5s all ease;
`

;

const DeleteDiaryHolder = styled.div`
display: flex;
justify-content: space-between;
align-items: center; 
padding: 10px 10px; 
padding-bottom: 0px;
`;

const DeleteDiary = styled.div`
cursor:pointer;
`;

const Svg = styled.svg`
width: 20px;
fill: red;
`;
const SvgV = styled.svg`
width: 20px;
fill: #275557;
margin-right: 10px;
`;
const SvgL = styled.svg`
width: 25px;
fill:white;
margin-right: 10px;
`;
const SvgVS = styled.svg`
width: 15px;
fill: #275557;
margin-right: 10px;
`;

const SvgW = styled.svg`
width: 20px;
fill: black;
`;

const SvgB = styled.svg`
width: 20px;
fill: white;
`;
const AddWeekSvg = styled.svg`
width: 20px;
fill: #275557;
`;

const DashBoard = (props) => {

  let tabs = [
    {
      tabName:'Overview',
      active:false
    },
    {
      tabName:'Statistics',
      active:false
    }
  ]

  const [lightBox, setLightBox] = useState(false);
  const [addNotes, setAddNotes] = useState(false);
  const [daysNotes, setDaysNotes] = useState("");
  const [diaryData, setDiaryData] = useState("");
  const [dayId, setDayId] = useState(null);
  const [weekId, setWeekId] = useState("");
  
  const [lightBoxImg, setLightBoxImg] = useState(Image);
  const [lightBoxData, setLightBoxData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [days, setDays] = useState([]);
  const [activeDiary, setActiveDiary] = useState([]);
  const [activeDiaryData, setActiveDiaryData] = useState([]);
  const [activeDiaryNotes, setActiveDiaryNotes] = useState("");
  const [activeDiaryWeeks, setActiveDiaryWeeks] = useState([]);
  const [activeWeek, setActiveWeek] = useState('');
  const [techniques, setTechniques] = useState([]);
  
  const [activeDay, setActiveDay] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const { diaries,diariesPublic,Update,UpdatePublic } = useContext(DiaryContext);
  const params = useParams();
  const [tabList, setTabList] = useState(tabs)
  const location =useLocation()
  const [position, setPosition] = useState(0);
  const [positionIndex, setPositionIndex] = useState(0);
  const [activeToggle, setActiveToggle] = useState(false);
  const [publicToggle, setPublicToggle] = useState(false);
  const [assignDevice, setAssignDevice] = useState(false);

  const [popUpOffset, setPopUpOffset] = useState(-101);
  const [popUpEditWeekOffset, setPopUpEditWeekOffset] = useState(-101);
  const [popUpDeleteWeekOffset, setPopUpDeleteWeekOffset] = useState(-101);
  const [popUpAddWeekOffset, setPopUpAddWeekOffset] = useState(-101);

  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const { auth,authToken, } = useContext(AuthContext);
  let token = localStorage.getItem("token")

  let userId =  JSON.parse(localStorage.getItem("auth"))


  const navigate = useNavigate ()



  
  useEffect(() => {
    let filtered = ""
    if( diariesPublic?.filter((d) => d.DiaryId == parseInt(params?.id))[0]){
      filtered =  diariesPublic?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    }
    if( diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0]){
      filtered =  diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    }

  
    document.title = "Sweet Leaf - " + filtered?.Title;
    setViews(filtered?.Views)
    setLikes(filtered?.Likes)

    setPositionIndex(0)
    setPosition(0)
  
    setActiveDiary(filtered);


    let config = {
      headers: {
        authorization: 'Bearer ' + token,
      }
    }

    let data = {
      DiaryId: params?.id,
    };

    axios
      .post("https://api.sweetleaf.co.za/weeks", data,config)
      .then(function (response) {
        setActiveDiaryWeeks(response.data.sort((a,b) => a.Week-b.Week));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [diaries,diariesPublic])


  useEffect(() => {

    if(activeDiary !== undefined){
  
    let datav ={
      DiaryId:parseInt(params?.id)
    }

    axios
    .post("https://api.sweetleaf.co.za/diaries/update_view", datav)
    .then(function (response) {
      if(diaries.length > 0 ){
      
        Update()
      }
      else{
        UpdatePublic()
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    }

  }, [])
  
 

const handleLike = ()=>{
  if(activeDiary !== undefined){
  
    let datav ={
      DiaryId:parseInt(params?.id)
    }

    axios
    .post("https://api.sweetleaf.co.za/diaries/update_likes", datav)
    .then(function (response) {
      if(diaries.length > 0 ){
      
        Update()
      }
      else{
        UpdatePublic()
      }
     
    })
    .catch(function (error) {
      console.log(error);
    });
    }
}



  

  const handleLightBox = (img, data) => {
    setLightBox(!lightBox);
    setLightBoxImg(img);
    setLightBoxData(data);
  };

  const handleNotes = () => {
    setAddNotes(!addNotes);
  };

  const handelGetWeekData = (w) => {
    setPositionIndex(0)
    setPosition(0)
    setWeekId( w.WeekId)
if(activeWeek !== w){
  setGalleryData([]);
  setDiaryData('');
  let dataw = {
    WeekId:  w.WeekId,
  };

  axios
    .post("https://api.sweetleaf.co.za/days", dataw)
    .then(function (response) {
    
      setDays(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  let data = {
    DiaryId: w?.DiaryId,
    WeekId: w.WeekId,
  };
  axios
       .post("https://api.sweetleaf.co.za/plant_data/lastest", data)
       .then(function (response) {

         setActiveDiaryData(response.data.latest);
        
         axios
         .post("https://api.sweetleaf.co.za/plant_data/by_Week", data)
         .then(function (response) {
           setDaysNotes(response.data.Notes);
         
         })
         .catch(function (error) {
           console.log(error);
         });
        })
        .catch(function (error) {
          console.log(error);
        });
        setActiveWeek(w)

        let weekData = {
          WeekId:w.WeekId
        }
        axios
        .post("https://api.sweetleaf.co.za/techniques/by_week_id",weekData )
        .then(function (response) {

        setTechniques(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
}
   
  };

  const handleDay = (days, day) => {
    setPositionIndex(0)
    setPosition(0)
    if(activeDay !== day){

    setGalleryData([]);
    let preDay = day.DayId;
    setDayId( day.DayId)

    if (day.DayId == preDay) {
      let data = {
        DiaryId: params?.id,
        DayId: day.DayId,
        WeekId: day.WeekId,
      };

      setDiaryData(data);

      axios
        .post("https://api.sweetleaf.co.za/plant_data/lastest", data)
        .then(function (response) {
      
          setActiveDiaryData(response.data.latest);
          setGalleryData(response.data.Day);

          axios
            .post("https://api.sweetleaf.co.za/notes/today", data)
            .then(function (response) {
              setDaysNotes(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
      preDay = "";
      day.active = true;
    }
    setActiveDay(day)
  }
  };

  const imageCheck = ()=>{
if(activeDiary?.ThumbNail !== undefined){
  setMainImage(activeDiary?.ThumbNail)
}
if(activeDiaryData?.Image !== undefined){
  setMainImage(activeDiaryData?.Image)
 }
 if(activeDiaryData?.Image == undefined && activeDiary?.ThumbNail == (undefined || "")){
  setMainImage(PlaceHolder)
 }
  }

 useEffect(() => {
  imageCheck()

  if(activeDiary?.Active == 1){
    setActiveToggle(true)
  }
  if(activeDiary?.Public == 1){
    setPublicToggle(true)
  }
  
 }, [activeDiary,activeDiaryData])
 
 useEffect(() => {

  if(activeDiary?.Active == 1){
    setActiveToggle(true)
  }
  if(activeDiary?.Public == 1){
    setPublicToggle(true)
  }
  
 }, [params])


 const HandleNext = ()=>{
  setPosition(position - 25)
  setPositionIndex(positionIndex + 1)
 }

 const HandleBack = ()=>{
if(positionIndex > 0){
  setPosition(position + 25)
  setPositionIndex(positionIndex - 1)
}
}




  const handleActiveToggle = (e,activeDiary)=>{
   
    if(userId?.UserId == activeDiary?.UserId){
      setActiveToggle(e.target.checked)
    }

    let config = {
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }
    
    let values = {
      DiaryId:activeDiary.DiaryId,
      Active:e.target.checked
    }

    axios.post('https://api.sweetleaf.co.za/diaries/update/active',values,config,)
    .then(function (response) {
      if(response.data.insertId !== undefined){
      
      }
     
    
    })
    .catch(function (error) {
  
      console.log(error);
    })
 

  }

  
  const handlePublicToggle = (e,activeDiary)=>{
   
    if(userId?.UserId == activeDiary?.UserId){
      setPublicToggle(e.target.checked)
    }

    let config = {
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }
    
    let values = {
      DiaryId:activeDiary.DiaryId,
      Active:e.target.checked
    }
 
    axios.post('https://api.sweetleaf.co.za/diaries/update/public',values,config,)
    .then(function (response) {
      if(response.data.insertId !== undefined){
      
      }
     

    })
    .catch(function (error) {
  
      console.log(error);
    })
 

  }
  

   const deleteDiary = (DiaryId)=>{

    let data ={
      DiaryId:DiaryId
    }

    let config = {
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }
    axios.post('https://api.sweetleaf.co.za/diaries/delete',data,config)
    .then(function (response) {
      if(response.data.affectedRows > 0){

        setPopUpOffset(-101);
      }

     
    })
    .catch(function (error) {
  
      console.log(error);
    })
 
  }
  
  const HandleImageUpload = ()=>{
    if (popUpOffset == -101) {
      setPopUpOffset(0);
    } else {
      setPopUpOffset(-101);
    }
   }


  const handleAddWeek = ()=>{
    if (popUpAddWeekOffset == -101) {
      setPopUpAddWeekOffset(0);
    } else {
      setPopUpAddWeekOffset(-101);
    }
   }

   const handleEditWeek = ()=>{
    if (popUpEditWeekOffset == -101) {
      setPopUpEditWeekOffset(0);
    } else {
      setPopUpEditWeekOffset(-101);
    }
   }

   const handleDeleteWeek = ()=>{
    if (popUpEditWeekOffset == -101) {
      setPopUpDeleteWeekOffset(0);
    } else {
      setPopUpDeleteWeekOffset(-101);
    }
   }
   
   
  return (

  
    <Root>
    
  
    {lightBox && (
        <LightBox data={lightBoxData} close={setLightBox} image={lightBoxImg} />
      )}

<PopUp popUpOffset={popUpOffset} setPopUpOffset={setPopUpOffset} type="uploadImage" DiaryId={activeDiary?.DiaryId} WeekId={weekId} DayId={dayId} update={Update} />
   
<PopUp popUpOffset={popUpAddWeekOffset} setPopUpOffset={setPopUpAddWeekOffset} type="addWeek" DiaryId={activeDiary?.DiaryId} />

<PopUp popUpOffset={popUpEditWeekOffset} setPopUpOffset={setPopUpEditWeekOffset} type="editWeek" DiaryId={activeDiary?.DiaryId} week={activeWeek} />

<PopUp popUpOffset={popUpDeleteWeekOffset} setPopUpOffset={setPopUpDeleteWeekOffset} type="deleteWeek" DiaryId={activeDiary?.DiaryId} week={activeWeek} />

      <Inner>
      

        <FlexTop>
          <ImgHolder img={ mainImage}  onClick={()=>{handleLightBox(mainImage)}}>
           
          </ImgHolder>
      
       <RightFlexHolder>
       <RightFlex>
        <Tabs/>
        <RightFlexInner>
       
{userId?.UserId == activeDiary?.UserId &&

<ToggleHolder>

{activeToggle && 
<>

<>



<AssignButton onClick={()=>{setAssignDevice(!assignDevice)}}>Assign Device +</AssignButton> 

<InputHolder assignDevice={assignDevice}>
<Input text placeholder="Enter Device Id" assignDevice={assignDevice}></Input>
<InputHolderSubmit assignDevice={assignDevice} onClick={()=>{setAssignDevice(false)}}>Submit</InputHolderSubmit>
</InputHolder>

</>
</>
}

<CheckFlex>

<ToggleHolderLabel>In-Active</ToggleHolderLabel><label class="switch">
<input type="checkbox" checked={activeToggle} onChange={(e)=>{handleActiveToggle(e,activeDiary)}}/>
<span class="slider round"></span>

</label>    <ToggleHolderLabel>Active</ToggleHolderLabel>

</CheckFlex>

<CheckFlex>

<ToggleHolderLabel>
<SvgW xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM189.8 123.5L235.8 159.5C258.3 139.9 287.8 128 320 128C390.7 128 448 185.3 448 256C448 277.2 442.9 297.1 433.8 314.7L487.6 356.9C521.1 322.8 545.9 283.1 558.6 256C544.1 225.1 518.4 183.5 479.9 147.7C438.8 109.6 385.2 79.1 320 79.1C269.5 79.1 225.1 97.73 189.8 123.5L189.8 123.5zM394.9 284.2C398.2 275.4 400 265.9 400 255.1C400 211.8 364.2 175.1 320 175.1C319.3 175.1 318.7 176 317.1 176C319.3 181.1 320 186.5 320 191.1C320 202.2 317.6 211.8 313.4 220.3L394.9 284.2zM404.3 414.5L446.2 447.5C409.9 467.1 367.8 480 320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L120.8 191.2C102.1 214.5 89.76 237.6 81.45 255.1C95.02 286 121.6 328.5 160.1 364.3C201.2 402.4 254.8 432 320 432C350.7 432 378.8 425.4 404.3 414.5H404.3zM192 255.1C192 253.1 192.1 250.3 192.3 247.5L248.4 291.7C258.9 312.8 278.5 328.6 302 333.1L358.2 378.2C346.1 381.1 333.3 384 319.1 384C249.3 384 191.1 326.7 191.1 255.1H192z"/></SvgW>
  </ToggleHolderLabel><label class="switch">
<input type="checkbox" checked={publicToggle} onChange={(e)=>{handlePublicToggle(e,activeDiary)}}/>
<span class="slider round"></span>

</label>    <ToggleHolderLabel>
<SvgW xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z"/></SvgW>
</ToggleHolderLabel>

</CheckFlex>

<DeleteDiaryHolder>
           
{userId?.UserId == activeDiary?.UserId &&
               <DeleteDiary >        
             

               <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></Svg>
               </DeleteDiary>
           }
        </DeleteDiaryHolder>
</ToggleHolder>
}
    
<IntroHolderDay>

{userId?.UserId !== activeDiary?.UserId &&
        <LikeButton onClick={()=>{handleLike()}}>
        <SvgL xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 191.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V223.1C128 206.3 113.7 191.1 96 191.1zM512 227c0-36.89-30.05-66.92-66.97-66.92h-99.86C354.7 135.1 360 113.5 360 100.8c0-33.8-26.2-68.78-70.06-68.78c-46.61 0-59.36 32.44-69.61 58.5c-31.66 80.5-60.33 66.39-60.33 93.47c0 12.84 10.36 23.99 24.02 23.99c5.256 0 10.55-1.721 14.97-5.26c76.76-61.37 57.97-122.7 90.95-122.7c16.08 0 22.06 12.75 22.06 20.79c0 7.404-7.594 39.55-25.55 71.59c-2.046 3.646-3.066 7.686-3.066 11.72c0 13.92 11.43 23.1 24 23.1h137.6C455.5 208.1 464 216.6 464 227c0 9.809-7.766 18.03-17.67 18.71c-12.66 .8593-22.36 11.4-22.36 23.94c0 15.47 11.39 15.95 11.39 28.91c0 25.37-35.03 12.34-35.03 42.15c0 11.22 6.392 13.03 6.392 22.25c0 22.66-29.77 13.76-29.77 40.64c0 4.515 1.11 5.961 1.11 9.456c0 10.45-8.516 18.95-18.97 18.95h-52.53c-25.62 0-51.02-8.466-71.5-23.81l-36.66-27.51c-4.315-3.245-9.37-4.811-14.38-4.811c-13.85 0-24.03 11.38-24.03 24.04c0 7.287 3.312 14.42 9.596 19.13l36.67 27.52C235 468.1 270.6 480 306.6 480h52.53c35.33 0 64.36-27.49 66.8-62.2c17.77-12.23 28.83-32.51 28.83-54.83c0-3.046-.2187-6.107-.6406-9.122c17.84-12.15 29.28-32.58 29.28-55.28c0-5.311-.6406-10.54-1.875-15.64C499.9 270.1 512 250.2 512 227z"/></SvgL><LikeButtonText>Like</LikeButtonText> 
          </LikeButton>  
          }

<Flex>
<DairyViewsSmall><SvgVS xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 248H128V192H48V248zM48 296V360H128V296H48zM176 296V360H272V296H176zM320 296V360H400V296H320zM400 192H320V248H400V192zM400 408H320V464H384C392.8 464 400 456.8 400 448V408zM272 408H176V464H272V408zM128 408H48V448C48 456.8 55.16 464 64 464H128V408zM272 192H176V248H272V192z"/></SvgVS> <DairyHeadingSmallAccent>{activeDiary?.Days_From_Start}</DairyHeadingSmallAccent> </DairyViewsSmall>
<DairyViewsSmall><SvgV xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z"/></SvgV><DairyHeadingSmallAccent>{views}</DairyHeadingSmallAccent> </DairyViewsSmall>
<DairyViewsSmall><SvgV xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M96 191.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V223.1C128 206.3 113.7 191.1 96 191.1zM512 227c0-36.89-30.05-66.92-66.97-66.92h-99.86C354.7 135.1 360 113.5 360 100.8c0-33.8-26.2-68.78-70.06-68.78c-46.61 0-59.36 32.44-69.61 58.5c-31.66 80.5-60.33 66.39-60.33 93.47c0 12.84 10.36 23.99 24.02 23.99c5.256 0 10.55-1.721 14.97-5.26c76.76-61.37 57.97-122.7 90.95-122.7c16.08 0 22.06 12.75 22.06 20.79c0 7.404-7.594 39.55-25.55 71.59c-2.046 3.646-3.066 7.686-3.066 11.72c0 13.92 11.43 23.1 24 23.1h137.6C455.5 208.1 464 216.6 464 227c0 9.809-7.766 18.03-17.67 18.71c-12.66 .8593-22.36 11.4-22.36 23.94c0 15.47 11.39 15.95 11.39 28.91c0 25.37-35.03 12.34-35.03 42.15c0 11.22 6.392 13.03 6.392 22.25c0 22.66-29.77 13.76-29.77 40.64c0 4.515 1.11 5.961 1.11 9.456c0 10.45-8.516 18.95-18.97 18.95h-52.53c-25.62 0-51.02-8.466-71.5-23.81l-36.66-27.51c-4.315-3.245-9.37-4.811-14.38-4.811c-13.85 0-24.03 11.38-24.03 24.04c0 7.287 3.312 14.42 9.596 19.13l36.67 27.52C235 468.1 270.6 480 306.6 480h52.53c35.33 0 64.36-27.49 66.8-62.2c17.77-12.23 28.83-32.51 28.83-54.83c0-3.046-.2187-6.107-.6406-9.122c17.84-12.15 29.28-32.58 29.28-55.28c0-5.311-.6406-10.54-1.875-15.64C499.9 270.1 512 250.2 512 227z"/></SvgV><DairyHeadingSmallAccent>{likes}</DairyHeadingSmallAccent></DairyViewsSmall>

</Flex>
</IntroHolderDay>
          <IntroHolder>
 <div>

          <DairyHeading>{activeDiary?.Title} </DairyHeading>
          
          <DairyHeadingTitle>{activeDiary?.UserName}</DairyHeadingTitle>
          <DairyHeadingTitle>Strain : {activeDiary?.Strain}</DairyHeadingTitle>
 </div>
      
          {/* <TextHeading>Start Date </TextHeading>
          <div>{activeDiary?.Start_Date?.split("T")[0]}</div> */}
        </IntroHolder>
          {activeWeek !== "" && 
          <TextHolder>
           
        <QuickActionBlockFlex>

          {techniques?.map((t)=>{
            return(
              <>
              <QuickActionBlock> <QuickActionBlockIcon src={Mainline}/>{t?.Technique_Name}</QuickActionBlock>
              </>
            )
          })}

        </QuickActionBlockFlex>

          </TextHolder>
          }

{console.log("dayId",dayId)}
{dayId !== null && 
          <TextHolder>
           
            <HeadingCta>
              <TextHolderHeading>Notes</TextHolderHeading>
              {userId?.UserId == activeDiary?.UserId && 
                  <HeadingCtaButton
                  onClick={() => {
                    handleNotes();
                  }}
                >
       
                  {daysNotes?.Notes == '' || undefined ? "Add Notes" : "Edit Notes"}
                </HeadingCtaButton>}
          
            </HeadingCta>
            <Notes>{daysNotes?.Notes ? daysNotes?.Notes : daysNotes}</Notes>


          </TextHolder>
          }

          </RightFlexInner>
          </RightFlex>
       </RightFlexHolder>
        </FlexTop>
    
        {addNotes && (
          <NotesPopUp
            setAddNotes={setAddNotes}
            setDaysNotes={setDaysNotes}
            daysNotes={daysNotes?.Notes ? daysNotes?.Notes : daysNotes}
            diaryDatas={diaryData}
            keyNote={daysNotes?.KeyNote}
       
          >

            {activeDiaryNotes}
          </NotesPopUp>
        )}


<Flex3B>

  <Flex3BtnHolder>

    
{activeWeek !== "" && <HelperBtnHolder onClick={() => {handleEditWeek()}}>
  <HelperBtn >
<SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"/></SvgB>
  <HelperBtnText>Edit Week</HelperBtnText></HelperBtn></HelperBtnHolder>}

{activeWeek !== "" && <HelperBtnHolder  onClick={() => {handleDeleteWeek()}}><HelperBtn>
<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></Svg>
<HelperBtnText>  Delete Week</HelperBtnText></HelperBtn></HelperBtnHolder>}
</Flex3BtnHolder>
{activeWeek.WeekId == undefined && <Helper>Select a Week</Helper>}



          <Heading>WEEKS</Heading>


          <WeekHolderInner>
          <>
                {activeDiaryWeeks.map((w, index) => {
                  return (
                    <>
                    {activeWeek !== w ? 
                    <WeekHolder
                      onClick={() => {
                        handelGetWeekData(w);
                      }}
                      key={index}
                    >
                      <WeekHolderText>
                        
                        <WeekHolderTextSub>Week</WeekHolderTextSub>
                        <div>{w.Stage.toUpperCase() == "GER" ? "G" : w.Week}</div>
                      </WeekHolderText>

                    {w.Stage.toUpperCase() == "GER" &&
                    <WeekHolderHeadingBlue>
                   {w.Stage.toUpperCase()}
                  </WeekHolderHeadingBlue>
                      }

                    {w.Stage.toUpperCase() ==  "VEG"  &&
                    <WeekHolderHeading>
                    {w.Stage.toUpperCase()}
                  </WeekHolderHeading>
                      }

                    {w.Stage.toUpperCase() ==  "FLO"  &&
                    <WeekHolderHeadingRed>
                    {w.Stage.toUpperCase()}
                  </WeekHolderHeadingRed>
                      }

{w.Stage.toUpperCase() ==  "HAR"  &&
                    <WeekHolderHeadingRedd>
                    {w.Stage.toUpperCase()}
                  </WeekHolderHeadingRedd>
                      }

                    </WeekHolder>:
                    <WeekHolderActive
                      onClick={() => {
                        handelGetWeekData(w);
                      }}
                      key={w.Week + 1}
                    >
                          <WeekHolderText>
                        
                        <WeekHolderTextSub>Week</WeekHolderTextSub>
                        <div>{w.Stage.toUpperCase() == "GER" ? "G" : w.Week}</div>
                      </WeekHolderText>

                {w.Stage.toUpperCase() == "GER" &&
                    <WeekHolderHeadingBlue>
                   {w.Stage.toUpperCase()}
                  </WeekHolderHeadingBlue>
                      }

                    {w.Stage.toUpperCase() ==  "VEG"  &&
                    <WeekHolderHeading>
                    {w.Stage.toUpperCase()}
                  </WeekHolderHeading>
                      }

                    {w.Stage.toUpperCase() ==  "FLO"  &&
                    <WeekHolderHeadingRed>
                    {w.Stage.toUpperCase()}
                  </WeekHolderHeadingRed>
                      }
                        {w.Stage.toUpperCase() ==  "HAR"  &&
                    <WeekHolderHeadingRedd>
                    {w.Stage.toUpperCase()}
                  </WeekHolderHeadingRedd>
                      }
                         
                     
                    </WeekHolderActive>}
                    </>
                  );
                })}
              </>
              {userId?.UserId == activeDiary?.UserId && 
          <AddWeek onClick={()=>{handleAddWeek()}}>
              <AddWeekSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></AddWeekSvg>
            </AddWeek>
}
  

          
          </WeekHolderInner>

          {days.length > 0 && galleryData.length == 0 && <Helper>Select a day</Helper>}
{days.length > 0  &&
          <DayDotHolder>
            {days?.map((d, index) => {
              return (
           <DayDotInner   key={index}>
                 {activeDay !== d ? 
               <DayDotOutter
               onClick={(e) => {
                handleDay(days, d);
                
              }}
               >
                <DayDot
                
                
                ></DayDot>
                {d.Day.slice(0, 3)}
               </DayDotOutter>
                :
                <DayDotOutter
                onClick={(e) => {
                  handleDay(days, d);
                
                }}
                >
                <DayDotActive
                  key={index}
                 
                ></DayDotActive>
                {d.Day.slice(0, 3)}
               </DayDotOutter>}
           </DayDotInner>
              );
            })}
          </DayDotHolder>
          }
        </Flex3B>
     
      

        <Heading>GALLERY</Heading>

  {activeWeek &&  userId?.UserId == activeDiary?.UserId &&
  <ButtonUpload onClick={()=>{HandleImageUpload()}}>
        <SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/></SvgB>
        </ButtonUpload>
  }
       <GalleryHolderInnerMain>
    
        <GalleryHolderOutter>
        <GalleryHolderInner position={position}>
          {
            galleryData?.map((img, index) => {
              if (img?.Image !== "") {
                return (
              <GalleryImageHolderFlex>
                  <GalleryImageHolder key={index}  img={img?.Image}   onClick={() => {
                    handleLightBox(img?.Image, img);
                  }}>
                       
                    
       
                  </GalleryImageHolder>
                  <GalleryImageOverlay>
                
                
                  <div>
                    <div> Time : {img?.Time.split(":")[0]}:{img?.Time.split(":")[2]} </div>
                    <div> Date : {img?.Date} </div>
                  </div>
                
                      </GalleryImageOverlay>
              </GalleryImageHolderFlex>
                );
              }
            })
          }
       


</GalleryHolderInner>
{galleryData.length > 0 &&
            <>
            <GalleryNext onClick={()=>{HandleNext()}}>
            <SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></SvgB>
            </GalleryNext>
      <GalleryBack onClick={()=>{HandleBack()}}>
      <SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></SvgB>
      </GalleryBack>
      </>
      }
        </GalleryHolderOutter>
        {galleryData.length < 1 &&  activeDay.DayId == undefined &&
            <NoDataHolder>
                        <NoData>No Data Available</NoData>
            </NoDataHolder>
          }
              {galleryData.length < 1 &&  activeDay.DayId !== undefined &&
            <NoDataHolder>
              <NoData>
              <InfinitySpin 
  width='200'
  color="#4fa94d"
/>
              </NoData>
            </NoDataHolder>
          }
        <DotHolder>
        {galleryData?.map((v,index)=>{
          if(index == positionIndex){

          }
          return(
           
            <Dot positionIndex={positionIndex} index={index} >
           
            </Dot>
          
          )
        })}
        </DotHolder>
        </GalleryHolderInnerMain>
      </Inner>
    </Root>
   
  );
};

export default DashBoard;

// python esptool.py --chip esp32 --port COM3 --baud 921600 --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m  --flash_size detect 0x1000 bootloader.bin 0x8000 partitions_espruino.bin 0x10000 espruino_esp32.bin
