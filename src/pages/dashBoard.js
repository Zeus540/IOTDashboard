import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Image from "../assets/imagesrsadere.png";
import Image2 from "../assets/imagesrsaderes.png";
import Image3 from "../assets/seedling.jpg";
import axios from "axios";
import { DiaryContext } from "../context/diary_context";
import LightBox from "../components/LightBox";
import PlaceHolder from "../assets/placeholder.png";

const Root = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  @media (max-width: 425px) {
    margin-top: 20px;
  }
`;

const Inner = styled.div`
  box-shadow: 2px 2px 20px 4px #a9a9a966;
  max-width: 1770px;
  border-radius: 10px;
  width: 100%;
  background: #d6d0bb;
  padding: 20px 0px;
  @media (max-width: 425px) {
    margin: 16px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 16px;
  }
`;

const IntroHolder = styled.div`
  margin-bottom: 20px;
  padding: 0px 20px;
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
const Flex3 = styled.div``;
const WeekHolder = styled.div`
 
  width: fit-content;
  text-align: center;
  border-radius: 5px;
  margin: 5px;
  min-width: 70px;
  background: white;
  cursor:pointer;
`;
const WeekHolderHeading = styled.div`
  background: #459343;
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
  max-width: calc(100% / 3);
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

  width: 100%;

  margin-left: 30px;
  border-radius: 10px;
  @media (max-width: 425px) {
    margin-left: 0px;
    width: unset;
    padding: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin-left: 0px;
    width: unset;
    padding: 0px;
  }
`;
const Notes = styled.div`
  padding: 20px;
  height: 100%;
  background: #f2f2f2;

  border-radius: 10px;
`;

const TextHolderHeading = styled.h3`
  margin-bottom: 0px;
`;
const DairyHeading = styled.h3`
  margin-top: 0px;
  font-size: 30px;
  margin-bottom: 10px;
`;

const TextHeading = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #459343;
`;

const TextHolderGroup2 = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f2f2f2;
  padding: 15px 15px;
  line-height: 25px;
  margin: 15px;
  border-radius: 10px;
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

const ImageMain = styled.img`
  border-radius: 10px;
`;
const GalleryImage = styled.img`
  border-radius: 10px;
`;

const GalleryImageHolder = styled.div`
  max-width: calc(100% / 3 - 30px);
  margin: 15px;
  border-radius: 10px;
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

const NotesHolder = styled.div`
  padding: 20px;
  background: #0000008f;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotesInner = styled.div`
  max-height: 100vh;
  width: 20%;
  padding-top: 20px;
  @media (max-width: 425px) {
    width: 80%;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    width: 50%;
  }
`;

const NotesInnerClose = styled.div`
  background: #459343;
  color: white;
  padding: 10px 15px;
  display: flex;
  border-radius: 10px 10px 0px 0px;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
`;

const NotesClose = styled.div`
  font-size: 22px;
  color: #bc4749;
  font-weight: bold;
`;

const WeekHolderInner = styled.div`
  display: flex;
  justify-content: center;
`;

const Heading = styled.h4`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  display: flex;
  margin-bottom: 20px;
  margin-top: 40px;
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
`;

const HeadingCtaButton = styled.button`
  padding: 10px 30px;

  width: fit-content;

  border: none;
  background: #459343;
  color: white;
  border-radius: 300px;
`;

const TextBox = styled.textarea`
  padding: 15px 0px;
  width: calc(100% - 1px);
  height: 100%;
  min-height: 200px;
  min-width: calc(100% - 1px);
  display: block;
  border-radius: 0px 0px 10px 10px;
  outline: none;
  border: none;
  background: #f2f2f2;
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

const DayDot = styled.div`
  width: 10px;
  height: 10px;
  background: #459343;
  border-radius: 50%;
  margin: 0px 5px;
  cursor:pointer;
`;

