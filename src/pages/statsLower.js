import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "../components/shared/axios";
import { DiaryContext } from "../context/diary_context";
import IndoorIcon from "../assets/sweetleaf-icons/indoors.svg"
import VpdChart from '../assets/VpdChart.jpg'
import useMediaQuery from "../components/shared/useMediaQuery";

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
  transition: all 0.2s ease;
  @media (max-width: 1316px) {
    margin: 0px auto;
    height: ${(props) => props.openPosition == 0 ? "250px" : `${props.openPosition}%`};
    overflow: hidden;
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
  justify-content: center;
  @media (max-width: 600px) {
    margin: 0 20px;
    width: unset;
  }
  @media (min-width: 601px) and (max-width: 768px) {
    margin: 0 20px;
    width: unset;
  }
`;

const ChartHolderInner = styled.div`
display: flex;
flex-direction: column;
align-items: center;
  width: calc(100% /3 - 40px);
  margin: 20px;
  @media (max-width: 768px) {
    min-width: calc(100% / 1 );
    margin-bottom: 20px;
    margin: unset;
  }

  
  @media (min-width: 769px) and (max-width: 1023px) {
    min-width: calc(100% / 1 - 20px);
    margin: 10px;
    margin-top: 0px;
  }
  @media (min-width: 1024px) and (max-width: 1658px) {
    min-width: calc(100% / 3 - 20px);
    margin: 10px;
    margin-top: 0px;
  }
  
`;

const ChartVpd = styled.h1`
font-size: 22px;
 //color:black!important
`;

const Svg = styled.svg`
width: 20px;
fill: green;
transform: rotateZ(${(props) => props.openPosition == 0 ? "180deg" : `0deg`});
transition: all 0.2s ease;

`;

const Btn = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`;

const BtnText = styled.p`


`;
const StatsLower = (props) => {
 


  const { diaries,diariesPublic } = useContext(DiaryContext);
  const [activeDiary, setActiveDiary] = useState([]);

  const [ph, setPh] = useState(0);
  const [temp, setTemp] = useState(0);
  const [tempUnit, setTempunit] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [co2, setCo2] = useState(null);
  const [humidity, setHumidity] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [chartDataPh, setChartDataPh] = useState(null);
  const [chartDataCo2, setChartDataCo2] = useState(null);
  const [vpd, setVpd] = useState(null);
  const [openPosition, setOpenPosition] = useState(0);
  const [btnToggle, setBtnToggle] = useState(false);
  
  const params = useParams();
  const navigate = useNavigate ()

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(min-width: 601px) and (max-width: 1023px)');
  const isLaptop = useMediaQuery('(min-width: 601px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');


  useEffect(() => {
 

    if(props.data !== undefined){
   
  
    let phArr = props?.data?.filter((d)=> d.Ph !== 0).filter((v)=> v.Ph !== null).map((d) => d.Ph )
    let pha = 0
  
    let tempArr = props?.data?.filter((d)=> d.Temperature !== 0).filter((v)=> v.Temperature !== null).map((d) => d.Temperature )
    let tempa = 0


    let co2Arr = props?.data?.filter((d)=> d.Co2 !== 0).filter((v)=> v.Co2 !== null).map((d) => d.Co2 )
    let co2a = 0

    let humidityArr = props?.data?.filter((d)=> d.Humidity !== 0).filter((v)=> v.Humidity !== null).map((d) => d.Humidity )
    let humiditya = 0



    setTempunit(props?.data?.map((d) => d.Temperature_Measurement )[props?.data?.map((d) => d.Temperature_Measurement ).length - 1])
 
 

  if(phArr.length > 0){
    for (let index = 0; index < phArr?.length; index++) {
      const element = phArr[index];
      pha =  (pha + parseFloat(element) / phArr?.length) 
      setPh(Math.round(pha * 100) / 100)
      
    }
  }else{
    setPh(0)
  }

  if(tempArr.length > 0){
    for (let index = 0; index < tempArr?.length; index++) {
      const element = tempArr[index];
      tempa =  (tempa + parseFloat(element) / tempArr?.length) 
      setTemp(Math.round(tempa * 100) / 100)
    }
  }else{
    setTemp(0)
  }

   
  if(co2Arr.length > 0 ){
    for (let index = 0; index < co2Arr?.length; index++) {
      const element = co2Arr[index];
      co2a =  (co2a + parseFloat(element)  / co2Arr?.length   )
      if(co2a !== NaN){
        setCo2(Math.round(co2a * 100) / 100)
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
      humiditya =  (humiditya + parseFloat(element)  / humidityArr?.length   )
      setHumidity(Math.round(humiditya * 100) / 100)
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
  if(temp !== 0 && humidity !== 0){
    calculateVPD(temp,humidity) 
  }else{
    setVpd(0)
  }

  //calculateVPD(29, 63.25) 
}, [temp,humidity])


const handleDropDown = ()=>{
  if(openPosition == 100){
    setOpenPosition(0)
  }else{
    setOpenPosition(100)
  }

}


useEffect(() => {
  if (isDesktop) {
    setOpenPosition(100)
    setBtnToggle(false)
  }
  if (isTablet) {
    setOpenPosition(0)
    setBtnToggle(true)
  }
  if (isMobile) {
    setOpenPosition(0)
    setBtnToggle(true)
  }
}, [isDesktop,isTablet,isMobile])


  return (

  
    <Root>


      <Inner >
        
      {props.weekId !== undefined ?
      <ChartHolder>

        {chartData && 
        <ChartHolderInner>
      <Line  data={chartDataPh} updateMode="resize"/>
         <ChartVpd>{ph}</ChartVpd>
      </ChartHolderInner>
      }
  
{openPosition !== 0 &&
<>
{chartData && 
        <ChartHolderInner>
      <Line  data={chartData} />
      <ChartVpd>{vpd} kPa</ChartVpd>
      </ChartHolderInner>
      }



{chartDataCo2 && 
        <ChartHolderInner>
      <Line  data={chartDataCo2} />
      
      <ChartVpd>{co2} PPM</ChartVpd>
      </ChartHolderInner>
      }
</>
       }
      </ChartHolder>:
      
      <NoDataHolder>
           <NoData>No Data Available</NoData>
      </NoDataHolder>
}


      </Inner>

      {btnToggle && 
      <Btn onClick={()=>{handleDropDown()}} >
        <BtnText> {openPosition == 0 ? 'View More': "View Less"}</BtnText>
      <Svg openPosition={openPosition} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></Svg>
      </Btn>
      }
    </Root>
   
  );
};

export default StatsLower;


