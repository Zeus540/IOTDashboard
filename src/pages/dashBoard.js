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



const Root = styled.div`
  margin-top: 50px;
  display: flex;
  padding-bottom: 50px;
  align-items: center;
  flex-direction: column;

  @media (max-width: 425px) {
    margin: 0px 10px;
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
  margin-top: 10px;
`;
const RightFlex = styled.div`
  margin-bottom: 0px;
  padding:  20px;

  width: 60%;
  @media (max-width: 425px) {
    margin-left: 0px;
    padding: 20px 20px;
    width: unset;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin-left: 0px;
    padding: 0px 20px;
    width: unset;
  }
`;
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
color:white;
padding: 0px 10px;
`
const Flex = styled.div`
  display: flex;
  padding: 0px 20px;
  @media (max-width: 425px) {
    flex-direction: column;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    flex-direction: column;
  }
`;
const FlexTop = styled.div`
  display: flex;
  padding: 0px 0px;
  background: #39595b;
  @media (max-width: 425px) {
    flex-direction: column;
    padding: 0px 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    flex-direction: column;
    padding: 0px 0px;
  }
`;


const Flex2 = styled.div`
  display: flex;

  flex-wrap: wrap;
`;
const Flex3 = styled.div`

`;
const WeekHolder = styled.div`
  width: fit-content;
  text-align: center;
  border-radius: 5px;
  margin: 10px 10px;
  min-width: 70px;
  background: #c5c5c5;
  cursor: pointer;
  opacity:0.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  background: #c5c5c5;
  cursor: pointer;
  
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
  max-width: 40%;
  border-radius: 5px;
  width: 100%;
  @media (max-width: 425px) {
    max-width: unset;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
  }
