import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {useNavigate} from 'react-router-dom'

const TabsHolderOutter = styled.div`
position: sticky;
top: 70px;
align-items: end;
  display: flex;
  max-width: 1770px;
  width: 100%;
  z-index: 5;
  overflow: hidden;
  border-radius: 5px;
`;

const TabsHolder = styled.div`


align-items: end;
  display: flex;
  max-width: 1770px;
  width: 100%;
  z-index: 5;

`;
const TabActive = styled.div`
border-radius: 5px 5px 0px 0px;
  cursor: pointer;
  padding: 5px 20px;
  background: #ffffff;
  font-weight: bold;
  border-bottom: 4px solid #8bab50;
  @media (max-width: 425px) {
    border-bottom: 4px solid #8bab50;
 
  }

`;
const TabInActive = styled.div`
border-radius: 5px 5px 0px 0px;
  cursor: pointer;
  background: #39595b;
  color: white;

  padding: 5px 20px;
  height: fit-content;
  border-bottom: 4px solid #39595b;
  @media (max-width: 425px) {
    border-bottom: 4px solid #39595b;
 
  }
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
        }
      ]

    const params = useParams();
    const navigate = useNavigate ()
    const location =useLocation()
    let path = location.pathname.toLowerCase().split("/")[1]
    const [tabList, setTabList] = useState(tabs)
 
    
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

  return (
    <TabsHolderOutter>
    <TabsHolder>

    {tabList?.map((tab,index)=>{
       return(
        <>
         {
            
           tab?.active == true ?  
           <TabActive key={index} onClick={()=>{handleClick(tabList,tab)}}>{tab.tabName}</TabActive> : 
           <TabInActive key={index} onClick={()=>{handleClick(tabList,tab)}}>{tab.tabName}</TabInActive>
         }
        </>
        
       )
       })
       }
       </TabsHolder>
       </TabsHolderOutter>
  )
}

export default Tabs