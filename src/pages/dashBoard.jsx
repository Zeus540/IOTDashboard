import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Image from "../assets/imagesrsadere.png";
import Image2 from "../assets/imagesrsaderes.png";
import Image3 from "../assets/seedling.jpg";
import axios from "axios";
import { DiaryContext } from "../context/diary_context";
import LightBox from "../components/LightBox";

const Root = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  box-shadow: 2px 2px 20px 4px #a9a9a966;
  max-width: 1770px;
  border-radius: 10px;
  width: 100%;
  background: #dad7cd;
  padding: 20px;
  @media(max-width:425px){
   margin: 16px;
   padding: 20px;
  }
  @media(min-width:426px) and (max-width:768px){
    margin: 16px;
  }
`;

const IntroHolder = styled.div`
  margin-bottom: 20px;
`;
const Flex = styled.div`
  display: flex;
  @media(max-width:425px){
    flex-direction:column;
  }
  @media(min-width:426px) and (max-width:768px){
    flex-direction:column;
  }

`;
const Flex2 = styled.div`
  display: flex;

  flex-wrap: wrap;
`;
const Flex3 = styled.div``;
const WeekHolder = styled.div`
  border: 1px solid green;
  width: fit-content;
  text-align: center;
  border-radius: 5px;
  margin: 5px;
  min-width: 70px;
  background: white;

`;
const WeekHolderHeading = styled.div`
  background: green;
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
  @media(max-width:425px){
    max-width: unset;
  }
  @media(min-width:426px) and (max-width:768px){
    max-width: unset;
  }
`;
const TextHolder = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-left: 20px;
  border-radius: 10px;
  @media(max-width:425px){
    margin-left: 0px;
    width: unset;
    padding: 0px ;
  }
  @media(min-width:426px) and (max-width:768px){
    margin-left: 0px;
    width: unset;
    padding: 0px ;
  }
`;
const Notes = styled.div`
  padding: 20px;
  height: 100%;
  background: ghostwhite;

  border-radius: 10px;
`;

const TextHolderHeading = styled.h3``;
const DairyHeading = styled.h3`
  margin-top: 0px;
  font-size: 30px;
  margin-bottom: 10px;
`;

