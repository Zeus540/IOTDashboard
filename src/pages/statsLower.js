import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "../components/shared/axios";
import { DiaryContext } from "../context/diary_context";
import IndoorIcon from "../assets/sweetleaf-icons/indoors.svg"

import {useNavigate} from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);






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
color: #354f41;
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
    height: 4px;
    border-radius: 50px;
    width: 15%;
    margin: 0px 20px;
  }
  &::after {
    content: "";
    display: block;
    background: #8bab50;
    height: 4px;
    border-radius: 50px;

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
color: #ffffff;
padding: 10px;
background: #8bab50;
border-radius: 5px 5px 0px 0px;
`;


const TextHeadingInfo = styled.p`

padding: 10px;

border-radius: 5px 5px 0px 0px;
`;
const TextHolderGroup2 = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  color: #8bab50;
  background: ghostwhite;

  line-height: 20px;
  margin: 10px;
  border-radius: 5px;
  min-width: calc(100% / 5 - 20px);
  max-width: calc(100% / 5 - 20px);
  @media (max-width: 600px) {
    min-width: calc(100% / 2 - 30px);

  }
  @media (min-width: 601px) and (max-width: 768px) {
    max-width: unset;
  }
`;


const TextHolderGroup2Inner = styled.div`
  width: 100%;
  display: flex;

  height: 100%;
  flex-direction: column;
`;

const NoData = styled.div`
  padding: 15px 0px;
  font-size: 18px;
  color: #354f41;
`;
const NoDataHolder = styled.div`
  width: 100%;
  text-align: center;
`;

const ChartHolder = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    margin: 0 20px;
    width: unset;
  }

`;

const ChartHolderInner = styled.div`
display: flex;
flex-direction: column;
align-items: center;
  width: calc(100% /3 );
  @media (max-width: 600px) {
    min-width: calc(100% / 1 );
    margin-bottom: 20px;
  }
  @media (min-width: 601px) and (max-width: 768px) {
    min-width: calc(100% / 2 - 20px);
    margin: 10px;
    margin-top: 0px;
  }
`;

const ChartVpd = styled.h1`
font-size: 22px;
 //color:black!important
