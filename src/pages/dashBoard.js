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




const Root = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 425px) {
    margin: 0px 10px;
    margin-top: 50px;
    padding-bottom: 20px;
  }
`;

const Inner = styled.div`
  box-shadow: 2px 16px 20px 4px #a9a9a966;
  max-width: 1770px;
  border-radius: 0px 10px 10px 10px;
  width: 100%;
  background: #d6d0bb;
  padding: 20px 0px;
  @media (max-width: 425px) {
    margin: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px;
  }
`;

const IntroHolder = styled.div`
  margin-bottom: 0px;
  padding: 0px 0px;
`;
const RightFlex = styled.div`
  margin-bottom: 0px;
  padding: 0px 0px;
  margin-left: 30px;
  width: 100%;
  @media (max-width: 425px) {
    margin-left: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin-left: 0px
  }
`;

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
  background: white;
  cursor: pointer;
  opacity:0.4;
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
  margin: 5px 10px;
  min-width: 70px;
  background: white;
  cursor: pointer;
  transform: scale(1.1);
  display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const WeekHolderHeading = styled.div`
  background: #459343;
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
  max-width: calc(100% / 2.5);
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
`;
const DairyHeading = styled.h3`
  margin-top: 0px;
  font-size: 30px;
  margin-bottom: 0px;
`;

const TextHeading = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #459343;
`;

const TextHolderGroup2 = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f2f2f2;
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
  margin:0px 20px;
`;
const ImageMain = styled.img`
  border-radius: 5px;
`;
const GalleryImage = styled.img`
  border-radius: 5px;
`;

const GalleryImageHolder = styled.div`
  max-width: calc(100% / 3 - 30px);
  margin: 15px;
  border-radius: 5px;
  position: relative;
  cursor:zoom-in;
  @media (max-width: 425px) {
    max-width: unset;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: calc(100% / 2 - 20px);
    min-width: calc(100% / 2 - 20px);
  }
`;

const GalleryHolderInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  @media (max-width: 425px) {
    flex-direction: column;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    flex-direction: unset;
    flex-wrap: wrap;
  }
`;

