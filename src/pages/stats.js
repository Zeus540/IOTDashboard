import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { DiaryContext } from "../context/diary_context";
import IndoorIcon from "../assets/sweetleaf-icons/indoors.svg"
import Tabs from "../components/Tabs";




const Root = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;

const Flex2 = styled.div`
  display: flex;

  flex-wrap: wrap;
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
    background: #39595b;
    height: 2px;
    width: 15%;
    margin: 0px 20px;
  }
  &::after {
    content: "";
    display: block;
    background: #39595b;
    height: 2px;
    width: 15%;
    margin: 0px 20px;
  },

`;

const Inner = styled.div`

  max-width: 1770px;
  border-radius: 0px 5px 5px 5px;
  width: 100%;
  background: #ffffff;
  padding: 20px 0px;
  @media (max-width: 425px) {

  }
  @media (min-width: 426px) and (max-width: 768px) {

  }
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

const Stats = () => {
 


  const { diaries } = useContext(DiaryContext);
  const [activeDiary, setActiveDiary] = useState([]);
  const [activeDiaryData, setActiveDiaryData] = useState([]);
  const params = useParams();

  useEffect(() => {
    let filtered = diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    console.log("filtered",filtered);
    setActiveDiary(filtered);


  }, [diaries]);



  return (

  
    <Root>
   
   <Tabs/>
      <Inner>
   
           
      <Heading> Grow environment </Heading>
        <Flex2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
       
            {activeDiary?.Strain}
            <TextHeading>Strain</TextHeading>
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
       
            {activeDiary?.Light_Schedule}
            <TextHeading>Light Schedule</TextHeading>
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
           
            {activeDiary?.Light_Type}
            <TextHeading>Light Type</TextHeading>
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <img src={IndoorIcon} width='50px'/>
          <TextHolderGroup2Inner>
       
            {activeDiary?.Room_Type}
            <TextHeading>Room Type</TextHeading>
          </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
         
            {activeDiary?.Pot_Size}
            <TextHeading>Pot Size</TextHeading>
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
      
            {activeDiaryData?.Co2 == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Co2} PPM</>
            )}
                  <TextHeading>Co2</TextHeading>
                </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
          
            {activeDiaryData?.Moisture == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Moisture} %</>
            )}
              <TextHeading>Moisture</TextHeading>
              </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
    
            {activeDiaryData?.Temperature == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Temperature} &#8451;</>
            )}
                    <TextHeading>Temperature</TextHeading>
                </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
         
            {activeDiaryData?.Humidity == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Humidity} %</>
            )}
               <TextHeading>Humidity</TextHeading>
                  </TextHolderGroup2Inner>
                  
          </TextHolderGroup2>

          <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <>Strong</>
            <TextHeading>SMELL</TextHeading>
    
                  </TextHolderGroup2Inner>
          </TextHolderGroup2>

          
        </Flex2>

      </Inner>
    </Root>
   
  );
};

export default Stats;


