
import axios from 'axios';
import { useEffect,useState} from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
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

`;
const Code = styled.div`
position:absolute;
top: -25px;
`;

const Button = styled.button`
margin-right:20px;
padding:10px 40px;
border-radius:30px;
background: linear-gradient(180deg,#006b8a,#015871);

border:none;
cursor:pointer;
color:white;
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
    title: {
      display: true,
      text: 'Pot #1',
    },
  },
};

const data = {
  labels:datas?.slice(-range).map((d) => d.Time),
  datasets: [
    {
      label: 'Temperature',
      data:  datas?.slice(-range).map((d) => d?.Temp),
      borderColor: '#ff4141',
      backgroundColor: '#ff4141',
    },
    {
      label: 'Moisture',
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


const getMoisture =(d)=>{

  if(d.Moisture <= min ){
    d.perc = "100%"
  }
  if(d.Moisture > min && d.Moisture <= 75 ){
    d.perc = "90%"
  }
  if(d.Moisture > min && d.Moisture > 75 && d.Moisture <= 85){
    d.perc = "80%"
  }
  if(d.Moisture > min && d.Moisture > 85 && d.Moisture <= 95){
    d.perc = "70%"
  }
  if(d.Moisture > min && d.Moisture > 95 && d.Moisture <= 105){
    d.perc = "60%"
  }
  if(d.Moisture > min && d.Moisture > 105 && d.Moisture <= 115){
    d.perc = "50%"
  }
  if(d.Moisture > min && d.Moisture > 115 && d.Moisture <= 120){
    d.perc = "40%"
  }
  if(d.Moisture > min && d.Moisture > 120 && d.Moisture <= 130){
    d.perc = "30%"
  }
  if(d.Moisture > min && d.Moisture > 130 && d.Moisture <= 140){
    d.perc = "20%"
  }
  if(d.Moisture > min && d.Moisture > 140 && d.Moisture <= 150){
    d.perc = "10%"
  }
  if(d.Moisture >= max ){
    d.perc = "0%"
  }
  
 
 

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
       <Code>Pot #1 </Code>
     <p>Water Level</p>
     {datas?.map((d,index)=>{
            if (index + 1 === datas.length) {
              return(
                <>
                {getMoisture(d)}
            
           
                {d?.perc}
          
                </>
              )
            } else {
           
            }
       
        })}
     </TextHolder>
      </Holder>
      
      <Holder>
      

        <div class="battery">
        
        </div>

     <TextHolder>
     <p> Battery Level</p>
     {datas?.map((d,index)=>{
            if (index + 1 === datas.length) {
              return(
                <>
                80%
          
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
     <p>Temperature</p>
     {datas?.map((d,index)=>{
            if (index + 1 === datas.length) {
              return(
                <>
                {getMoisture(d)}
          
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
        <Button onClick={()=>{handleRangeFilterBack()}}>Back</Button>
        <Button onClick={()=>{handleRangeFilterReset()}}>Reset</Button>
      </ButtonHolder>
        <Line data={data} options={options}/>
        </div>
    </Root>
  );
}

export default App;
