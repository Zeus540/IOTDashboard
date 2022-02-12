
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
width:calc(100%/3);
overflow: hidden;
position:relative;
@media(max-width:426px){
  width:unset
}
`;
const TextHolder = styled.div`
position:relative;
z-index:20px;
`;



function App() {
  var d = new Date();
const [datas,setDatas] = useState()
const [labels,setLabels] = useState([])
const [max,setMax] = useState(199) //Dry 120-200
const [min,setMin] = useState(68) //Wet 64-70


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
console.log("response.data",datas?.map((d) => d.Time));
 
useEffect(() => {
  var d = new Date();
  let m = Math.random()
    let obj ={name:"name",time:d.toLocaleTimeString()}
  setLabels([...labels,obj])

}, [datas])

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
  labels:datas?.map((d) => d.Time),
  datasets: [
    {
      label: 'Temp',
      data:  datas?.map((d) => d?.Temp),
      borderColor: 'red',
      backgroundColor: 'red',
    },
    {
      label: 'Moisture',
      data:  datas?.map((d) => d?.Moisture),
      borderColor: 'blue',
      backgroundColor: 'blue',
    },
  ],
};


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
       
      
        <Holder>
        

          <div class="ocean">
            <div class="wave"></div>
            <div class="wave"></div>
          </div>

       <TextHolder>
       <p>Pot #1</p>
       {datas?.map((d,index)=>{
              if (index + 1 === datas.length) {
                return(
                  <>
                  {getMoisture(d)}
              
                  Water Level<br/>
                  {d?.perc}
            
                  </>
                )
              } else {
             
              }
         
          })}
       </TextHolder>
        </Holder>

        <Line data={data} options={options}/>
        </div>
    </Root>
  );
}

export default App;
