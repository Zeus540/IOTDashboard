import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Image from "../assets/imagesrsadere.png";
import axios from "../components/shared/axios";
import { DiaryContext } from "../context/diary_context";
import LightBox from "../components/LightBox";
import PlaceHolder from "../assets/placeholder.png";
import NotesPopUp from "../components/Notes";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth_context";
import PopUp from "../components/PopUp";
import Mainline from '../assets/mainline.svg'
import LST from '../assets/lst.svg'
import Topping from '../assets/topping.svg'
import Defoliation from '../assets/defoil.svg'
import useMediaQuery from "../components/shared/useMediaQuery";
import { InfinitySpin } from 'react-loader-spinner'
import { BASE_URL_PROD } from '../components/shared/Constants'
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSnackbar } from 'notistack';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Stats from "./stats"
import Cog from '../assets/svg/cog'
import Bin from "../assets/svg/cog copy";

ChartJS.register(ArcElement, Tooltip, Legend);


const MenuLink = styled(NavLink)`
  margin: 0px 0px;
  padding: 16px 10px;

  color: #8bab50;
  align-items: center;
  text-decoration: none;
  display: flex;
 

`;

const ChatMsgLeftMenuLink = styled(NavLink)`
  margin: 0px 0px;
  padding: 0px 0px;

  color: #8bab50;
  align-items: center;
  text-decoration: none;
  display: flex;
 

`;

const Root = styled.div`


  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;

const Inner = styled.div`

  border-radius: 5px 5px 5px 5px;

  background: #ffffff;
  padding: 20px 0px;
  padding-top:0px;
  margin: 80px auto;
  max-width: 1770px;
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
  padding: 10px 0px;
  padding-top: 0px;
  display: flex;
  justify-content: end;
  flex-direction: row-reverse;
  justify-content: space-between;



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
padding-left: 0px;
@media (max-width: 425px) {
  padding-left: 20px;
}
@media (min-width: 426px) and (max-width: 768px) {
  padding-left: 20px;
}
`;

const RightFlexHolder = styled.div`
max-width: 50%;
width: 100%;
@media (max-width: 425px) {
  margin: 0px auto;
  padding: 0px 0px;
  width: 90%;
  margin-top: -40px;
  border-radius: 5px;
  max-width: unset;
}
@media (min-width: 426px) and (max-width: 768px) {
  margin: 0px auto;
  padding: 0px 0px;
  width: 90%;
  margin-top: -40px;
  border-radius: 5px;
  max-width: unset;
}
`;

const ToggleHolder = styled.div`
display: flex;

flex-wrap: wrap;

flex-direction: row;
justify-content: end;
align-items: center;
@media (max-width: 425px) {
  flex-direction: column;
  align-items: end;

}

`;

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
// background: #596876;
color:white;

padding-bottom: 0px;
@media (max-width: 425px) {
  // background: #596876;
  color: white;

}
`;

const Flex3BtnHolder = styled.div`
justify-content: end;
padding: 0px 20px;
display: flex;
flex-wrap: wrap;
`;

const WeekHolder = styled.div`
  width: fit-content;
  text-align: center;
  border-radius: 5px;
  margin: 10px 10px;
  min-width: 70px;
  background: #f8f8ff;
  cursor: pointer;

  display: flex;
  color: #596876;
  opacity: 0.5;
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
background: #f8f8ff;
cursor: pointer;
opacity: 0.5;
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
  background: #f8f8ff;
  cursor: pointer;
  color: #596876;

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
  margin: 20px;
  border-radius: 5px;

  @media (max-width: 425px) {
    max-width: unset;
    height: 300px;

    margin: unset;
    min-height: unset;
  border-radius: unset;

  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
    height: 400px;
    border-radius: unset;
    margin: unset;
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
  color:#596876;
`;
const DairyHeading = styled.h3`
color:#596876;
  margin-top: 0px;
  font-size: 30px;
  margin-bottom: 0px;
  @media (max-width: 425px) {
    font-size: 24px;
  }
`;
const DairyHeadingTitle = styled.p`
color:#596876;
  margin-top: 0px;
  font-size: 16px;
  margin-bottom: 0px;
  @media (max-width: 425px) {
    font-size: 14px;
    padding-top: 0px;
  }
`;

const DairyHeadingTitleC = styled.p`
color:#596876;
  margin-top: 0px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 0px;
  @media (max-width: 425px) {
    font-size: 14px;
    padding-top: 0px;
  }
`;


const DairyViewsSmall = styled.sup`
display: flex;
color:  #596876;
margin-top: 0px;
font-size: 16px;

margin-bottom: 0px;
padding: 0px 15px;
padding-left: 0px;
padding-top: 0px;
height: fit-content;
border-radius: 5px;
margin-right: 10px;
@media (max-width: 425px) {
  width: calc(100% / 4 );
  margin-right: 0px;
}
`;

const DairyHeadingSmallAccent = styled.span`
color:#596876;
  margin-top: 0px;
  font-size: 16px;
  margin-bottom: 0px;
`;

const GalleryImageHolderFlex = styled.div`
display: flex;
min-width: calc(100% / 4 - 30px);

margin: 0px 15px;
border-radius: 5px;
position: relative;
cursor:pointer;


flex-direction: column;

@media (max-width: 600px) {
  min-width: calc(100% / 1 - 30px);
  
}
@media (min-width: 601px) and (max-width: 1023px) {
  max-width: calc(100% / 2 - 30px);
  min-width: calc(100% / 2 - 30px);
  margin: 0px 15px;
}

`;

