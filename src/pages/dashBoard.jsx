import React from 'react';
import axios from 'axios';
import { useEffect,useState} from 'react';
import { Line,Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import Card from '../components/Card';
import Card2 from '../components/Card2';
import Card3 from '../components/Card3';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Root = styled.div`
background: #1f1f1f;
padding: 20px;
padding-top: 0px;
color:white;
min-height: 100vh;
`;


const Heading = styled.h1`
margin: 0px;
padding:10px 0px;
color:white;
`;


const Flex = styled.div`
display:flex;
flex-wrap:wrap;
justify-content: space-between;
`;
const ButtonHolder = styled.div`
display:flex;
flex-wrap:wrap;
margin-bottom:20px;
@media(max-width:426px){
  justify-content: space-between;
}
`;



const BarStyled = styled.div`
overflow : auto;

@media(max-width:426px){
  height:200px!important;
}
`;

const Button = styled.button`
margin-right:20px;
padding:10px 40px;
border-radius:5px;
background: linear-gradient(180deg,#0088b0,#005a74);

border:none;
cursor:pointer;
color:white;
@media(max-width:426px){
  width: 46%;
  margin-right:0px;
}
`;
const ButtonReset = styled.button`
margin-right:20px;
padding:10px 40px;
border-radius:5px;
background: linear-gradient(180deg,#0088b0,#005a74);

border:none;
cursor:pointer;
color:white;
@media(max-width:426px){
  width: 46%;
  margin-right:0px;
}
`;
const ChartHolder = styled.div`
text-align:left;
display:flex;
@media(max-width:426px){
  flex-direction:column;
}
`;
const ChartInnerHolder = styled.div`
text-align:left;
display:flex;
width:50%;
flex-direction:column;
@media(max-width:426px){
  width:unset;
  flex-direction:column;
}
`;
const ChartInnerHolderList = styled.div`
text-align:left;
display:flex;
width:100%;
flex-direction:column;
height:500px;
overflow:auto;
`;

const Pre = styled.pre`
text-align:left;
font-size:30px;

`;
const Span = styled.sub`
color:#7adb76;
margin-left:5px;
font-size:16px;

`;
const Sup = styled.sup`
color:#7adb76;
font-size:14px;
margin-right:5px;

`;
const HeadingFlex = styled.div`
display:flex;
flex-direction: column;
`;
const Li = styled.li`
display: flex;
justify-content: space-between;
padding: 15px 0px;
`;
const Ul = styled.ul`
padding: 0;
`;


const LiItem = styled.div`
display: flex;
flex-direction: column;
`;

function DashBoard() {
const [datas,setDatas] = useState()
const [range,setRange] = useState(10) //Wet 64-70

useEffect(() => {

 setInterval(() => {
  axios.get('https://api.odinsgate.co.za/cricket/data')
  .then(function (response) {

    setDatas(response.data)

   
    
  })
  .catch(function (error) {

    console.log(error);
  })
 }, 10000);

}, [])

 


const options = {

  plugins: {
    legend: {
      position: 'top' ,
    },

  },
};

const optionsBatt = {
  
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  
};

const dataBatt = {
  labels:datas?.slice(-range).map((d) => d?.Time),
  datasets: [
 
    {
      label: 'Battery Level',
      data:  datas?.slice(-range).map((d) => d?.Batt),
      borderColor: '#7adb76',
      backgroundColor: '#7adb76',
    },
  ],
};

const dataP1 = {
  labels:datas?.slice(-range).map((d) => d?.Time),
  datasets: [
    {
      label: 'Moisture Level',
      data:  datas?.slice(-range).map((d) => d?.Moisture),
      borderColor: '#006b8a',
      backgroundColor: '#006b8a',
    },

  ],
};

const dataP2 = {
  labels:datas?.slice(-range).map((d) => d?.Time),
  datasets: [
    {
      label: 'Moisture Level',
      data:  datas?.slice(-range).map((d) => d?.Moisture),
      borderColor: '#006b8a',
      backgroundColor: '#006b8a',
    },

  ],
};

const tempData = {
  labels:datas?.slice(-range).map((d) => d?.Time),
  datasets: [
    {
      label: 'Temperature Level',
      data:  datas?.slice(-range).map((d) => d?.Temp),
      borderColor: '#ff4141',
      backgroundColor: '#ff4141',
    },
  

  ],
};

const handleRangeFilterBack=()=>{

setRange(range + 5)
}
const handleRangeFilterReset=()=>{

  setRange(10)
}
  

  return (
    <Root className="App">
    <Heading>
    <HeadingFlex>
    <Pre><Sup>IoT</Sup><span>Smart</span><Span>Pot</Span> </Pre>

    </HeadingFlex>
    </Heading>
    <div>
   
  
   <Flex>
  
  <Card  data={datas} heading="Moisture Level"/>
  <Card2 data={datas} heading="Battery Level"/>
  <Card3  data={datas} heading="Temperature"/>
 
  
   </Flex>

  <ButtonHolder>
  <ButtonReset onClick={()=>{handleRangeFilterReset()}}>Reset</ButtonReset>
    <Button onClick={()=>{handleRangeFilterBack()}}>Load More</Button>
  
  </ButtonHolder>

  <ChartHolder>


    <ChartInnerHolder>
    <h2>Pot 1</h2>
    <Line data={dataP1} options={options}/>
    </ChartInnerHolder>


    <ChartInnerHolder>
    <h2>Pot 2</h2>
    <Line data={dataP2} options={options}/>
    </ChartInnerHolder>



    </ChartHolder>

    <ChartHolder>



<ChartInnerHolder>
<h2>Battery</h2>
<BarStyled><Bar options={optionsBatt} data={dataBatt} /></BarStyled>
</ChartInnerHolder>

<ChartInnerHolder>
<h2>Temp</h2>
<Line data={tempData} options={options}/>
</ChartInnerHolder>
</ChartHolder>
<ChartInnerHolder>
<h2>Data Overview</h2>
<ChartInnerHolderList>
<Ul>
    {datas?.reverse().map((d,index)=>{
      return(

               <Li> <LiItem><span>Moisture</span>{d?.Moisture}%</LiItem> <LiItem><span>Temp</span>{d?.Temp}&#8451;</LiItem> <LiItem><span>Battery</span>{d?.Batt}%</LiItem>  <LiItem><span>Time</span>{d.Time}</LiItem></Li>
       
      
      )
    })}
  </Ul>
    </ChartInnerHolderList>
    </ChartInnerHolder>
    </div>
</Root>
  )
}

export default DashBoard