import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { DiaryContext } from "../context/diary_context";
import IndoorIcon from "../assets/sweetleaf-icons/indoors.svg"
import Tabs from "../components/Tabs";
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
`;

const Heading = styled.h4`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  display: flex;
  margin-bottom: 10px;
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
  border-radius: 0px 5px 5px 5px;
  width: 100%;
  background: #ffffff;
  padding: 20px 0px;
  padding-top:0px;
  @media (max-width: 425px) {

  }
  @media (min-width: 426px) and (max-width: 768px) {

  }
`;

const TextHeading = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const TextHolderGroup2 = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  color: #8bab50;
  background: #596876;
  padding: 15px 15px;
  line-height: 25px;
  margin: 15px;
  border-radius: 5px;
  min-width: calc(100% / 5 - 60px);
  max-width: calc(100% / 5 - 60px);
  @media (max-width: 425px) {
    min-width: calc(100% / 2 - 50px);
    padding: 10px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
  }
`;


const TextHolderGroup2Inner = styled.div`
  width: 100%;

`;

const PlantContainer = styled.div`
  width: calc(100% / 1 - 20px);
  margin: 10px;
  background: #a7a7a7;
  height: 150px;
  border-radius: 62%;
  min-width: 150px;
`;

const PlantContainerHolder = styled.div`

  padding:10px;
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr) ;
  grid-template-rows:repeat(${props => props.rows}, 1fr);
  border: 5px solid #536262;
  margin: 0px 20px;
  background: #536262;
  border-radius: 5px;
  width: fit-content;
  @media (max-width: 425px) {
    width: unset;
  }

`;


const PlantContainerNumber = styled.div`
background: white;
padding: 10px;
width: 20px;
height: 20px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;

`;

const Button = styled.button`
padding: 5px 25px;
background: #596876;
color: white;
border: none;
border-radius: 50px;
cursor: pointer;
align-self: self-start;

margin-top: 20px;
`;


const InnerButtonHolder = styled.div`
max-width: 1770px;
border-radius: 0px 5px 5px 5px;
width: 100%;

padding: 20px 0px;
padding-top:0px;
@media (max-width: 425px) {
  margin: 0px;
  padding-top: 0px;
}
@media (min-width: 426px) and (max-width: 768px) {
  margin: 0px;
  padding-top: 0px;
}
`;

const Stats = () => {
 


  const { diaries,diariesPublic } = useContext(DiaryContext);
  const [activeDiary, setActiveDiary] = useState([]);
  const [activeDiaryData, setActiveDiaryData] = useState([]);
  const [layout, setLayout] = useState({});
  const [amountOfPlants, setAmountOfPlants] = useState([1,2,1,2]);

  const params = useParams();
  const navigate = useNavigate ()

  useEffect(() => {
    let filtered = ""
    if( diariesPublic?.filter((d) => d.DiaryId == parseInt(params?.id))[0]){
      filtered =  diariesPublic?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    }
    if( diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0]){
      filtered =  diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    }

    document.title = "Sweet Leaf - " + filtered?.Title + "  Environment" ;
    setActiveDiary(filtered);
  }, [diaries,diariesPublic])




  return (

  
    <Root>
         {/* <InnerButtonHolder>
      <Button onClick={()=>HandleBackToPreviousPage()}>Back</Button>
      </InnerButtonHolder> */}

      <Inner>
      <Tabs/>
           
           {/* <PlantContainerHolder layout={layout} columns={layout.columns} rows={layout.rows}>

            {amountOfPlants.map((v,index)=>{
              return(
                <PlantContainer key={index}>
           <PlantContainerNumber>
           {v}
           </PlantContainerNumber>
                </PlantContainer>
              )
            })}
      
          
           </PlantContainerHolder> */}

      <Heading> Grow environment </Heading>
        <Flex2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
    
            <TextHeading>Strain</TextHeading>
               
            {activeDiary?.Strain}
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
       

            <TextHeading>Light Schedule</TextHeading>
            {activeDiary?.Light_Schedule}
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
           
   
            <TextHeading>Light Type</TextHeading>
            {activeDiary?.Light_Type}
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <img src={IndoorIcon} width='50px'/>
          <TextHolderGroup2Inner>
       
      
            <TextHeading>Room Type</TextHeading>
            {activeDiary?.Room_Type}
          </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
         
       
            <TextHeading>Pot Size</TextHeading>
            {activeDiary?.Pot_Size}
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Co2</TextHeading>
            {activeDiaryData?.Co2 == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Co2} PPM</>
            )}
              
                </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Moisture</TextHeading>
            {activeDiaryData?.Moisture == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Moisture} %</>
            )}
             
              </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Temperature</TextHeading>
            {activeDiaryData?.Temperature == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Temperature} &#8451;</>
            )}
                  
                </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
          <TextHeading>Humidity</TextHeading>
            {activeDiaryData?.Humidity == 0 ? (
              "N/A"
            ) : (
              <>{activeDiaryData?.Humidity} %</>
            )}
             
                  </TextHolderGroup2Inner>
                  
          </TextHolderGroup2>

        

          
        </Flex2>

      </Inner>
    </Root>
   
  );
};

export default Stats;