const GalleryImageHolder = styled.div`

background-image: ${props => `url(${props.img})`};

border-radius: 5px 5px  0px 0px;
position: relative;
cursor:pointer;
height: 300px;
background-size: cover;
background-position: center;
`;

const GalleryImageOverlay = styled.div`
  
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
}
  top: 0;
  z-index: 40;
  color: #596876;
  padding: 10px;
  font-size: 14px;
  border-radius: 0px 0px  5px 5px;
  background: #f8f8ff;
`;

const GalleryHolderInnerMain = styled.div`
overflow:hidden;
position: relative;
width: 100%;
padding: 20px 0px;
`;

const ChartHolderInnerMain = styled.div`
overflow:hidden;
position: relative;
width: 100%;
display: flex;
justify-content: center;
max-width: 40%;
margin: 0 auto;
@media (max-width: 600px) {
  flex-direction: column;
  max-width: 70%;
}
`;
const ChartHolder = styled.div`


width: calc(100% / 2);
@media (max-width: 600px) {
  width: unset;
}
`;
const ChartHolderText = styled.div`
padding: 20px;
width: calc(100% / 2);
@media (max-width: 600px) {
  width: unset;
}

`;

const ChartTextGroup = styled.div`
display: flex;
justify-content: space-between;
`;

const ChartTextSpan = styled.span`
display: flex;
justify-content: space-between;
`;

const GalleryNext = styled.div`
right: 10px;
cursor: pointer;
position: absolute;
background: #8bab50;
padding: 10px;
color: white;
z-index: 2;

display: flex;
border-radius: 5px;
transform: translate(0%, -50%);
transition: all 0.2s ease;
    top: 50%;
    &:hover {
      opacity: 1;
    
    }
`;

