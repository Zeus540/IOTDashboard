
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
background: #2f2f2f;
padding: 20px;
color:white;
min-height: 100vh;
`;


const Heading = styled.h1`
background: #2f2f2f;
padding: 20px;
color:white;
`;
const Holder = styled.div`
background: #01a001;
padding: 20px;
border-radius: 5px;
margin-bottom:40px;
width:calc(100%/3)
@media(max-width:426px){
  width:calc(100%/1)
}
`;




function App() {
  var d = new Date();
const [datas,setDatas] = useState()
const [labels,setLabels] = useState([])
const [max,setMax] = useState(120) //Dry 120-200
const [min,setMin] = useState(64) //Wet 64-70


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
  if(d.Moisture < max ){
    d.status = "Wet"

  }

  if(d.Moisture >= max ){
    d.status = "Dry"

  }

}

  return (
    <Root className="App">
        <Heading>
         IoT Plant Dashboard
        </Heading>
        <div>
       
      
        <Holder>
          <p>Plant 1</p>
          {datas?.map((d,index)=>{
              if (index + 1 === datas.length) {
                return(
                  <>
                  {getMoisture(d)}
                  {d.status}
                  {console.log('adadasdas',d.status)}
                  </>
                )
              } else {
                // Not last one.
              }
         
          })}
        </Holder>

        <Line data={data}/>
        </div>
    </Root>
  );
}

export default App;
