
import axios from 'axios';
import { useEffect,useState} from 'react';
import './App.css';
import { Line,Bar } from 'react-chartjs-2';
import styled from 'styled-components';

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
color:white;
min-height: 100vh;
`;


const Heading = styled.h1`

padding: 20px;
color:white;
`;
const Text = styled.p`

margin-top: 0px;

`;

const Holder = styled.div`
background: #d1e5ff;
padding: 20px;
border-radius: 5px;
margin-bottom:40px;
width:calc(100%/3 - 60px);
overflow: hidden;
position:relative;
margin-right:20px;
@media(max-width:426px){
  width:100%;
  margin-right:0px;
}
`;
const TextHolder = styled.div`
position:relative;
z-index:20px;
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
const Code = styled.div`
position:absolute;
top: -25px;
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
background: linear-gradient(180deg,#006b8a,#015871);

border:none;
cursor:pointer;
color:white;
@media(max-width:426px){
  width: 46%;
  margin-right:0px;
}
`;
const Battery = styled.div`
height: 80%;
width:100%;
position:absolute;
bottom:0;
left:0;
background: linear-gradient(180deg,#7adb76,#057101);
`;
const ChartHolder = styled.div`
text-align:left;
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
    // handle success
    setDatas(response.data)
  console.log(response.data)
   
    
  })
  .catch(function (error) {
    // handle error
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




  return (
    <Root className="App">
        <Heading>
         IoT Plant Dashboard
        </Heading>
        <div>
       
      
       <Flex>
       <Holder>
        

        <div class="ocean">
          <div class="wave"></div>
          <div class="wave"></div>
        </div>

     <TextHolder>
   
     <Text>Water Level</Text>
     {datas?.map((d,index)=>{
            if (index + 1 === datas.length) {
              return(
                <>
          
            
           
                {d?.Moisture}%
          
                </>
              )
            } else {
           
            }
       
        })}
     </TextHolder>
      </Holder>
      
      <Holder>
      

        <Battery >
        
        </Battery>

     <TextHolder>
     <Text> Battery Level</Text>
     {datas?.map((d,index)=>{
            if (index + 1 === datas.length) {
              return(
                <>
                 
                 {d?.Batt}%
          
                </>
              )
            } else {
           
            }
       
        })}
     </TextHolder>
      </Holder>
      <Holder>
        

        <div class="temp">
   

        </div>

     <TextHolder>
     <Text>Temperature</Text>
     {datas?.map((d,index)=>{
            if (index + 1 === datas.length) {
              return(
                <>
               
          
                {d?.Temp}&#8451;
          
                </>
              )
            } else {
           
            }
       
        })}
     </TextHolder>
      </Holder>
       </Flex>
      <ButtonHolder>
      <Button onClick={()=>{handleRangeFilterReset()}}>Reset</Button>
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
  );
}

export default App;
