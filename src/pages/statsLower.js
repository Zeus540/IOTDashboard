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
color: black;
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
  font-size: 18px;
  color: black;
`;
const NoDataHolder = styled.div`
  width: 100%;
  text-align: center;
`;

const StatsLower = (props) => {
 


  const { diaries,diariesPublic } = useContext(DiaryContext);
  const [activeDiary, setActiveDiary] = useState([]);

  const [ph, setPh] = useState(null);
  const [temp, setTemp] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [co2, setCo2] = useState(null);
  const [humidity, setHumidity] = useState(null);
  
  const params = useParams();
  const navigate = useNavigate ()



  useEffect(() => {
 
  
    if(props.data !== undefined){
  
  
    let phArr = props?.data?.filter((d)=> d.Ph !== null).map((d) => d.Ph )
    let ph = 0

    let tempArr = props?.data?.filter((d)=> d.Temperature !== null).map((d) => d.Temperature )
    let temp = 0

    let co2Arr = props?.data?.filter((d)=> d.Co2 !== null).map((d) => d.Co2 )
  
    let co2 = 0

    let humidityArr = props?.data?.filter((d)=> d.Humidity !== null).map((d) => d.Humidity )
    let humidity = 0

    for (let index = 0; index < phArr?.length; index++) {
      const element = phArr[index];
      ph =  (ph + parseFloat(element) / phArr?.length   ) 
      setPh(Math.round(ph * 100) / 100)
    }


    for (let index = 0; index < tempArr?.length; index++) {
      const element = tempArr[index];
      temp =  (temp + parseFloat(element) / tempArr?.length   ) 
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
  }

    console.log("called",props)
  }, [props.data])


  
  

  return (

  
    <Root>


      <Inner>

      

      <Heading> Grow conditions </Heading>
        <Flex2>

    {(props.weekId !== undefined && props.dayId !== undefined) ?
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
    </>:
    <NoDataHolder>
         <NoData>No Data Available</NoData>
    </NoDataHolder>
    }

          

        

        </Flex2>

      </Inner>
    </Root>
   
  );
};

export default StatsLower;


