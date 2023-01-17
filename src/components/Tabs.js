import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../context/auth_context";



const TabsHolderOutter = styled.div`

top: 70px;
align-items: end;
  display: flex;
  max-width: 1770px;
  width: 100%;
  z-index: 5;
  overflow: hidden;
  @media (min-width: 769px) {
    padding: 20px 0px;
 
  }

`;

const TabsHolder = styled.div`

transform: ${({tabListPositon}) => `translateX(${tabListPositon}%)`};
align-items: end;
  display: flex;
  max-width: 1770px;
  width: 100%;
  z-index: 5;
  transition: 0.5s all ease-in;
  overflow: auto;
  @media (min-width: 426px) {
    overflow: unset;
  
  }
`;


const TabsHolderNext = styled.div`
z-index: 6;
background: #8bab50;
padding: 10px 15px;
display: flex;

border-radius: 5px 0px 5px 0px;

@media (max-width: 425px) {
  display: none;

}
`;

const TabsHolderNextMobile = styled.div`
z-index: 6;
background: #8bab50;
padding: 10px 15px;
display: flex;

border-radius: 5px 0px 5px 0px;

@media (min-width: 426px) {
  display: none;

}
`;
const TabActive = styled.div`

text-align: center;
  cursor: pointer;
 
  color: black;
  font-weight: bold;
  padding: 10px 20px;
  height: fit-content;



`;
const TabInActive = styled.div`


text-align: center;
  cursor: pointer;
 
  color: black;

  padding: 10px 20px;
  height: fit-content;

`;

const TabActiveOutter = styled.div`

min-width: calc(100% / 3);


`;

const Svg = styled.svg`
width: 20px;
fill: white;
`;
const Tabs = () => {

    let tabs = [
        {
          tabName:'Overview',
          active:false
        },
        {
          tabName:'Environment',
          active:false
        }
        ,
        {
          tabName:'Harvest',
          active:false
        }
        ,
        {
          tabName:'Journal',
          active:false
        },
      
      ]

    const params = useParams();
    const navigate = useNavigate ()
    const location =useLocation()
    let path = location.pathname.toLowerCase().split("/")[1]
    const [tabList, setTabList] = useState(tabs)
    const [tabListPositon, setTabListPositon] = useState(0)
    const [tabListIndex, setTabListIndex] = useState(0)
    const { auth,authToken,userId } = useContext(AuthContext);
    
    useEffect(() => {
        setTabList(tabs)
    }, [path])
    
    
useEffect(() => {

  for (let index = 0; index < tabList.length; index++) {
    const element = tabList[index];

   if( element.tabName.toLowerCase() == path  ){
   
    element.active = true
    
    
  }

  setTabList(tabList)
}

  }, [tabList])

  useEffect(() => {
   
}, [tabList])
  
  const handleClick =(tabList,tab)=>{


    switch (tab.tabName) {
        
      case "Environment":
        navigate(`/environment/${params.id}`)
       
        break;

        case "Overview":
          navigate(`/overview/${params.id}`)
          break;
        
          case "Harvest":
            navigate(`/harvest/${params.id}`)
            break;

            case "Journal":
            navigate(`/journal/${params.id}`)
            break;
            
            
    }
    
}

const handleNextTab =()=>{
  setTabListIndex(tabListIndex + 1)

  if(tabListIndex == tabList.length - 3){
    setTabListPositon(0)
    setTabListIndex(0)
  }else{
    setTabListPositon(tabListPositon  - ( 100 / 3))

  }

}

  return (
    <TabsHolderOutter>
        <TabsHolderNext onClick={()=>{handleNextTab()}}>
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></Svg>
    </TabsHolderNext>
    <TabsHolderNextMobile >
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></Svg>
    </TabsHolderNextMobile>
    
    <TabsHolder tabListPositon={tabListPositon} className="TabsHolder">
  

    {tabList?.map((tab,index)=>{
       return(
        <TabActiveOutter key={index}>
         {
            
           tab?.active == true ?  
           <TabActive  onClick={()=>{handleClick(tabList,tab)}}>{tab.tabName}</TabActive> : 
           <TabInActive  onClick={()=>{handleClick(tabList,tab)}}>{tab.tabName}</TabInActive>
         }
        </TabActiveOutter>
        
       )
       })
       }

       </TabsHolder>

       </TabsHolderOutter>
  )
}

export default Tabs