const TextHeading = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: green;
`;


const TextHolderGroup2 = styled.div`
text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ghostwhite;
  padding: 15px 15px;
  line-height: 25px;
  margin: 15px;
  border-radius: 10px;
  min-width: calc(100% / 5 - 60px);
  max-width: calc(100% / 5 - 60px);
  @media(max-width:425px){
    min-width: calc(100% / 2 - 60px);
  }
  @media(min-width:426px) and (max-width:768px){
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
  max-width: calc(100% / 3 - 20px);
  margin: 10px;
  border-radius: 10px;
  @media(max-width:425px){
    max-width: unset;
  }
  @media(min-width:426px) and (max-width:768px){
    max-width: calc(100% / 2 - 20px);
    min-width: calc(100% / 2 - 20px);
  }
`;

const GalleryHolderInner = styled.div`
  display: flex;
  flex-wrap:wrap;
  @media(max-width:425px){
    flex-direction: column;
  }
  @media(min-width:426px) and (max-width:768px){
    flex-direction: unset;
    flex-wrap:wrap;
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
  width: 50%;
  padding-top: 20px;
`;

const NotesInnerClose = styled.div`
  background: #dad7cd;
  padding: 10px 15px;
  display: flex;
  border-radius: 10px 10px 0px 0px;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
`;

const NotesClose = styled.div`
  font-size: 22px;
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
    background: green;
    height: 2px;
    width: 15%;
    margin: 0px 20px;
  }
  &::after {
    content: "";
    display: block;
    background: green;
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
  padding: 15px 30px;

  width: fit-content;

  border: none;
  background: #588157;
  color: white;
  border-radius: 5px;
`;

const TextBox = styled.textarea`
  padding: 15px 0px;
  width: calc(100% - 1px);
  height: 100%;
  min-height: 200px;
  min-width: calc(100% - 1px);
  display: block;
`;

const NoData = styled.div`
  padding: 15px 0px;
  font-size: 20px;  
`;


const DashBoard = () => {
  const [lightBox, setLightBox] = useState(false);
  const [addNotes, setAddNotes] = useState(false);

  const [lightBoxImg, setLightBoxImg] = useState(Image);
  const [activeDiary, setActiveDiary] = useState([]);
  const [activeDiaryData, setActiveDiaryData] = useState([]);
  const [activeDiaryDataFull, setActiveDiaryDataFull] = useState([]);
  const [activeDiaryNotes, setActiveDiaryNotes] = useState("");
  const [activeDiaryWeeks, setActiveDiaryWeeks] = useState([]);

  const { diaries } = useContext(DiaryContext);
  const params = useParams();

  useEffect(() => {
    let filtered = diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];

    setActiveDiary(filtered);

    let data = {
      Diaryid: params?.id,
    };

    axios
      .post("https://api.sweetleaf.co.za/nodemcu/plant_Data", data)
      .then(function (response) {
     
        setActiveDiaryData(response.data);
        setActiveDiaryDataFull(response.data)
        setActiveDiaryNotes(response.data[response.data.length - 1]?.Notes);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .post("https://api.sweetleaf.co.za/nodemcu/weeks", data)
      .then(function (response) {
      
        setActiveDiaryWeeks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [diaries]);

  const handleLightBox = (img) => {
    setLightBox(!lightBox);
    setLightBoxImg(img);
  };

  const handleNotes = () => {
    setAddNotes(!addNotes);
  };

  const handleFilter = (w) => {
    setActiveDiaryData(activeDiaryDataFull.filter((d) => d.WeekId == w.WeekId))
  };
  
  return (
    <Root>
      {lightBox && 
   <LightBox
   data={activeDiary}
   close={setLightBox}
   image={lightBoxImg}
   />
      }

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
          <div>{activeDiary?.Start_Date}</div>
        </IntroHolder>
        <Flex>
          <ImgHolder>
            <ImageMain
              src={Image}
              width="100%"
              height="100%"
              onClick={() => {
                handleLightBox(Image);
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
                {activeDiaryData[activeDiaryData.length - 1]?.Notes == ""
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
            {activeDiaryData[activeDiaryData.length - 1]?.Co2} PPM
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Moisture</TextHeading>
            {activeDiaryData[activeDiaryData.length - 1]?.Moisture}
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Temperature</TextHeading>
            {activeDiaryData[activeDiaryData.length - 1]?.Temperature}
          </TextHolderGroup2>
          <TextHolderGroup2>
            <TextHeading>Humidity</TextHeading>
            {activeDiaryData[activeDiaryData.length - 1]?.Humidity}
          </TextHolderGroup2>
        </Flex2>
        <Flex3>
          <Heading>WEEKS</Heading>

          <WeekHolderInner>
              {activeDiaryWeeks.length > 0 ? activeDiaryWeeks.map((w,index)=>{
                return(
                  <WeekHolder onClick={()=>{handleFilter(w)}} key={index}>
                  <WeekHolderHeading>{w.Stage}</WeekHolderHeading>
                  <WeekHolderText>
                    <div>{w.Week}</div>
                    <WeekHolderTextSub>{w.Week > 1 ? "Weeks" : "Week"} </WeekHolderTextSub>
                  </WeekHolderText>
                </WeekHolder>
                )
              }):
              <NoData>No Data Available</NoData>
              }
          </WeekHolderInner>
        </Flex3>
        <Heading>PHOTOS</Heading>

        <GalleryHolderInner>
          <GalleryImageHolder>
            <GalleryImage
              src={Image3}
              width="100%"
              height="100%"
              onClick={() => {
                handleLightBox(Image3);
              }}
            />
          </GalleryImageHolder>
          <GalleryImageHolder>
            <GalleryImage
              src={Image2}
              width="100%"
              height="100%"
              onClick={() => {
                handleLightBox(Image2);
              }}
            />
          </GalleryImageHolder>
          <GalleryImageHolder>
            <GalleryImage
              src={Image}
              width="100%"
              height="100%"
              onClick={() => {
                handleLightBox(Image);
              }}
            />
          </GalleryImageHolder>
        </GalleryHolderInner>
      </Inner>
    </Root>
  );
};

export default DashBoard;

// python esptool.py --chip esp32 --port COM3 --baud 921600 --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m  --flash_size detect 0x1000 bootloader.bin 0x8000 partitions_espruino.bin 0x10000 espruino_esp32.bin