const GalleryBack = styled.div`
left: 10px;
border-radius: 5px;
cursor: pointer;
position: absolute;
background: #8bab50;
padding: 10px;
color: white;
z-index: 2;

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
  @media (max-width: 600px) {
    transform: translateX(${props => props.position}%);
  }
  @media (min-width: 601px) and (max-width: 768px) {
    transform: translateX(${props => props.position}%);
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
  margin-bottom: 30px;
  margin-top: 30px;
  align-items: center;
  color: #596876;
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

const HeadingC = styled.h4`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  display: flex;
  margin-bottom: 40px;
  margin-top: 40px;
  align-items: center;
  color: #596876;
  @media (min-width: 0px) and (max-width: 768px) {
    margin-bottom: 40px;
    margin-top: 40px;
  }
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
padding: 8px 25px;
background: #8bab50;
border: none;
color: white;
border-radius: 5px;
cursor: pointer;
`;

const NoData = styled.div`
  padding: 15px 0px;
  font-size: 18px;
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
color:#596876
`;

const DayDot = styled.div`
  width: 10px;
  height: 10px;

  border-radius: 50%;
  margin: 0px 5px;
  cursor: pointer;
  opacity: 0.5;
 
  background: #f8f8ff;
  &:hover {
    opacity: 1;
 
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
  background: #f8f8ff;

  border-radius: 5px;
`;

const DayDotOutter = styled.div`
  
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
 
 
`;

const Helper = styled.p`
text-align:center;
color: #596876;
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
    border-radius: 5px;
    margin-bottom: 20px;
    cursor: pointer;

`;

const HelperBtnText = styled.p`
color: white;
padding: 5px 10px;
margin: 0;
`;

const Dot = styled.div`
  background: ${props => props.index == props.positionIndex ? "#8bab50" : "#596876"};
  border-radius: 50%;
  height: 10px;
  width: 10px;
  margin:0px 5px;
  margin-top:10px;
  opacity:${props => props.index == props.positionIndex ? "1" : "0.5"}
`;

const DotHolder = styled.div`

justify-content: center;
display: none;
@media (min-width: 0px) and (max-width: 768px) {
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin: 10px auto;
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

color: #596876;
border-radius: 5px;
cursor: pointer;


@media (max-width: 425px) {

 
}
`;

const LikeButtonText = styled.p`
margin: 0px;
padding: 0px 10px;
color: #ffffff;
padding-top: 0px;
`;

const QuickActionBlockFlex = styled.div`
display: flex;
flex-wrap: wrap;
padding-top: 15px;
`;

const QuickActionBlockIcon = styled.img`
width: 40px;
margin-right:10px;
`;

const QuickActionBlock = styled.div`
padding: 10px 20px;
background: #f8f8ff;
margin: 0px 10px;
color: #596876;
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

const DeleteDiaryHolder = styled.div`
display: flex;
justify-content: space-between;
align-items: center; 

padding-bottom: 0px;
`;

const SvgHolder = styled.div`
cursor:pointer;
margin-left:10px;
`;

const Svg = styled.svg`
width: 20px;
fill: white;
`;

const SvgV = styled.svg`
width: 20px;
fill: #596876;
margin-right: 10px;
`;

const SvgL = styled.svg`
width: 25px;
fill:white;
margin-right: 10px;
`;

const SvgVS = styled.svg`
width: 15px;
fill: #596876;
margin-right: 10px;
`;

const SvgW = styled.svg`
width: 20px;
fill: #596876;
`;

const SvgB = styled.svg`
width: 20px;
fill: white;
`;

const AddWeekSvg = styled.svg`
width: 20px;
fill: white;
`;

const FormHeadingSmall = styled.h1`
margin: 0px;
font-size: 18px;
color: #596876;
padding: 0px 0px;
padding-top: 20px;
`;

const SetImageHolder = styled.div`
position: absolute;
z-index: 50;
background: #8bab50;
color: #596876;
padding-left: 10px;
border-radius: 5px 0px 5px 0px;
display: flex;
`;

const ChatHolder = styled.div`
position: relative;
color: #596876;
min-height: 200px;
background: #e7e7e7;
// border: 1px solid #b1b1b1;
margin: 0px 20px;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: space-between;
overflow: hidden;
`;

const ChatHolderInner = styled.div`
max-height: 250px;
padding: 10px;
overflow: auto;

`;

const ChatMsgLeft = styled.div`
color: white;
width: fit-content;
margin-bottom: 10px;
`;

const ChatMsgUser = styled.div`
color: #596876;
font-size: 12px;
:hover{
  color: #8bab50;
}
`;

const ChatMsgComment = styled.p`
margin: 0px;
background: #596876;
padding: 5px 10px;
display: flex;
border-radius: 5px;
line-height: 20px;
`;

const ChatMsgCommentFlex = styled.div`
display: flex;
align-items: end;
`;

const ChatMsgTime = styled.p`
margin: 0px;
margin-left: 10px;
color: #8bab50;
font-size: 12px;
line-height: 10px;
`;

const ChatButton = styled.button`
background: #8bab50;
padding: 10px 20px;
border-radius: 0px 0px 5px 0px;
color: white;

border:none;
cursor: pointer;
`;

const ChatInputHolder = styled.div`
display: flex;
`;

const ChatInput = styled.input`
padding: 10px 20px;
border-radius: 0px 0px 0px 5px;
border: none;
width: 100%;
background: whitesmoke;
margin-bottom: 0px;
min-height:25px;
border-bottom: 0px;
border-left: 0px;
`;

const Form = styled.form`
box-shadow: 0px -6px 7px #00000012;
width: 100%;
display: flex;
`;

const ChatHidden = styled.div`
background: #f5f5f5eb;
position: absolute;
z-index: 2;
width: 100%;
height: 100%;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
font-size: 16px;
`;

const SvgLogin = styled.svg`
fill: #8bab50;
margin-right: 10px;
width: 20px;

`;

const DashBoard = (props) => {

  const { enqueueSnackbar } = useSnackbar()
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
  const [activeDiaryData, setActiveDiaryData] = useState(undefined);
  const [activeDiaryDataAll, setActiveDiaryDataAll] = useState(undefined);
  const [activeDiaryNotes, setActiveDiaryNotes] = useState("");
  const [activeDiaryWeeks, setActiveDiaryWeeks] = useState([]);
  const [activeWeek, setActiveWeek] = useState('');
  const [techniques, setTechniques] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [colourData, setColourData] = useState([]);
  const [activeDay, setActiveDay] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const { diaries, diariesPublic, Update, UpdatePublic } = useContext(DiaryContext);
  const params = useParams();
  const location = useLocation()
  const [position, setPosition] = useState(0);
  const [positionIndex, setPositionIndex] = useState(0);
  const [popUpOffset, setPopUpOffset] = useState(-101);
  const [popUpOffsetFeeding, setPopUpOffsetFeeding] = useState(-101);
  const [popUpEditWeekOffset, setPopUpEditWeekOffset] = useState(-101);
  const [popUpDeleteWeekOffset, setPopUpDeleteWeekOffset] = useState(-101);
  const [popUpDeleteDiaryOffset, setPopUpDeleteDiaryOffset] = useState(-101);
  const [popUpDiarySettingsOffset, setPopUpDiarySettingsOffset] = useState(-101);
  const [popUpAddWeekOffset, setPopUpAddWeekOffset] = useState(-101);
  const [comment, setComment] = useState('');


  const [commentAmount, setCommentAmount] = useState(0);
  const { auth, user, authToken, socket } = useContext(AuthContext);
  const navigate = useNavigate()

  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    let filtered = ""
    if (diariesPublic?.filter((d) => d.DiaryId == parseInt(params?.id))[0]) {
      filtered = diariesPublic?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    }
    if (diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0]) {
      filtered = diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    }

    setViews(filtered?.Views)
    setLikes(filtered?.Likes)

    setPositionIndex(0)
    setPosition(0)

    setActiveDiary(filtered);

     //Get Diary Weeks
    let data = {
      DiaryId: params?.id,
    };

    axios
      .post(`${BASE_URL_PROD}/weeks`, data)
      .then(function (response) {
        setActiveDiaryWeeks(response.data.sort((a, b) => a.Week - b.Week));
      })
      .catch(function (error) {
        console.log(error);
      });

    //Get Diary Comments
    axios
      .post(`${BASE_URL_PROD}/diaries/get_comments`, data)
      .then(function (response) {
        setCommentList(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });


  }, [diaries, diariesPublic])

  useEffect(() => {
    imageCheck()

  }, [activeDiary, activeDiaryData])

  
  //Chat Listen
  useEffect(() => {

    socket.off('broadcast').on('broadcast', (data) => {
      setCommentList([...commentList, data])
  
    });

    socket.off('recieved_comments_amont').on('recieved_comments_amont', (data) => {
      setCommentAmount(data)
  
    });

    socket.off('get_comments').emit('get_comments', { Diary_Id: params.id });


  })

  useEffect(() => {

    var objDiv = document.getElementById("chat");
    objDiv.scrollTop = objDiv.scrollHeight;

  }, [commentList])

  //Generate Chart Colors
  useEffect(() => {
    let colors = []
    let index = 0

    while (index < 10) {
      const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
      const randomByte = () => randomNumber(0, 255)
      const randomPercent = () => (0.8)

      colors.push(`rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`)


      index = index + 1
    }

    setColourData(colors)
  }, [])
  
  const handleLike = () => {
    if (activeDiary !== undefined) {



      let datav = {
        DiaryId: parseInt(params?.id),

      }

      axios
        .post(`${BASE_URL_PROD}/diaries/update_likes`, datav)
        .then(function (response) {
          if (diaries.length > 0) {

            Update()
          }
          else {
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

  const handleGetWeekData = (w) => {
    setPositionIndex(0)
    setPosition(0)
    setWeekId(w.WeekId)
    if (activeWeek !== w) {
      setGalleryData([]);
      setDiaryData('');

      let dataw = {
        WeekId: w.WeekId,
      };


      axios
        .post(`${BASE_URL_PROD}/techniques/by_week_id`, dataw)
        .then(function (response) {
  
          setTechniques(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .post(`${BASE_URL_PROD}/days`, dataw)
        .then(function (response) {

          setDays(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    
      setActiveWeek(w)

 

      let nutrientData = {
        DiaryId: activeDiary.DiaryId,
        WeekId: w.WeekId
      }
      axios
        .post(`${BASE_URL_PROD}/nutrients/feeding_schedule`, nutrientData)
        .then(function (response) {

          setScheduleData(response.data)


        })
        .catch(function (error) {
          console.log(error);
        });
    }

  };

  const UpdateTech = (data) => {
    axios
      .post(`${BASE_URL_PROD}/techniques/by_week_id`, data)
      .then(function (response) {

        setTechniques(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleGetDayData = (days, day) => {
    setPositionIndex(0)
    setPosition(0)
    if (activeDay !== day) {

      setGalleryData([]);
      let preDay = day.DayId;
      setDayId(day.DayId)

      if (day.DayId == preDay) {
        let data = {
          DiaryId: params?.id,
          DayId: day.DayId,
          WeekId: day.WeekId,
        };

        setDiaryData(data);

        axios
          .post(`${BASE_URL_PROD}/plant_data/lastest`, data)
          .then(function (response) {

            setActiveDiaryData(response.data.latest);
            setActiveDiaryDataAll(response.data);
            setGalleryData(response.data.Day);

            axios
              .post(`${BASE_URL_PROD}/notes/today`, data)
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

  const imageCheck = () => {
    if (activeDiary?.ThumbNail !== undefined) {
      setMainImage(activeDiary?.ThumbNail)
    }
    if (activeDiaryData?.Image !== undefined) {
      setMainImage(activeDiaryData?.Image)
    }
    if (activeDiaryData?.Image == undefined && activeDiary?.ThumbNail == (undefined || "")) {
      setMainImage(PlaceHolder)
    }
  }



  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(min-width: 601px) and (max-width: 1023px)');
  const isLaptop = useMediaQuery('(min-width: 601px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');


  const HandleNext = () => {

    if (isMobile) {

      if (positionIndex < galleryData.length - 1) {

        setPosition(position - 100)
        setPositionIndex(positionIndex + 1)
      }

      if (positionIndex === galleryData.length - 1) {
        setPosition(0)
        setPositionIndex(0)
      }
    }

    if (isTablet) {

      if (positionIndex < galleryData.length - 2) {

        setPosition(position - (100 / 2))
        setPositionIndex(positionIndex + 1)
      }

      if (positionIndex === galleryData.length - 2) {
        setPosition(0)
        setPositionIndex(0)
      }
    }

    if (isDesktop) {

      if (positionIndex < galleryData.length - 4) {

        setPosition(position - (100 / 4))
        setPositionIndex(positionIndex + 1)
      }
      if (positionIndex === galleryData.length - 4) {
        setPosition(0)
        setPositionIndex(0)
      }
    }

  }

  const HandleBack = () => {

    if (position < 0) {

      if (isMobile) {
        setPosition(position + 100)
        setPositionIndex(positionIndex - 1)
      }

      if (isTablet) {
        setPosition(position + (100 / 2))
        setPositionIndex(positionIndex - 1)
      }

      if (isDesktop) {
        setPosition(position + 25)
        setPositionIndex(positionIndex - 1)
      }

    }

  }



  const HandleFeedingUpload = () => {
    if (popUpOffsetFeeding == -101) {
      setPopUpOffsetFeeding(0);
    } else {
      setPopUpOffsetFeeding(-101);
    }
  }


  const HandleImageUpload = () => {
    if (popUpOffset == -101) {
      setPopUpOffset(0);
    } else {
      setPopUpOffset(-101);
    }
  }

  const handleAddWeek = () => {
    if (popUpAddWeekOffset == -101) {
      setPopUpAddWeekOffset(0);
    } else {
      setPopUpAddWeekOffset(-101);
    }
  }

  const handleEditWeek = () => {
    if (popUpEditWeekOffset == -101) {
      setPopUpEditWeekOffset(0);
    } else {
      setPopUpEditWeekOffset(-101);
    }
  }

  const handleDeleteWeek = () => {
    if (popUpEditWeekOffset == -101) {
      setPopUpDeleteWeekOffset(0);
    } else {
      setPopUpDeleteWeekOffset(-101);
    }
  }


  const handleDeleteDiary = () => {
    if (popUpDeleteDiaryOffset == -101) {
      setPopUpDeleteDiaryOffset(0);
    } else {
      setPopUpDeleteDiaryOffset(-101);
    }
  }

  const handleDiarySettings = () => {
    if (popUpDiarySettingsOffset == -101) {
      setPopUpDiarySettingsOffset(0);
    } else {
      setPopUpDiarySettingsOffset(-101);
    }
  }

  const handleThumbnailUpdate = (DiaryId, Image) => {

    let data = {
      DiaryId: DiaryId,
      Image: Image
    }

    axios
      .post(`${BASE_URL_PROD}/diaries/update_thumbnail`, data)
      .then(function (response) {
        if (response.status == 200) {
          enqueueSnackbar("Cover Successfully Updated", { variant: 'success' })
        } else {
          enqueueSnackbar(response.status, { variant: 'error' })
        }


      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const HandleComment = (e) => {

    setComment(e.target.value)

  }


  const SendComment = (e) => {
    e.preventDefault()

    var d = new Date();

    let time = d.toString().split(" ")[4]
    let tz = d.toString().split(" ")[5]


    setComment("")
    if (comment !== "") {
      if (user?.UserId !== undefined) {

        socket.off('comment').emit('comment', { Sender_Id: user?.UserId, Diary_Id: activeDiary?.DiaryId, Comment: comment, Time: time, TimeZone: tz });
        setComment("")

      }
    }


  }


  const handleUserProfile = (activeDiary) => {
    if (auth) {
      navigate(`/profile/${activeDiary?.UserName}/${activeDiary?.UserId}`)
    }
  }



  const data = {

    labels: scheduleData.map((l) => l.Nutrient_Name),
    datasets: [
      {
        label: ['ml', 'ml'],
        data: scheduleData.map((l) => l.Nutrient_Amount),
        backgroundColor: colourData.map((l) => l),

        borderWidth: 0,
      },
    ],

  };


  return (


    <Root>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Sweet Leaf - ${activeDiary?.Title}`}</title>
        <meta name="description" content={`Sweet Leaf - ${activeDiary?.Title}.${activeDiary?.Strain} "Grow by" ${activeDiary?.UserName}}`} />
        <link rel="canonical" href={`https://sweetleaf.co.za/overview/${activeDiary?.DiaryId}`} />
      </Helmet>


      <PopUp popUpOffset={popUpOffsetFeeding} setPopUpOffset={setPopUpOffsetFeeding} type="uploadFeeding" DiaryId={activeDiary?.DiaryId} WeekId={weekId} DayId={dayId} update={Update} />

      <PopUp popUpOffset={popUpOffset} setPopUpOffset={setPopUpOffset} type="uploadImage" DiaryId={activeDiary?.DiaryId} WeekId={weekId} DayId={dayId} update={Update} />



      <PopUp popUpOffset={popUpAddWeekOffset} setPopUpOffset={setPopUpAddWeekOffset} type="addWeek" DiaryId={activeDiary?.DiaryId} />



      <PopUp popUpOffset={popUpEditWeekOffset} setPopUpOffset={setPopUpEditWeekOffset} type="editWeek" DiaryId={activeDiary?.DiaryId} week={activeWeek} updateTech={UpdateTech} />



      <PopUp popUpOffset={popUpDeleteWeekOffset} setPopUpOffset={setPopUpDeleteWeekOffset} type="deleteWeek" DiaryId={activeDiary?.DiaryId} week={activeWeek} setDays={setDays} setGalleryData={setGalleryData} />



      <PopUp popUpOffset={popUpDeleteDiaryOffset} setPopUpOffset={setPopUpDeleteDiaryOffset} type="deleteDiary" Diary={activeDiary} week={activeWeek} />

      <PopUp popUpOffset={popUpDiarySettingsOffset} setPopUpOffset={setPopUpDiarySettingsOffset} type="diarySettings" Diary={activeDiary} />


      {lightBox && (
        <LightBox data={lightBoxData} close={setLightBox} image={lightBoxImg} />
      )}


      <Inner>


        <FlexTop>
          <ImgHolder img={mainImage} onClick={() => { handleLightBox(mainImage) }}>

          </ImgHolder>

          <RightFlexHolder>
            <RightFlex>

              <RightFlexInner>


                {user?.UserId == activeDiary?.UserId &&
                  <ToggleHolder>


                    <DeleteDiaryHolder>


                      <>
                        <SvgHolder onClick={() => { handleDiarySettings() }}>
                          <Cog fill="#596876" />
                        </SvgHolder>

                        <SvgHolder onClick={() => { handleDeleteDiary() }}>
                          <Bin fill="#f44336" />
                        </SvgHolder>
                      </>

                    </DeleteDiaryHolder>

                  </ToggleHolder>

                }
                {user?.UserId !== activeDiary?.UserId &&
                  <IntroHolderDay>

                    <LikeButton onClick={() => { handleLike() }}>
                      <SvgL xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 191.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V223.1C128 206.3 113.7 191.1 96 191.1zM512 227c0-36.89-30.05-66.92-66.97-66.92h-99.86C354.7 135.1 360 113.5 360 100.8c0-33.8-26.2-68.78-70.06-68.78c-46.61 0-59.36 32.44-69.61 58.5c-31.66 80.5-60.33 66.39-60.33 93.47c0 12.84 10.36 23.99 24.02 23.99c5.256 0 10.55-1.721 14.97-5.26c76.76-61.37 57.97-122.7 90.95-122.7c16.08 0 22.06 12.75 22.06 20.79c0 7.404-7.594 39.55-25.55 71.59c-2.046 3.646-3.066 7.686-3.066 11.72c0 13.92 11.43 23.1 24 23.1h137.6C455.5 208.1 464 216.6 464 227c0 9.809-7.766 18.03-17.67 18.71c-12.66 .8593-22.36 11.4-22.36 23.94c0 15.47 11.39 15.95 11.39 28.91c0 25.37-35.03 12.34-35.03 42.15c0 11.22 6.392 13.03 6.392 22.25c0 22.66-29.77 13.76-29.77 40.64c0 4.515 1.11 5.961 1.11 9.456c0 10.45-8.516 18.95-18.97 18.95h-52.53c-25.62 0-51.02-8.466-71.5-23.81l-36.66-27.51c-4.315-3.245-9.37-4.811-14.38-4.811c-13.85 0-24.03 11.38-24.03 24.04c0 7.287 3.312 14.42 9.596 19.13l36.67 27.52C235 468.1 270.6 480 306.6 480h52.53c35.33 0 64.36-27.49 66.8-62.2c17.77-12.23 28.83-32.51 28.83-54.83c0-3.046-.2187-6.107-.6406-9.122c17.84-12.15 29.28-32.58 29.28-55.28c0-5.311-.6406-10.54-1.875-15.64C499.9 270.1 512 250.2 512 227z" /></SvgL><LikeButtonText>Like</LikeButtonText>
                    </LikeButton>

                  </IntroHolderDay>
                }

                <IntroHolderDay>
                  <Flex>
                    <DairyViewsSmall><SvgVS xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 248H128V192H48V248zM48 296V360H128V296H48zM176 296V360H272V296H176zM320 296V360H400V296H320zM400 192H320V248H400V192zM400 408H320V464H384C392.8 464 400 456.8 400 448V408zM272 408H176V464H272V408zM128 408H48V448C48 456.8 55.16 464 64 464H128V408zM272 192H176V248H272V192z" /></SvgVS> <DairyHeadingSmallAccent>{activeDiary?.Days_From_Start}</DairyHeadingSmallAccent> </DairyViewsSmall>
                    <DairyViewsSmall><SvgV xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z" /></SvgV><DairyHeadingSmallAccent>{views}</DairyHeadingSmallAccent> </DairyViewsSmall>
                    <DairyViewsSmall><SvgV xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M96 191.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V223.1C128 206.3 113.7 191.1 96 191.1zM512 227c0-36.89-30.05-66.92-66.97-66.92h-99.86C354.7 135.1 360 113.5 360 100.8c0-33.8-26.2-68.78-70.06-68.78c-46.61 0-59.36 32.44-69.61 58.5c-31.66 80.5-60.33 66.39-60.33 93.47c0 12.84 10.36 23.99 24.02 23.99c5.256 0 10.55-1.721 14.97-5.26c76.76-61.37 57.97-122.7 90.95-122.7c16.08 0 22.06 12.75 22.06 20.79c0 7.404-7.594 39.55-25.55 71.59c-2.046 3.646-3.066 7.686-3.066 11.72c0 13.92 11.43 23.1 24 23.1h137.6C455.5 208.1 464 216.6 464 227c0 9.809-7.766 18.03-17.67 18.71c-12.66 .8593-22.36 11.4-22.36 23.94c0 15.47 11.39 15.95 11.39 28.91c0 25.37-35.03 12.34-35.03 42.15c0 11.22 6.392 13.03 6.392 22.25c0 22.66-29.77 13.76-29.77 40.64c0 4.515 1.11 5.961 1.11 9.456c0 10.45-8.516 18.95-18.97 18.95h-52.53c-25.62 0-51.02-8.466-71.5-23.81l-36.66-27.51c-4.315-3.245-9.37-4.811-14.38-4.811c-13.85 0-24.03 11.38-24.03 24.04c0 7.287 3.312 14.42 9.596 19.13l36.67 27.52C235 468.1 270.6 480 306.6 480h52.53c35.33 0 64.36-27.49 66.8-62.2c17.77-12.23 28.83-32.51 28.83-54.83c0-3.046-.2187-6.107-.6406-9.122c17.84-12.15 29.28-32.58 29.28-55.28c0-5.311-.6406-10.54-1.875-15.64C499.9 270.1 512 250.2 512 227z" /></SvgV><DairyHeadingSmallAccent>{likes}</DairyHeadingSmallAccent></DairyViewsSmall>
                    <DairyViewsSmall><SvgV xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" /></SvgV><DairyHeadingSmallAccent>{commentAmount}</DairyHeadingSmallAccent></DairyViewsSmall>
                  </Flex>
                </IntroHolderDay>

                <IntroHolder>
                  <div>

                    <DairyHeading>{activeDiary?.Title} </DairyHeading>

                    <DairyHeadingTitleC onClick={() => { handleUserProfile(activeDiary) }}>{activeDiary?.UserName}</DairyHeadingTitleC>
                    <DairyHeadingTitle>Strain : {activeDiary?.Strain}</DairyHeadingTitle>
                    {console.log("activeDiary?.Strain", activeDiary?.Strain)}
                  </div>

                  {/* <TextHeading>Start Date </TextHeading>
          <div>{activeDiary?.Start_Date?.split("T")[0]}</div> */}
                </IntroHolder>
                
                {techniques.length > 0 &&
                  <TextHolder>
                    <FormHeadingSmall>Grow Techniques</FormHeadingSmall>
                    <QuickActionBlockFlex>

                      {techniques?.map((t, index) => {
                        return (

                          <QuickActionBlock key={index}>
                            {t?.Technique_Name == "Main-Lining" &&
                              <> <QuickActionBlockIcon src={Mainline} />{t?.Technique_Name}</>
                            }
                            {t?.Technique_Name == "Topping" &&
                              <> <QuickActionBlockIcon src={Topping} />{t?.Technique_Name}</>
                            }
                            {t?.Technique_Name == "LST" &&
                              <> <QuickActionBlockIcon src={LST} />{t?.Technique_Name}</>
                            }
                            {t?.Technique_Name == "HST" &&
                              <> <QuickActionBlockIcon src={Topping} />{t?.Technique_Name}</>
                            }
                            {t?.Technique_Name == "Defoliation" &&
                              <> <QuickActionBlockIcon src={Defoliation} />{t?.Technique_Name}</>
                            }
                            {t?.Technique_Name == "Feeding" &&
                              <> <QuickActionBlockIcon src={Topping} />{t?.Technique_Name}</>
                            }
                          </QuickActionBlock>

                        )
                      })}

                    </QuickActionBlockFlex>

                  </TextHolder>
                }


                {dayId !== null &&
                  <TextHolder>

                    <HeadingCta>
                      <TextHolderHeading>Notes</TextHolderHeading>
                      {user?.UserId == activeDiary?.UserId &&
                        <HeadingCtaButton
                          onClick={() => {
                            handleNotes();
                          }}
                        >

                          {daysNotes?.Notes == '' || undefined ? "Add Notes" : "Edit Notes"}
                        </HeadingCtaButton>}

                    </HeadingCta>

                    <Notes>{daysNotes?.Notes}</Notes>


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


        <Stats dayId={dayId} data={activeDiaryData} dataAll={activeDiaryDataAll?.Day} />

        <Flex3B>




          <Heading>WEEKS</Heading>
          {user?.UserId == activeDiary?.UserId &&
            <Flex3BtnHolder>





              {activeWeek && user?.UserId == activeDiary?.UserId &&
                <HelperBtnHolder onClick={() => { HandleImageUpload() }}>
                  <HelperBtn >
                    <SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z" /></SvgB>
                    <HelperBtnText>Upload Data</HelperBtnText>

                  </HelperBtn>
                </HelperBtnHolder>
              }

              {activeWeek && user?.UserId == activeDiary?.UserId &&
                <HelperBtnHolder onClick={() => { HandleFeedingUpload() }}>
                  <HelperBtn >
                    <SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z" /></SvgB>
                    <HelperBtnText>Nutrients</HelperBtnText>

                  </HelperBtn>
                </HelperBtnHolder>
              }

              {activeWeek !== "" && <HelperBtnHolder onClick={() => { handleEditWeek() }}>
                <HelperBtn >
                  <SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z" /></SvgB>
                  <HelperBtnText>Edit Week</HelperBtnText></HelperBtn></HelperBtnHolder>}

              {activeWeek !== "" && <HelperBtnHolder onClick={() => { handleDeleteWeek() }}><HelperBtn>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" /></Svg>
                <HelperBtnText>  Delete Week</HelperBtnText></HelperBtn></HelperBtnHolder>}




            </Flex3BtnHolder>
          }
          {activeWeek.WeekId == undefined && <Helper>Please Select a Week</Helper>}

          <WeekHolderInner>
            <>
              {activeDiaryWeeks.map((w, index) => {
                return (
                  <div key={index}>
                    {activeWeek !== w ?
                      <WeekHolder
                        onClick={() => {
                          handleGetWeekData(w);
                        }}
                      >
                        <WeekHolderText>

                          <WeekHolderTextSub>Week</WeekHolderTextSub>
                          <div>{w.Week}</div>
                        </WeekHolderText>

                        {w.Stage.toUpperCase() == "GER" &&
                          <WeekHolderHeadingBlue>
                            {w.Stage.toUpperCase()}
                          </WeekHolderHeadingBlue>
                        }

                        {w.Stage.toUpperCase() == "VEG" &&
                          <WeekHolderHeading>
                            {w.Stage.toUpperCase()}
                          </WeekHolderHeading>
                        }

                        {w.Stage.toUpperCase() == "FLO" &&
                          <WeekHolderHeadingRed>
                            {w.Stage.toUpperCase()}
                          </WeekHolderHeadingRed>
                        }

                        {w.Stage.toUpperCase() == "HAR" &&
                          <WeekHolderHeadingRedd>
                            {w.Stage.toUpperCase()}
                          </WeekHolderHeadingRedd>
                        }

                      </WeekHolder> :
                      <WeekHolderActive
                        onClick={() => {
                          handleGetWeekData(w);
                        }}

                      >
                        <WeekHolderText>

                          <WeekHolderTextSub>Week</WeekHolderTextSub>
                          <div>{w.Week}</div>
                        </WeekHolderText>

                        {w.Stage.toUpperCase() == "GER" &&
                          <WeekHolderHeadingBlue>
                            {w.Stage.toUpperCase()}
                          </WeekHolderHeadingBlue>
                        }

                        {w.Stage.toUpperCase() == "VEG" &&
                          <WeekHolderHeading>
                            {w.Stage.toUpperCase()}
                          </WeekHolderHeading>
                        }

                        {w.Stage.toUpperCase() == "FLO" &&
                          <WeekHolderHeadingRed>
                            {w.Stage.toUpperCase()}
                          </WeekHolderHeadingRed>
                        }
                        {w.Stage.toUpperCase() == "HAR" &&
                          <WeekHolderHeadingRedd>
                            {w.Stage.toUpperCase()}
                          </WeekHolderHeadingRedd>
                        }


                      </WeekHolderActive>}
                  </div>
                );
              })}
            </>

            {user?.UserId == activeDiary?.UserId &&
              <AddWeek onClick={() => { handleAddWeek() }}>
                <AddWeekSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></AddWeekSvg>
              </AddWeek>
            }

          </WeekHolderInner>

          {days.length > 0 && galleryData.length == 0 && <Helper>Please Select a Day</Helper>}
          {days.length > 0 &&
            <DayDotHolder>
              {days?.map((d, index) => {
                return (
                  <DayDotInner key={index}>
                    {activeDay !== d ?
                      <DayDotOutter
                        onClick={(e) => {
                          handleGetDayData(days, d);

                        }}
                      >
                        <DayDot


                        ></DayDot>
                        {d.Day.slice(0, 3)}
                      </DayDotOutter>
                      :
                      <DayDotOutter
                        onClick={(e) => {
                          handleGetDayData(days, d);

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


        <GalleryHolderInnerMain>

          <GalleryHolderOutter>
            <GalleryHolderInner position={position}>
              {
                galleryData?.map((img, index) => {
                  if (img?.Image !== "") {
                    return (
                      <>

                        <GalleryImageHolderFlex key={index} >
                          {activeDiary.UserId == user?.UserId &&
                            <SetImageHolder onClick={() => { handleThumbnailUpdate(img.DiaryId, img?.Image) }}>
                              <SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M45.6 32C20.4 32 0 52.4 0 77.6V434.4C0 459.6 20.4 480 45.6 480c5.1 0 10-.8 14.7-2.4C74.6 472.8 177.6 440 320 440s245.4 32.8 259.6 37.6c4.7 1.6 9.7 2.4 14.7 2.4c25.2 0 45.6-20.4 45.6-45.6V77.6C640 52.4 619.6 32 594.4 32c-5 0-10 .8-14.7 2.4C565.4 39.2 462.4 72 320 72S74.6 39.2 60.4 34.4C55.6 32.8 50.7 32 45.6 32zM160 160c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zm208 0c7.9 0 15.4 3.9 19.8 10.5L512.3 353c5.4 8 5.6 18.4 .4 26.5s-14.7 12.3-24.2 10.7C442.7 382.4 385.2 376 320 376c-65.6 0-123.4 6.5-169.3 14.4c-9.8 1.7-19.7-2.9-24.7-11.5s-4.3-19.4 1.9-27.2L197.3 265c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l26.4 33.1 87-127.6c4.5-6.6 11.9-10.5 19.8-10.5z" /></SvgB>   <HelperBtnText>Set Cover</HelperBtnText>
                            </SetImageHolder>
                          }
                          <GalleryImageHolder img={img?.Image} onClick={() => {
                            handleLightBox(img?.Image, img);
                          }}>



                          </GalleryImageHolder>
                          <GalleryImageOverlay>



                            <div> Time : {img?.Time.split(":")[0]}:{img?.Time.split(":")[2]} </div>
                            <div> Date : {img?.Date} </div>


                          </GalleryImageOverlay>
                        </GalleryImageHolderFlex>
                      </>
                    );
                  }
                })
              }



            </GalleryHolderInner>
            {galleryData.length > 0 &&
              <>
                <GalleryNext onClick={() => { HandleNext() }}>
                  <SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></SvgB>
                </GalleryNext>
                <GalleryBack onClick={() => { HandleBack() }}>
                  <SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></SvgB>
                </GalleryBack>
              </>
            }
          </GalleryHolderOutter>
          {galleryData.length < 1 &&
            <NoDataHolder>
              <NoData>No Data Available</NoData>
            </NoDataHolder>
          }

          <DotHolder>
            {galleryData?.map((v, index) => {
              if (index == positionIndex) {

              }
              return (

                <Dot positionIndex={positionIndex} index={index} >

                </Dot>

              )
            })}
          </DotHolder>
        </GalleryHolderInnerMain>




        <Heading>NUTRIENTS</Heading>

        {scheduleData.length > 0 ?
          <ChartHolderInnerMain>
            <ChartHolder>
              <Doughnut data={data} updateMode="resize" />
            </ChartHolder>
            <ChartHolderText>

              {scheduleData.map((d) => {
                return (
                  <ChartTextGroup><ChartTextSpan>{d?.Nutrient_Name}</ChartTextSpan> <ChartTextSpan>{d?.Nutrient_Amount}ml/L</ChartTextSpan></ChartTextGroup>
                )
              })}

            </ChartHolderText>
          </ChartHolderInnerMain> :
          <NoDataHolder>
            <NoData>No Data Available</NoData>
          </NoDataHolder>
        }

        <HeadingC>COMMENTS</HeadingC>

        <ChatHolder>

          {!user && <ChatHidden>
            <MenuLink to="/sign-in" state={location.pathname}> <SvgLogin xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></SvgLogin>Sign In</MenuLink> To Comment
          </ChatHidden>}

          <ChatHolderInner className="chat" id="chat">
            {commentList?.map((c, index) => {

              return (

                <ChatMsgLeft key={index}>
                  <ChatMsgLeftMenuLink to={`/profile/${c.Sender_Name}/${c.Sender_Id}`} state={location.pathname}>
                    <ChatMsgUser>
                      {c.Sender_Name}
                    </ChatMsgUser>
                  </ChatMsgLeftMenuLink>
                  <ChatMsgCommentFlex>
                    <ChatMsgComment>
                      {c.Comment}

                    </ChatMsgComment>
                    <ChatMsgTime>{c.Time.split(":")[0] + ":" + c.Time.split(":")[2]}</ChatMsgTime>
                  </ChatMsgCommentFlex>
                </ChatMsgLeft>

              )

            })}
          </ChatHolderInner>

          <ChatInputHolder>


            <Form >
              <ChatInput value={comment} onChange={(e) => { HandleComment(e) }} placeholder="Comment Here......." />

              <ChatButton onClick={(e) => { SendComment(e) }}>
                <SvgB xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" /></SvgB>
              </ChatButton>
            </Form>
          </ChatInputHolder>
        </ChatHolder>
      </Inner>
    </Root>

  );
};

export default DashBoard;

// python esptool.py --chip esp32 --port COM3 --baud 921600 --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m  --flash_size detect 0x1000 bootloader.bin 0x8000 partitions_espruino.bin 0x10000 espruino_esp32.bin
