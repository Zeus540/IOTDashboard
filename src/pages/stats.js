import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "../components/shared/axios";
import { DiaryContext } from "../context/diary_context";
import IndoorIcon from "../assets/sweetleaf-icons/indoors.svg"

import {useNavigate} from 'react-router-dom'

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

const Flex2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0px 10px;
  @media (max-width: 425px) {
    padding: 0px ;
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

const Inner = styled.div`

  max-width: 1770px;
  border-radius: 5px 5px 5px 5px;
  width: 100%;
  background: #ffffff;
  padding: 0px 0px;
  padding-top:0px;
  margin: 0px auto;
  @media (max-width: 425px) {
    margin: 0px auto;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px auto;
  }
`;

const TextHeading = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const TextHolderGroup2 = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  color: #8bab50;
  background: ghostwhite;
  padding: 10px ;
  line-height: 20px;
  margin: 10px;
  border-radius: 5px;
  min-width: calc(100% / 5 - 40px);
  max-width: calc(100% / 5 - 40px);
  @media (max-width: 600px) {
    min-width: calc(100% / 2 - 50px);
    padding: 10px;
  }
  @media (min-width: 601px) and (max-width: 768px) {
    max-width: unset;
  }
`;


const TextHolderGroup2Inner = styled.div`
  width: 100%;

`;

const NoData = styled.div`
  padding: 15px 0px;
  font-size: 20px;
`;
const NoDataHolder = styled.div`
  width: 100%;
  text-align: center;
`;
const Stats = (props) => {
 


  const { diaries,diariesPublic } = useContext(DiaryContext);
  const [activeDiary, setActiveDiary] = useState([]);
  const [activeDiaryData, setActiveDiaryData] = useState(undefined);
  const [ph, setPh] = useState(null);
  const [temp, setTemp] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [co2, setCo2] = useState(null);
  const [humidity, setHumidity] = useState(null);
  
  const params = useParams();
  const navigate = useNavigate ()

  useEffect(() => {
    let filtered = ""
    if( diariesPublic?.filter((d) => d.DiaryId == parseInt(params?.id))[0]){
      filtered =  diariesPublic?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    }
    if( diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0]){
      filtered =  diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    }

    document.title = "Sweet Leaf - " + filtered?.Title + "  Environment" ;
    setActiveDiary(filtered);

    
  }, [diaries,diariesPublic])

  useEffect(() => {
 
    let arr = []
    let data = props.data
  
    let phArr = props?.dataAll?.filter((d)=> d.Ph !== null).map((d) => d.Ph )
    let ph = 0

    let tempArr = props?.dataAll?.filter((d)=> d.Temperature !== null).map((d) => d.Temperature )
    let temp = 0

    let co2Arr = props?.dataAll?.filter((d)=> d.Co2 !== null).map((d) => d.Co2 )
  
    let co2 = 0

    let humidityArr = props?.dataAll?.filter((d)=> d.Humidity !== null).map((d) => d.Humidity )
    let humidity = 0

    for (let index = 0; index < phArr?.length; index++) {
      const element = phArr[index];
      ph =  (ph + parseFloat(element) / phArr?.length   ) 
      setPh(Math.round(ph * 100) / 100)
    }


    for (let index = 0; index < tempArr?.length; index++) {
      const element = tempArr[index];
      temp =  (temp + parseFloat(element) / tempArr?.length   ) 
      console.log("tempArr",tempArr)
      console.log("temp",temp)
      setTemp(Math.round(temp * 100) / 100)
    }

    for (let index = 0; index < co2Arr?.length; index++) {
      const element = co2Arr[index];
      co2 =  (co2 + parseFloat(element)  / co2Arr?.length   )
      setCo2(Math.round(co2 * 100) / 100)
    }

    for (let index = 0; index < humidityArr?.length; index++) {
      const element = humidityArr[index];
      humidity =  (humidity + parseFloat(element)  / humidityArr?.length   )
      setHumidity(Math.round(humidity * 100) / 100)
    }


   

    setActiveDiaryData(data)
    
  }, [])


  return (

  
    <Root>
         {/* <InnerButtonHolder>
      <Button onClick={()=>HandleBackToPreviousPage()}>Back</Button>
      </InnerButtonHolder> */}

      <Inner>

      

      <Heading> Grow environment </Heading>
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
          {/* <img src={IndoorIcon} width='50px'/> */}
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
       


    {activeDiaryData !== undefined && props.dayId !== undefined &&
    <>
       <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Ph</TextHeading>
            {ph == null ? (
              "N/A"
            ) : (
              <>{ph}</>
            )}
                  
                </TextHolderGroup2Inner>
          </TextHolderGroup2>


          {/* <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Moisture</TextHeading>
            {moisture == 0 ? (
              "N/A"
            ) : (
              <>{moisture}%</>
            )}
              
                </TextHolderGroup2Inner>
          </TextHolderGroup2> */}

    <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Temperature</TextHeading>
            {temp == 0 ? (
              "N/A"
            ) : (
              <>{temp} &#8451;</>
            )}
                  
                </TextHolderGroup2Inner>
          </TextHolderGroup2>

          <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Humidity</TextHeading>
            {humidity == 0 ? (
              "N/A"
            ) : (
              <>{humidity} </>
            )}
              
                </TextHolderGroup2Inner>
          </TextHolderGroup2>


          <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Co2</TextHeading>
            {co2 == 0 ? (
              "N/A"
            ) : (
              <>{co2} PPM</>
            )}
              
                </TextHolderGroup2Inner>
          </TextHolderGroup2>
    </>
    }

          

        

        </Flex2>

      </Inner>
    </Root>
   
  );
};

export default Stats;