const WeekHolderInner = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap:wrap;
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
    background: #00b500;
    height: 2px;
    width: 15%;
    margin: 0px 20px;
  }
  &::after {
    content: "";
    display: block;
    background: #00b500;
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
  padding: 10px 30px;

  width: fit-content;

  border: none;
  background: #459343;
  color: white;
  border-radius: 300px;
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
  background: #459343;
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
  background: #459343;
  border-radius: 50%;
  margin: 0px 5px;
  cursor: pointer;
  transform: scale(1.4);
 
  animation: 0.5s ${fadeIn} ease-out;
`;

const Notes = styled.div`
  padding: 20px;
  height: 100%;
  background: #f2f2f2;

  border-radius: 5px;
`;
const DayDotOutter = styled.div`
  
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
 
 
`;
const GalleryImageOverlay = styled.div`
  
  cursor: pointer;

  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 40;
  color: white;
  padding: 5px 10px;
  border-radius: 5px 0px 5px;
  background: #459343;
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
  background: #d6d0bb;
  border-radius: 5px 5px 0px 0px;

`;
const TabInActive = styled.div`

  cursor: pointer;
  background: #344e41;
  color: white;
  border-radius: 5px 5px 0px 0px;
  padding: 5px 20px;
  height: fit-content;

`;
const DashBoard = () => {

  let tabs = [
    {
      tabName:'Overview',
      active:false
    },
    {
      tabName:'Stats',
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
  const { diaries } = useContext(DiaryContext);
  const params = useParams();
  const [tabList, setTabList] = useState(tabs)
  const location =useLocation()
    
  const navigate = useNavigate ()

  useEffect(() => {
    let filtered = diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];

    setActiveDiary(filtered);
  }, [diaries]);

  useEffect(() => {
    let filtered = diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];

    setActiveDiary(filtered);

    let data = {
      Diaryid: params?.id,
    };

    axios
      .post("https://api.sweetleaf.co.za/weeks", data)
      .then(function (response) {
        setActiveDiaryWeeks(response.data.sort((a,b) => a.Week-b.Week));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleLightBox = (img, data) => {
    setLightBox(!lightBox);
    setLightBoxImg(img);
    setLightBoxData(data);
  };

  const handleNotes = () => {
    setAddNotes(!addNotes);
  };

  const handelGetWeekData = (w) => {

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

  
  return (

  
    <Root>
    
    {lightBox && (
        <LightBox data={lightBoxData} close={setLightBox} image={lightBoxImg} />
      )}
      
    <Tabs/>
      <Inner>
      

        <Flex>
          <ImgHolder>
            <ImageMain
              src={
                activeDiaryData?.Image ? activeDiaryData?.Image : PlaceHolder
              }
              width="100%"
              height="100%"
           
            />
          </ImgHolder>
        
        <RightFlex>
          <IntroHolder>
                <sub>Title</sub>
          <DairyHeading>{activeDiary?.Title}</DairyHeading>
          
          {/* <TextHeading>Start Date </TextHeading>
          <div>{activeDiary?.Start_Date?.split("T")[0]}</div> */}
        </IntroHolder>
          {diaryData !== "" && 
          <TextHolder>
           
            <HeadingCta>
              <TextHolderHeading>Notes</TextHolderHeading>
              <HeadingCtaButton
                onClick={() => {
                  handleNotes();
                }}
              >
                {activeDiaryData?.Notes == "" ? "Add Notes" : "Edit Notes"}
              </HeadingCtaButton>
            </HeadingCta>
            <Notes>{daysNotes}</Notes>
          </TextHolder>
          }
          </RightFlex>
        </Flex>
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
        <Heading> Grow Conditions </Heading>
        <Flex2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Strain</TextHeading>
            {activeDiary?.Strain}
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Light Schedule</TextHeading>
            {activeDiary?.Light_Schedule}
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Light Type</TextHeading>
            {activeDiary?.Light_Type}
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <img src={IndoorIcon} width='50px'/>
          <TextHolderGroup2Inner>
            <TextHeading>Room Type</TextHeading>
            {activeDiary?.Room_Type}
          </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Pot Size</TextHeading>
            {activeDiary?.Pot_Size}
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Co2</TextHeading>
            {activeDiaryData?.Co2 == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Co2} PPM</>
            )}
                </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Moisture</TextHeading>
            {activeDiaryData?.Moisture == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Moisture} %</>
            )}
              </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Temperature</TextHeading>
            {activeDiaryData?.Temperature == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Temperature} &#8451;</>
            )}
                </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Humidity</TextHeading>
            {activeDiaryData?.Humidity == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Humidity} %</>
            )}
                  </TextHolderGroup2Inner>
          </TextHolderGroup2>
        </Flex2>

        <Flex3>
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

                    {w.Stage.toUpperCase() == "GER" ? 
                    <WeekHolderHeadingBlue>
                   {w.Stage.toUpperCase()}
                  </WeekHolderHeadingBlue>
                    :  
                    <WeekHolderHeading>
                        {w.Stage == " " ? "VEG" : w.Stage.toUpperCase()}
                      </WeekHolderHeading>
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
                      {w.Stage.toUpperCase() == "GER" ? 
                    <WeekHolderHeadingBlue>
                   {w.Stage.toUpperCase()}
                  </WeekHolderHeadingBlue>
                    :  
                    <WeekHolderHeading>
                        {w.Stage == " " ? "VEG" : w.Stage.toUpperCase()}
                      </WeekHolderHeading>
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

{days.length > 0  &&
          <DayDotHolder>
            {days.map((d, index) => {
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

        <Heading>PHOTOS</Heading>

        <GalleryHolderInner>
          {galleryData.length > 0 ? (
            galleryData?.map((img, index) => {
              if (img?.Image !== "") {
                return (
                  <GalleryImageHolder key={index}>
                    <GalleryImage
                      src={img?.Image}
                      width="100%"
                      height="100%"
                      onClick={() => {
                        handleLightBox(img?.Image, img);
                      }}
                    />
                    <GalleryImageOverlay>
                      {/* {LookUpDay(img)} */}
                      {img?.Time}
                      {/* {img?.Day} */}
                    </GalleryImageOverlay>
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
      </Inner>
    </Root>
   
  );
};

export default DashBoard;

// python esptool.py --chip esp32 --port COM3 --baud 921600 --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m  --flash_size detect 0x1000 bootloader.bin 0x8000 partitions_espruino.bin 0x10000 espruino_esp32.bin