const DashBoard = () => {
  const [lightBox, setLightBox] = useState(false);
  const [addNotes, setAddNotes] = useState(false);

  const [lightBoxImg, setLightBoxImg] = useState(Image);
  const [lightBoxData, setLightBoxData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [days, setDays] = useState([]);

  const [activeDiary, setActiveDiary] = useState([]);
  
  const [activeDiaryData, setActiveDiaryData] = useState([]);
  const [activeDiaryDataFull, setActiveDiaryDataFull] = useState([]);
  const [activeDiaryNotes, setActiveDiaryNotes] = useState("");
  const [activeDiaryWeeks, setActiveDiaryWeeks] = useState([]);
  const [activeDiaryDay, setActiveDiaryDay] = useState(false);
  const { diaries } = useContext(DiaryContext);
  const params = useParams();

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
        setActiveDiaryWeeks(response.data);
        let CurrentWeek = response.data[0].WeekId

        let data = {
          WeekId: CurrentWeek,
        };

        axios
        .post("https://api.sweetleaf.co.za/days", data)
        .then(function (response) {
          console.log("days",response.data);
          setDays(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
        
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

  const handleDay =(days,day)=>{

    let preDay = day.DayId
    
   
    if(day.DayId == preDay){
      console.log(day.DayId);
      let data = {
        DiaryId: params?.id,
        DayId: day.DayId,
        WeekId: day.WeekId,
      }
  
      axios
      .post("https://api.sweetleaf.co.za/plant_data/lastest", data)
      .then(function (response) {
        console.log("response",response.data);
        setActiveDiaryData(response.data.latest)
        setGalleryData(response.data.Day)
      })
      .catch(function (error) {
        console.log(error);
      });
      preDay = ""
      day.active = true
    }
   

  }

  return (
    <Root>
      {lightBox && (
        <LightBox data={lightBoxData} close={setLightBox} image={lightBoxImg} />
      )}

      {addNotes && (
        <NotesHolder>
          <NotesInner>
            <NotesInnerClose>
              <div>{activeDiaryNotes == "" ? "Add Notes" : "Edit Notes"}</div>
              <NotesClose
                onClick={() => {
                  setAddNotes(false);
                }}
              >
                {" "}
                X
              </NotesClose>
            </NotesInnerClose>
            <div>
              <TextBox
                value={activeDiaryNotes}
                width="100%"
                onChange={(e) => {
                  setActiveDiaryNotes(e.target.value);
                }}
              ></TextBox>
            </div>
          </NotesInner>
        </NotesHolder>
      )}

      <Inner>

        <IntroHolder>
          <DairyHeading>{activeDiary?.Title}</DairyHeading>
          <TextHeading>Start Date </TextHeading>
          <div>{activeDiary?.Start_Date?.split("T")[0]}</div>
        </IntroHolder>

        <Flex>
          <ImgHolder>
            <ImageMain
              src={
                activeDiaryData?.Image
                  ? activeDiaryData?.Image
                  : PlaceHolder
              }
              width="100%"
              height="100%"
              onClick={() => {
                handleLightBox(
                  activeDiaryData?.Image,
                  activeDiaryData
                );
              }}
            />
          </ImgHolder>
          <TextHolder>
            <HeadingCta>
              <TextHolderHeading>Notes</TextHolderHeading>
              <HeadingCtaButton
                onClick={() => {
                  handleNotes();
                }}
              >
                {activeDiaryData?.Notes == ""
                  ? "Add Notes"
                  : "Edit Notes"}
              </HeadingCtaButton>
            </HeadingCta>
            <Notes>{activeDiaryNotes}</Notes>
          </TextHolder>
        </Flex>

        <Heading> Grow Conditions </Heading>
        <Flex2>
          <TextHolderGroup2>
            <TextHeading>Strain</TextHeading>
            {activeDiary?.Strain}
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Light Schedule</TextHeading>
            {activeDiary?.Light_Schedule}
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Light Type</TextHeading>
            {activeDiary?.Light_Type}
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Room Type</TextHeading>
            {activeDiary?.Room_Type}
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Pot Size</TextHeading>
            {activeDiary?.Pot_Size}
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Co2</TextHeading>
            {activeDiaryData?.Co2 == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Co2} PPM</>
            )}
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Moisture</TextHeading>
            {activeDiaryData?.Moisture == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Moisture} %</>
            )}
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Temperature</TextHeading>
            {activeDiaryData?.Temperature == 0 ? (
              "N/A"
            ) : (
              <>
                {activeDiaryData?.Temperature}{" "}
                &#8451;
              </>
            )}
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Humidity</TextHeading>
            {activeDiaryData?.Humidity == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Humidity} %</>
            )}
          </TextHolderGroup2>
        </Flex2>


        <Flex3>
          <Heading>WEEKS</Heading>

          <WeekHolderInner>
            {activeDiaryWeeks.length > 0 ? (
              <>
                {activeDiaryWeeks.map((w, index) => {
                  return (
                    <WeekHolder
                      onClick={() => {
                    
                      }}
                      key={index}
                    >
                     
                      <WeekHolderText>
                      <WeekHolderTextSub>
                          Week
                        </WeekHolderTextSub>
                        <div>{w.Week}</div>
                       
                      </WeekHolderText>
                      <WeekHolderHeading>
                        {w.Stage == " " ? "Veg" : w.Stage}
                      </WeekHolderHeading>
                    </WeekHolder>
                  );
                })}
              </>
            ) : (
              <NoData>No Data Available</NoData>
            )}
          </WeekHolderInner>

          <DayDotHolder>
            {days.map((d, index) => {
              return <DayDot  key={index} onClick={()=>{handleDay(days,d)}}></DayDot>;
            })}
          </DayDotHolder>

        </Flex3>


        <Heading>PHOTOS</Heading>

        <GalleryHolderInner>
          {galleryData.length > 0? (
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
