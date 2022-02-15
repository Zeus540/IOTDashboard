import React from 'react';
import axios from 'axios';
import { useEffect,useState} from 'react';
import { Line,Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import Card from '../components/Card';
import Card2 from '../components/Card2';
import Card3 from '../components/Card3';
import { Bars } from  'react-loader-spinner'
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
display:flex;

padding-top: 0px;
color:white;
min-height: 100vh;
flex-direction:column;
`;


const Heading = styled.h1`
margin: 0px;
padding: 10px 20px;
color:white;
`;


const Flex = styled.div`
display:flex;
flex-wrap:wrap;
padding: 0px 20px;
justify-content: space-between;
`;
const ButtonHolder = styled.div`
display:flex;
flex-wrap:wrap;
margin:0px;
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
background:#62c55e;
font-weight: 600;
border:none;
cursor:pointer;
color:#1f1f1f;
&:hover {
  background: #38df32;
}
@media(max-width:426px){
  width: 46%;
  margin-right:0px;
}
`;
const ButtonReset = styled.button`
margin-right:20px;
padding:10px 40px;
border-radius:5px;
background: #62c55e;
font-weight: 600;
border:none;
cursor:pointer;
color:#1f1f1f;
&:hover {
  background: #38df32;
}
@media(max-width:426px){
  width: 46%;
  margin-right:0px;
}
`;
const ChartHolder = styled.div`
text-align:left;
display:flex;
padding: 20px;
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
const ChartInnerHolderWide = styled.div`
text-align:left;
display:flex;
width:unset;
flex-direction:column;
padding: 20px;
@media(max-width:426px){

  flex-direction:column;
}
`;

const ChartInnerHolderList = styled.div`
text-align:left;
display:flex;
padding:20px 0px;

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
display: flex;
margin: 0;
flex-direction: column-reverse;
`;


const LiItem = styled.div`
display: flex;
flex-direction: column;
`;
const Loading = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
height:100vh;
align-items: center;
justify-content: center;

`;
const Loader = styled.div`
display: flex;
width: 100vw;
flex-direction: column;
height:100vh;
align-items: center;
justify-content: center;
font-size:50px;

`;
const LoaderText = styled.h2`
font-size:20px;
color:white;
`;
const MenuMobile = styled.div`
font-size:20px;
background: linear-gradient(180deg,#1f1f1f,#0e0e0e);
position: sticky;
left: 0;
right: 0;
bottom: 0;
padding: 15px;
border-radius: 10px 10px 0px 0px;
`;

function DashBoard() {
const [datas,setDatas] = useState()
const [loading,setLoading] = useState(true)
const [range,setRange] = useState(10) //Wet 64-70
const [rangeAll,setRangeAll] = useState(10)

useEffect(() => {

 setInterval(() => {
  axios.get('https://api.odinsgate.co.za/cricket/data')
  .then(function (response) {

    setDatas(response.data)
    setLoading(false)
   
    
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

const handleRangeFilterBackAll=()=>{
  setRangeAll(rangeAll + 5)
  }
const handleRangeFilterResetAll=()=>{
  
    setRangeAll(10)
}  

  return (
    <Root className="App">


   
  {loading ? <Loading><Loader>	<Bars color="#62c55e"  height={100} width={80} /> <LoaderText>Loading...</LoaderText></Loader></Loading>:

 <>
     <Heading>
    <HeadingFlex>
    <Pre><Sup>IoT</Sup><span>Smart</span><Span>Pot</Span> </Pre>

    </HeadingFlex>
    </Heading>
   <Flex>
  
  <Card  data={datas} heading="Moisture Level"/>
  <Card2 data={datas} heading="Battery Level"/>
  <Card3  data={datas} heading="Temperature"/>
 
  
   </Flex>



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

<ChartInnerHolderWide>
  
<h2>Data Overview</h2>
<ChartInnerHolderList>
<Ul>
    {datas?.slice(-range)?.map((d,index)=>{
      
      return(

               <Li> <LiItem><span>Moisture</span>{d?.Moisture}%</LiItem> <LiItem><span>Temp</span>{d?.Temp}&#8451;</LiItem> <LiItem><span>Battery</span>{d?.Batt}%</LiItem>  <LiItem><span>Time</span>{d.Time}</LiItem></Li>
       
      
      )
    })}
  </Ul>
    </ChartInnerHolderList>

    </ChartInnerHolderWide>

    <MenuMobile>  
      <ButtonHolder>
  <ButtonReset onClick={()=>{handleRangeFilterReset()}}>Reset</ButtonReset>
    <Button onClick={()=>{handleRangeFilterBack()}}>Load More</Button>
  
  </ButtonHolder>
  </MenuMobile>
    </>
  
    }
   
  
</Root>
  )
}

export default DashBoard