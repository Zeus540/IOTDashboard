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

`;

const TabsHolder = styled.div`

flex-wrap: wrap;
align-items: end;
  display: flex;
  max-width: 1770px;
  width: 100%;
  z-index: 5;

`;
const TabActive = styled.div`
border-radius: 5px 0px 0px 0px;
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

  cursor: pointer;
 
  color: black;

  padding: 5px 20px;
  height: fit-content;
  border-bottom: 4px solid white;
  @media (max-width: 425px) {
    border-bottom: 4px solid white;
 
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
        },
      
      ]

    const params = useParams();
    const navigate = useNavigate ()
    const location =useLocation()
    let path = location.pathname.toLowerCase().split("/")[1]
    const [tabList, setTabList] = useState(tabs)
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

  return (
    <TabsHolderOutter>
    <TabsHolder>

    {tabList?.map((tab,index)=>{
       return(
        <div key={index}>
         {
            
           tab?.active == true ?  
           <TabActive  onClick={()=>{handleClick(tabList,tab)}}>{tab.tabName}</TabActive> : 
           <TabInActive  onClick={()=>{handleClick(tabList,tab)}}>{tab.tabName}</TabInActive>
         }
        </div>
        
       )
       })
       }
       </TabsHolder>
       </TabsHolderOutter>
  )
}

export default Tabs