`;

const StatsLower = (props) => {
 


  const { diaries,diariesPublic } = useContext(DiaryContext);
  const [activeDiary, setActiveDiary] = useState([]);

  const [ph, setPh] = useState(null);
  const [temp, setTemp] = useState(0);
  const [tempUnit, setTempunit] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [co2, setCo2] = useState(null);
  const [humidity, setHumidity] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [chartDataPh, setChartDataPh] = useState(null);
  const [chartDataCo2, setChartDataCo2] = useState(null);
  const [vpd, setVpd] = useState(null);
  
  const params = useParams();
  const navigate = useNavigate ()



  useEffect(() => {
 

    if(props.data !== undefined){
   
  
    let phArr = props?.data?.filter((d)=> d.Ph !== 0).filter((v)=> v !== null).map((d) => d.Ph )
    let ph = 0
  
    let tempArr = props?.data?.filter((d)=> d.Temperature !== 0).filter((v)=> v.Temperature !== null).map((d) => d.Temperature )
    let temp = 0

    console.log("tempArr",tempArr)
    let co2Arr = props?.data?.filter((d)=> d.Co2 !== 0).filter((v)=> v.Co2 !== null).map((d) => d.Co2 )
    let co2 = 0

    let humidityArr = props?.data?.filter((d)=> d.Humidity !== 0).filter((v)=> v.Humidity !== null).map((d) => d.Humidity )
    let humidity = 0
    console.log("humidityArr",humidityArr)

    setTempunit(props?.data?.map((d) => d.Temperature_Measurement )[props?.data?.map((d) => d.Temperature_Measurement ).length - 1])
 
 

  if(phArr.length > 0){
    for (let index = 0; index < phArr?.length; index++) {
      const element = phArr[index];
      ph =  (ph + parseFloat(element) / phArr?.length) 
      setPh(Math.round(ph * 100) / 100)
    }
  }else{
    setPh(0)
  }

  if(tempArr.length > 0){
    for (let index = 0; index < tempArr?.length; index++) {
      const element = tempArr[index];
      temp =  (temp + parseFloat(element) / tempArr?.length) 
      setTemp(Math.round(temp * 100) / 100)
    }
  }else{
    setTemp(0)
  }

   
  if(co2Arr.length > 0 ){
    for (let index = 0; index < co2Arr?.length; index++) {
      const element = co2Arr[index];
      co2 =  (co2 + parseFloat(element)  / co2Arr?.length   )
      if(co2 !== NaN){
        setCo2(Math.round(co2 * 100) / 100)
      }else{
        setCo2(0)
      }
    }

  }else{
    setCo2(0)
  }

  if(humidityArr.length > 0){
    for (let index = 0; index < humidityArr?.length; index++) {
      const element = humidityArr[index];
      humidity =  (humidity + parseFloat(element)  / humidityArr?.length   )
      setHumidity(Math.round(humidity * 100) / 100)
    }
  }else{
    setHumidity(0)
  }



  const data = {
    labels: props.days?.map((l) => l.Day.substring(0,3)),
    datasets: [
      {

        label: 'Temperature',
        data: tempArr.filter((v)=> v !== null),
        borderColor: "#8bab50",
        backgroundColor: "#8bab50",
      },
      {
  
        label: 'Humidity',
        data: humidityArr.filter((v)=> v !== null),
        borderColor: "#5db7ff",
        backgroundColor: "#5db7ff",
      },
    ],
  };

  const Ph = {
    labels: props.days?.map((l) => l.Day.substring(0,3)),
    datasets: [
      {

        label: 'Ph',
        data: phArr.filter((v)=> v !== null),
        borderColor: "#8bab50",
        backgroundColor: "#8bab50",
      },
     
    ],
  };

  const Co2 = {
    labels: props.days?.map((l) => l.Day.substring(0,3)),
    datasets: [
      {

        label: 'Co2',
        data: co2Arr.filter((v)=> v !== null),
        borderColor: "#1e1a11",
        backgroundColor: "#1e1a11",
      },
     
    ],
  };
  

  setChartData(data)
  setChartDataPh(Ph)
  setChartDataCo2(Co2)

  }

  
  }, [props])



 
  function calculateVPD(temperatureIn, humidityIn) {
    // Constants
    var A = 17.27;
    var B = 237.7;
  
    // Convert temperature from Celsius to Kelvin
    var T = temperatureIn + 273.15;
  
    // Calculate saturation vapor pressure (es) in kilopascals (kPa)
    var es = 0.6108 * Math.exp((A * temperatureIn) / (B + temperatureIn));
  
    // Calculate actual vapor pressure (ea) in kilopascals (kPa)
    var ea = (humidityIn / 100) * es;
  
    // Calculate vapor pressure deficit (VPD) in kilopascals (kPa)
    var VPD = (es - ea).toFixed(2);
  
    console.log("calculateVPD",VPD)
    setVpd(VPD)
  }

 

useEffect(() => {

  console.log('temp',temp)
  console.log('humidity',humidity)

  if(temp !== 0 && humidity !== 0){
    calculateVPD(temp,humidity) 
  }else{
    setVpd(0)
  }

  //calculateVPD(29, 63.25) 
}, [temp,humidity])


  return (

  
    <Root>


      <Inner>
        
      {props.weekId !== undefined &&
      <ChartHolder>
        {chartData && 
        <ChartHolderInner>
      <Line  data={chartDataPh} updateMode="resize"/>
      
      </ChartHolderInner>
      }
  

{chartData && 
        <ChartHolderInner>
      <Line  data={chartData} />
      <ChartVpd>{vpd} kPa</ChartVpd>
      </ChartHolderInner>
      }



{chartDataCo2 && 
        <ChartHolderInner>
      <Line  data={chartDataCo2} />
      </ChartHolderInner>
      }
      </ChartHolder>
}
        {/* <Flex2>

    {(props.weekId !== undefined) ?
    <>
       <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Ph</TextHeading>
            {ph == 0 ? (
               <TextHeadingInfo>N/A</TextHeadingInfo>
            ) : (
              <TextHeadingInfo>{ph}</TextHeadingInfo>
            )}
                  
                </TextHolderGroup2Inner>
          </TextHolderGroup2>


    <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Temperature</TextHeading>
            {temp == 0 ? (
              <TextHeadingInfo>N/A</TextHeadingInfo>
            ) : (
              <TextHeadingInfo>{temp}  {tempUnit} </TextHeadingInfo>
            )}
                  
                </TextHolderGroup2Inner>
          </TextHolderGroup2>

          <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Humidity</TextHeading>
            {humidity == 0 ? (
            <TextHeadingInfo>N/A</TextHeadingInfo>
            ) : (
              <TextHeadingInfo>{humidity}  % </TextHeadingInfo>
            )}
              
                </TextHolderGroup2Inner>
          </TextHolderGroup2>


          <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Co2</TextHeading>

            {co2 == 0  ? (
                <TextHeadingInfo>N/A</TextHeadingInfo>
            ) : (
              <TextHeadingInfo>{co2} PPM</TextHeadingInfo>
            )}
              
                </TextHolderGroup2Inner>
          </TextHolderGroup2>
    </>:
    <NoDataHolder>
         <NoData>No Data Available</NoData>
    </NoDataHolder>
    }

          

        

        </Flex2> */}

      </Inner>
    </Root>
   
  );
};

export default StatsLower;


