import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { DiaryContext } from "../context/diary_context";
import { AuthContext } from "../context/auth_context";

import IndoorIcon from "../assets/sweetleaf-icons/indoors.svg"
import Tabs from "../components/Tabs";
import {useNavigate} from 'react-router-dom'


const Root = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 425px) {
    margin: 0px 10px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;

const Flex2 = styled.div`
padding:20px;
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
    background: #39595b;
    height: 2px;
    width: 15%;
    margin: 0px 20px;
  }
  &::after {
    content: "";
    display: block;
    background: #39595b;
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
  background: #39595b;
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

const Button = styled.button`
padding: 10px 40px;
background: #39595b;
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

const NoteHolderOutter = styled.div`
padding: 10px;
background: #e2e2e247;

`;
const NoteHolder = styled.div`
padding: 10px;


`;

const NoteHolderText = styled.div`
padding: 5px 20px;
border-bottom: 2px #8bab50 solid;
`;

const WeekHolderOutter = styled.div`
margin: 10px 0px;
display: flex;
flex-wrap: wrap;
background: #39595b;
border-radius: 5px;
`;

const WeekHolder = styled.div`
width: fit-content;
text-align: center;
border-radius: 5px;
margin: 10px 10px;
min-width: 70px;
background: #c5c5c5;
cursor: pointer;
opacity:0.5;
display: flex;
flex-direction: column;
justify-content: space-between;
&:hover {
  opacity: 1;

}
`;

const WeekHolderActive = styled.div`
  width: fit-content;
  text-align: center;
  border-radius: 5px;
  margin: 10px 10px;
  min-width: 70px;
  background: #c5c5c5;
  cursor: pointer;
  
  transition: all 0.2s ease;
  display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const WeekHolderInner = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap:wrap;
  width: 40%;
  margin: 0 auto;
  @media (min-width: 0px) and (max-width: 1220px) {
    width: 100%;
  }
`;

const WeekHolderText = styled.div`
  text-align: center;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
`;

const WeekHolderTextSub = styled.div`
  text-align: center;
`;

const WeekHolderHeading = styled.div`
  background: #8bab50;
  border-radius: 0px 0px 5px 5px;
  padding: 5px 10px;
  color: white;
  font-size: 12px;
`;
const WeekHolderHeadingRed = styled.div`
  background: #de8605;
  border-radius: 0px 0px 5px 5px;
  padding: 5px 10px;
  color: white;
  font-size: 12px;
`;


const WeekHolderHeadingBlue = styled.div`
  background: #5db7ff;
  border-radius: 0px 0px 5px 5px;
  padding: 5px 10px;
  color: white;
  font-size: 12px;
`;

const Helper = styled.p`
text-align:center
`;


const Notes = () => {
 


  const { diaries } = useContext(DiaryContext);
  const [noteData, setNoteData] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [activeWeekId, setActiveWeekId] = useState([]);
  const [activeWeek, setActiveWeek] = useState([]);
  
  const [activeDiary, setActiveDiary] = useState([]);
  const [activeDiaryData, setActiveDiaryData] = useState([]);
  const params = useParams();
  const navigate = useNavigate ()
  const { auth,authToken,userId } = useContext(AuthContext);

  useEffect(() => {
    let filtered = diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    setActiveDiary(filtered);
    

  }, [diaries]);

  useEffect(() => {


    let config = {
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }
    let dataSend = {
      DiaryId:parseInt(params?.id)
    }
    let data = []
    axios
    .post("https://api.sweetleaf.co.za/notes/all",dataSend,config)
    .then(function (response) {
      setNoteData(response.data)

    }).then(()=>{
      axios
      .post("https://api.sweetleaf.co.za/weeks",dataSend,config)
      .then(function (response) {
        setWeeks(response?.data)

    
      })
     
    })
    .catch(function (error) {
      
    });

 

  }, [activeDiary]);




  const HandleBackToPreviousPage = ()=>{
    navigate(-1)
    }
  


      const HandleActiveWeek = (w) => {
        setActiveWeek(w)
        setActiveWeekId(w.WeekId)
      };

      useEffect(() => {
        {console.log(activeWeek)}
      }, [activeWeek])
      
  return (

  
    <Root>
      <InnerButtonHolder>
      <Button onClick={()=>HandleBackToPreviousPage()}>Back</Button>
      </InnerButtonHolder>
   <Tabs/>
      <Inner>
   
      {activeWeek.length == 0 && <Helper>Select a Week</Helper>}
      <Heading>Journal </Heading>
        <Flex2>
      
          <WeekHolderInner>
        {weeks?.map((w,index)=>{
          return(
         <>
         {activeWeek !== w ? 
                    <WeekHolder
                      onClick={() => {
                        HandleActiveWeek(w);
                      }}
                      key={index}
                    >
                      <WeekHolderText>
                        
                        <WeekHolderTextSub>Week</WeekHolderTextSub>
                        <div>{w.Stage.toUpperCase() == "GER" ? "G" : w.Week}</div>
                      </WeekHolderText>

                    {w.Stage.toUpperCase() == "GER" &&
                    <WeekHolderHeadingBlue>
                   {w.Stage.toUpperCase()}
                  </WeekHolderHeadingBlue>
                      }

                    {w.Stage.toUpperCase() ==  "VEG"  &&
                    <WeekHolderHeading>
                    {w.Stage.toUpperCase()}
                  </WeekHolderHeading>
                      }

                    {w.Stage.toUpperCase() ==  "FLO"  &&
                    <WeekHolderHeadingRed>
                    {w.Stage.toUpperCase()}
                  </WeekHolderHeadingRed>
                      }

                    </WeekHolder>:
                    <WeekHolderActive
                      onClick={() => {
                        HandleActiveWeek(w);
                      }}
                      key={w.Week + 1}
                    >
                          <WeekHolderText>
                        
                        <WeekHolderTextSub>Week</WeekHolderTextSub>
                        <div>{w.Stage.toUpperCase() == "GER" ? "G" : w.Week}</div>
                      </WeekHolderText>

                {w.Stage.toUpperCase() == "GER" &&
                    <WeekHolderHeadingBlue>
                   {w.Stage.toUpperCase()}
                  </WeekHolderHeadingBlue>
                      }

                    {w.Stage.toUpperCase() ==  "VEG"  &&
                    <WeekHolderHeading>
                    {w.Stage.toUpperCase()}
                  </WeekHolderHeading>
                      }

                    {w.Stage.toUpperCase() ==  "FLO"  &&
                    <WeekHolderHeadingRed>
                    {w.Stage.toUpperCase()}
                  </WeekHolderHeadingRed>
                      }
                        
                     
                    </WeekHolderActive>}</>
          )
        })}
</WeekHolderInner>



{activeWeek.WeekId   &&
  <NoteHolderOutter>
        {noteData?.filter((n)=> n.WeekId == activeWeekId).map((n)=>{
          return(
            <NoteHolder>
             {console.log(noteData)}
              <div>
                
              {n.DayId}
              </div>
              <NoteHolderText>
              {n.Notes}
              </NoteHolderText>
            
          
            </NoteHolder>
          )
        })}

</NoteHolderOutter>

}
        </Flex2>


    



      </Inner>
    </Root>
   
  );
};

export default Notes;


