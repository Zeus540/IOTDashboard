import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "../components/shared/axios";
import { DiaryContext } from "../context/diary_context";
import IndoorIcon from "../assets/sweetleaf-icons/indoors.svg"

import {useNavigate} from 'react-router-dom'
import {BASE_URL_PROD} from '../components/shared/Constants'

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
  justify-content: center;
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
  border-radius: 5px 5px 5px 5px;
  width: 100%;
  background: #ffffff;
  padding: 20px 0px;
  padding-top:0px;
  margin: 80px auto;
  @media (max-width: 425px) {
    margin: 0px auto;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px auto;
  }
`;

const TextHeading = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const TextHolderGroup2 = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  color: #8bab50;
  background: ghostwhite;
  padding: 10px ;
  line-height: 20px;
  margin: 10px;
  border-radius: 5px;
  min-width: calc(100% / 5 - 40px);
  max-width: calc(100% / 5 - 40px);
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

const Button = styled.button`
padding: 5px 25px;
background: #596876;
color: white;
border: none;
border-radius: 5px;
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
const Harvest = () => {
 


  const { diaries,diariesPublic } = useContext(DiaryContext);
  const [harvestData, setHarvestData] = useState([]);
  const [activeDiary, setActiveDiary] = useState([]);
  const [activeDiaryData, setActiveDiaryData] = useState([]);
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
    document.title = "Sweet Leaf - " + filtered?.Title + " Havest" ;
    setActiveDiary(filtered);
  }, [diaries,diariesPublic])


  useEffect(() => {

    axios
    .get(`${BASE_URL_PROD}/harvest`)
    .then(function (response) {
      console.log("before",response.data);
      console.log("after",response?.data?.filter((d) => d?.DiaryId == parseInt(params?.id)));
      console.log("params",parseInt(params?.id));
      setHarvestData(response.data.filter((d)=> d?.DiaryId ==  parseInt(params?.id))[0])
    })
    .catch(function (error) {
      
    });

  }, []);




  return (

  
    <Root>
      {/* <InnerButtonHolder>
      <Button onClick={()=>HandleBackToPreviousPage()}>Back</Button>
      </InnerButtonHolder> */}

      <Inner>
 
           
      <Heading>OUTCOME </Heading>
        <Flex2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Wet Weight</TextHeading>
                  {console.log("harvestData",harvestData)}
         {harvestData?.Wet_Weight} g
            </TextHolderGroup2Inner>
          </TextHolderGroup2>
          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Dry Weight</TextHeading>
            {harvestData?.Dry_Weight} g
            </TextHolderGroup2Inner>
          </TextHolderGroup2>

          <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Total Days</TextHeading>
            {harvestData?.Total_Days}
            </TextHolderGroup2Inner>
          </TextHolderGroup2>

        <TextHolderGroup2>
          <TextHolderGroup2Inner>
            <TextHeading>Plants Harvested</TextHeading>
            {harvestData?.Plants_Harvested}
            </TextHolderGroup2Inner>
          </TextHolderGroup2>

          
        </Flex2>


        
        <Heading>Smells Like </Heading>
        <Flex2>
      
          
        </Flex2>

        <Heading>Nutrients</Heading>
        <Flex2>
      
          
        </Flex2>


      </Inner>
    </Root>
   
  );
};

export default Harvest;


