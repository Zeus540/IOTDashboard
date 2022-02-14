
import axios from 'axios';
import { useEffect,useState} from 'react';
import './App.css';
import { Line,Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import Card from './components/Card';
import Card2 from './components/Card2';
import Card3 from './components/Card3';
import { ThemeProvider } from 'styled-components';
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
height:400px!important;
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
background: linear-gradient(180deg,#fc6565,#e43030);

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

function App() {
const [datas,setDatas] = useState()
const [max,setMax] = useState(199) //Dry 120-200
const [min,setMin] = useState(68) //Wet 64-70
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
 }, 1000);

}, [])

 


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },

  },
};

const optionsBatt = {
  indexAxis: 'y' ,
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

const data = {
  labels:datas?.slice(-range).map((d) => d?.Time),
  datasets: [
    {
      label: 'Temperature Level',
      data:  datas?.slice(-range).map((d) => d?.Temp),
      borderColor: '#ff4141',
      backgroundColor: '#ff4141',
    },
    {
      label: 'Moisture Level',
      data:  datas?.slice(-range).map((d) => d?.Moisture),
      borderColor: '#006b8a',
      backgroundColor: '#006b8a',
    },

  ],
};

const handleRangeFilterBack=()=>{

setRange(range + 5)
}
const handleRangeFilterReset=()=>{

  setRange(10)
  }
  
  const theme = {
    mh:`${datas?.slice(-1)[0]?.Moisture}px`,
    mc:`180deg,#0088b0,#005a74`,

    bh:`${datas?.slice(-1)[0]?.Batt}px!important`,
    bc:`180deg,#7adb76,#057101`,

    th:`${datas?.slice(-1)[0]?.Temp}px!important`,
    tc:` 180deg,#fc6565,#e43030`,
  }


  return (
    <ThemeProvider theme={theme}>
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
      <h2>Battery</h2>
      <BarStyled> 
    
        <Bar options={optionsBatt} data={dataBatt} /></BarStyled>
     
        <h2>Moisture</h2>
        <Line data={data} options={options}/>
        </ChartHolder>

        
        </div>
    </Root>
    </ThemeProvider> 
  );
}

export default App;