`;
const TextHolder = styled.div`
  display: flex;
  flex-direction: column;
   min-height: 195px; 

  width: 100%;

  
  border-radius: 5px;
  @media (max-width: 425px) {
    margin-left: 0px;
    width: unset;
    padding: 0px;
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
color:white;
  margin-top: 0px;
  font-size: 30px;
  margin-bottom: 0px;
`;
const DairyHeadingSmall = styled.sup`
color:white;
  margin-top: 0px;
  font-size: 16px;
  margin-bottom: 0px;
`;
const DairyHeadingSmallAccent = styled.span`
color:#a7c957;
  margin-top: 0px;
  font-size: 16px;
  margin-bottom: 0px;
`;

const TextHeading = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const TextHolderGroup2 = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: #39595b;
  padding: 15px 15px;
  line-height: 25px;
  margin: 15px;
  border-radius: 5px;
  min-width: calc(100% / 5 - 60px);
  max-width: calc(100% / 5 - 60px);
  @media (max-width: 425px) {
    min-width: calc(100% / 2 - 50px);
    padding: 10px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
  }
`;


const TextHolderGroup2Inner = styled.div`
width: 100%;

`;
const ImageMain = styled.img`
  border-radius: 5px;
  @media (max-width: 425px) {
    border-radius: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    border-radius: 0px;
  }
`;
const GalleryImage = styled.img`
border-radius:  0px 0px  5px 5px;
`;

const GalleryImageHolder = styled.div`
  min-width: calc(100% / 4 - 30px);
  margin: 0px 15px;
  border-radius: 5px;
  position: relative;
  cursor:pointer;
  @media (max-width: 425px) {
    min-width: calc(100% / 1 - 30px);
  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: calc(100% / 2 - 20px);
    min-width: calc(100% / 2 - 20px);
  }
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
background: #345153;
padding: 10px;
color: white;
z-index: 2;
opacity: 0.8;
transform: translate(0%, -50%);
transition: all 0.2s ease;
    top: 50%;
    &:hover {
      opacity: 1;
    
    }
`;

const GalleryBack = styled.div`
left: 10px;
cursor: pointer;
position: absolute;
background: #345153;
padding: 10px;
color: white;
z-index: 2;
opacity: 0.8;
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
padding: 10px 40px;

background: #f2f2f2;
border: none;
color: #39595b;
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
  background: #39595b;
  border-radius: 50%;
  margin: 0px 5px;
  cursor: pointer;
  opacity: 0.5;
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
  background: #9fb970;
  border-radius: 50%;
  margin: 0px 5px;
  cursor: pointer;
  transform: scale(1.4);
 
  animation: 0.5s ${fadeIn} ease-out;
`;

const Notes = styled.div`
  padding: 20px;
  height: 100%;
  background: #ffffff;

  border-radius: 5px;
`;
const DayDotOutter = styled.div`
  
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
 
 
`;

const TabsHolder = styled.div`
  
align-items: end;
  display: flex;
  max-width: 1770px;
  width: 100%;

`;
const TabActive = styled.div`

  cursor: pointer;
  padding: 10px 20px;
  background: #ffffff;
  border-radius: 5px 5px 0px 0px;

`;
const TabInActive = styled.div`

  cursor: pointer;
  background: #39595b;
  color: white;
  border-radius: 5px 5px 0px 0px;
  padding: 5px 20px;
  height: fit-content;

`;
const Helper = styled.p`
text-align:center
`;

const Dot = styled.div`
  background: ${props => props.index == props.positionIndex ? "#8bab50": "#39595b"};
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
  margin: 0 auto;
}
`;

const Button = styled.button`
padding: 10px 40px;
background: #39595b;
color: white;
border: none;
border-radius: 50px;
cursor: pointer;
align-self: self-start;

margin-top: 20px;

`;

const AssignButton = styled.button`
padding: 5px 20px;

width: fit-content;
border: none;
background: #8bab50;
color: #345153;
border-radius: 50px;
cursor: pointer;
font-weight: 700;
margin:0px 10px;
@media (max-width: 425px) {
  margin: 10px 10px;
  margin-top: 0px;
}
`;


const ButtonUpload = styled.button`
padding: 10px 40px;
background: #39595b;
color: white;
border: none;
border-radius: 50px;
cursor: pointer;
margin: 0px 17px;
margin-bottom : 17px;
float: right;
`;

const InnerButtonHolder = styled.div`
max-width: 1770px;
border-radius: 0px 5px 5px 5px;
width: 100%;

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

const QuickActionHeading = styled.h2`
color: #8bab50;
margin: 10px 10px;
font-weight: bold;
margin-bottom: 10px;
font-size: 18px;

`;
const QuickActionBlockFlex = styled.div`
display: flex;
flex-wrap: wrap;
`;
const CheckFlex = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
@media (max-width: 425px) {
  margin: 5px 0px;
}

`;

const QuickActionBlock = styled.button`
padding: 5px 20px;
background: white;
max-width: calc(100% / 6 - 20px);
margin:0px 10px;
border-radius: 5px;
text-align: center;
font-weight: bold;
border: none;
cursor: pointer;
@media (max-width: 425px) {
  max-width: calc(100% / 3 - 20px);
  margin-bottom:20px
}
`
const Input = styled.input`

background: transparent;
border: none;
border-bottom: 2px solid white;
padding: ${(props) => !props.assignDevice ? "0px":"5px 5px"};
width: ${(props) => !props.assignDevice ? "0px":"unset"};
color: white;
transition: 0.5s all ease;
`

;

const InputHolder = styled.div`


width: ${(props) => !props.assignDevice ? "0px":"unset"};

display: flex;

transition: 0.5s all ease;
`

;

const InputHolderSumbit = styled.button`
display: ${(props) => !props.assignDevice ? "none":"block"};
padding: 5px 20px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    border: none;
    background: #8bab50;
    color: #345153;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 700;
    margin: 0px 10px;
    transition: 0.5s all ease;
`

;
const DashBoard = () => {

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
  const [lightBoxImg, setLightBoxImg] = useState(Image);
  const [lightBoxData, setLightBoxData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [days, setDays] = useState([]);
  const [activeDiary, setActiveDiary] = useState([]);
  const [activeDiaryData, setActiveDiaryData] = useState([]);
  const [activeDiaryNotes, setActiveDiaryNotes] = useState("");
  const [activeDiaryWeeks, setActiveDiaryWeeks] = useState([]);
  const [activeWeek, setActiveWeek] = useState([]);
  const [activeDay, setActiveDay] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const { diaries } = useContext(DiaryContext);
  const params = useParams();
  const [tabList, setTabList] = useState(tabs)
  const location =useLocation()
  const [position, setPosition] = useState(0);
  const [positionIndex, setPositionIndex] = useState(0);
  const [activeToggle, setActiveToggle] = useState(false);
  const [publicToggle, setPublicToggle] = useState(false);
  const [assignDevice, setAssignDevice] = useState(false);

  const { auth,authToken,userId } = useContext(AuthContext);
  
  const navigate = useNavigate ()



  useEffect(() => {
    setPositionIndex(0)
    let filtered = diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    console.log("filtered",filtered);
    console.log("filtered",diaries);
    
    setActiveDiary(filtered);

    let data = {
      DiaryId: params?.id,
    };

    axios
      .post("https://api.sweetleaf.co.za/weeks", data)
      .then(function (response) {
        setActiveDiaryWeeks(response.data.sort((a,b) => a.Week-b.Week));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [diaries]);

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
if(activeWeek !== w){
  setGalleryData([]);
  setDiaryData('');
  let dataw = {
    WeekId:  w.WeekId,
  };

  axios
    .post("https://api.sweetleaf.co.za/days", dataw)
    .then(function (response) {
      console.log("days", response.data);
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
         console.log("response", response.data);
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
}
   
  };

  const handleDay = (days, day) => {
    setPositionIndex(0)
    if(activeDay !== day){
    setGalleryData([]);
    let preDay = day.DayId;

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
          console.log("response", response.data);
          setActiveDiaryData(response.data.latest);
          setGalleryData(response.data.Day);

          axios
            .post("https://api.sweetleaf.co.za/notes/today", data)
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
  console.log(activeDiary?.ThumbNail)
  console.log(activeDiaryData?.Image)
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



const HandleBackToPreviousPage = ()=>{
  navigate(-1)
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
    console.log("values",values);
    axios.post('https://api.sweetleaf.co.za/diaries/update/active',values,config,)
    .then(function (response) {
      if(response.data.insertId !== undefined){
      
      }
     
      console.log("response",response.data.insertId);
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
    console.log("values",values);
    axios.post('https://api.sweetleaf.co.za/diaries/update/public',values,config,)
    .then(function (response) {
      if(response.data.insertId !== undefined){
      
      }
     
      console.log("response",response.data.insertId);
    })
    .catch(function (error) {
  
      console.log(error);
    })
 

  }
  
  return (

  
    <Root>
    
  
    {lightBox && (
        <LightBox data={lightBoxData} close={setLightBox} image={lightBoxImg} />
      )}
      <InnerButtonHolder>
      <Button onClick={()=>HandleBackToPreviousPage()}>Back</Button>
      </InnerButtonHolder>
    <Tabs/>
      <Inner>
      

        <FlexTop>
          <ImgHolder>
            <ImageMain
              src={
                mainImage
              }
              width="100%"
              height="100%"
              // onClick={() => {
              //   handleLightBox(activeDiary?.ThumbNail, activeDiary);
              // }}
            />
          </ImgHolder>
      
        <RightFlex>

{userId?.UserId == activeDiary?.UserId &&

<ToggleHolder>
{activeToggle && 
<>
<AssignButton onClick={()=>{setAssignDevice(!assignDevice)}}>Assign Device +</AssignButton> 

<InputHolder assignDevice={assignDevice}>
<Input text placeholder="Enter Device Id" assignDevice={assignDevice}></Input>
<InputHolderSumbit assignDevice={assignDevice} onClick={()=>{setAssignDevice(false)}}>Sumbit</InputHolderSumbit>
</InputHolder>

</>
}

<CheckFlex>

<ToggleHolderLabel>In-Active</ToggleHolderLabel><label class="switch">
<input type="checkbox" checked={activeToggle} onChange={(e)=>{handleActiveToggle(e,activeDiary)}}/>
<span class="slider round"></span>

</label>    <ToggleHolderLabel>Active</ToggleHolderLabel>

</CheckFlex>

<CheckFlex>

<ToggleHolderLabel>Private</ToggleHolderLabel><label class="switch">
<input type="checkbox" checked={publicToggle} onChange={(e)=>{handlePublicToggle(e,activeDiary)}}/>
<span class="slider round"></span>

</label>    <ToggleHolderLabel>Public</ToggleHolderLabel>

</CheckFlex>
</ToggleHolder>
}
    


          <IntroHolder>
          <DairyHeading>{activeDiary?.Title} </DairyHeading>
          <DairyHeadingSmall><DairyHeadingSmallAccent>{activeDiary?.Days_From_Start}</DairyHeadingSmallAccent> Days old</DairyHeadingSmall>
          {/* <TextHeading>Start Date </TextHeading>
          <div>{activeDiary?.Start_Date?.split("T")[0]}</div> */}
        </IntroHolder>
          {diaryData !== "" && 
          <TextHolder>
           
           <QuickActionHeading>Quick Action</QuickActionHeading>
        
        <QuickActionBlockFlex>
        <QuickActionBlock>Water</QuickActionBlock>
           <QuickActionBlock>Trim</QuickActionBlock>
           <QuickActionBlock>Feed</QuickActionBlock>
        </QuickActionBlockFlex>

            <HeadingCta>
              <TextHolderHeading>Notes</TextHolderHeading>
              {userId?.UserId == activeDiary?.UserId && 
                  <HeadingCtaButton
                  onClick={() => {
                    handleNotes();
                  }}
                >
                  {console.log(daysNotes)}
                  {daysNotes == '' || undefined ? "Add Notes" : "Edit Notes"}
                </HeadingCtaButton>}
          
            </HeadingCta>
            <Notes>{daysNotes}</Notes>


          </TextHolder>
          }
          </RightFlex>
        </FlexTop>
        {addNotes && (
          <NotesPopUp
            setAddNotes={setAddNotes}
            setDaysNotes={setDaysNotes}
            daysNotes={daysNotes}
            diaryDatas={diaryData}
          >
            {activeDiaryNotes}
          </NotesPopUp>
        )}


<Flex3>
{days.length == 0 && <Helper>Select a Week</Helper>}


          <Heading>WEEKS</Heading>


          <WeekHolderInner>
            {activeDiaryWeeks.length > 0 ? (
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
                        
                     
                    </WeekHolderActive>}
                    </>
                  );
                })}
              </>
            ) : (
              <NoData>No Data Available</NoData>
            )}
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
        </Flex3>
     
      

        <Heading>GALLERY</Heading>

  {activeDay.DayId && userId?.UserId == activeDiary?.UserId &&
          <ButtonUpload
        
        >
        Upload Image
        </ButtonUpload>
  }
       <GalleryHolderInnerMain>
          {galleryData.length > 0 &&
            <>
            <GalleryNext onClick={()=>{HandleNext()}}>Next</GalleryNext>
      <GalleryBack onClick={()=>{HandleBack()}}>Back</GalleryBack>
      </>
      }
        <GalleryHolderInner position={position}>
          {galleryData.length > 0 ? (
            galleryData?.map((img, index) => {
              if (img?.Image !== "") {
                return (
                  <GalleryImageHolder key={index}>
                       
                    <GalleryImage
                      src={img?.Image}
                      width="100%"
               
                      onClick={() => {
                        handleLightBox(img?.Image, img);
                      }}
                    />
       
                  </GalleryImageHolder>
                );
              }
            })
          ) : (
            <NoDataHolder>
              <NoData>No Data Available</NoData>
            </NoDataHolder>
          )}
        </GalleryHolderInner>
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
