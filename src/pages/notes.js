import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "../components/shared/axios";
import { DiaryContext } from "../context/diary_context";
import { AuthContext } from "../context/auth_context";
import { useSnackbar} from 'notistack';
import IndoorIcon from "../assets/sweetleaf-icons/indoors.svg"

import {useNavigate} from 'react-router-dom'
import {BASE_URL_PROD} from '../components/shared/Constants'

const Root = styled.div`


  @media (max-width: 425px) {
    margin: 0px 0px;
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
  margin: 0px;
  padding-top: 20px;
  align-items: center;
  &::before {
  content: "";
    display: block;
    background: #8bab50;
    height: 4px;
    border-radius: 50px;
    width: 15%;
    margin: 0px 20px;
  }
  &::after {
    content: "";
    display: block;
    background: #8bab50;
    height: 4px;
    border-radius: 50px;
    width: 15%;
    margin: 0px 20px;
  },

`;



const Inner = styled.div`

  border-radius: 5px 5px 5px 5px;

  background: #ffffff;
  padding: 20px 0px;
  padding-bottom: 0px;
  margin: 40px auto;
  max-width: 1770px;
  @media (max-width: 425px) {
    margin: 20px;
    padding-top: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 20px;
    padding-top: 0px;
  }
  @media (min-width: 769px) and (max-width: 1770px) {
    margin: 40px 40px;
  }

`;
const NoteHolderOutter = styled.div`
padding: 10px 0px;


`;
const NoteHolder = styled.div`
padding: 15px;
background: #f5f5f5;
margin-bottom: 20px;
border-bottom: 4px #8bab50 solid;
border-radius: 5px;
`;

const NoteHolderText = styled.div`
padding: 15px 0px;
padding-bottom: 0px;

`;

const WeekHolder = styled.div`
width: fit-content;
text-align: center;
border-radius: 5px;
margin: 10px 10px;
max-width: 70px;
width: calc(100% / 4 - 20px);
background: #c5c5c5;
cursor: pointer;
opacity:0.5;
display: flex;
flex-direction: column;
justify-content: space-between;
&:hover {
  opacity: 1;

}
@media (min-width: 0px) and (max-width: 375px) {
  width: calc(100% / 3 - 20px);
}
`;

const WeekHolderActive = styled.div`
  width: fit-content;
  text-align: center;
  border-radius: 5px;
  margin: 10px 10px;
  max-width: 70px;
  width: calc(100% / 4 - 20px);
  background: #c5c5c5;
  cursor: pointer;
  
  transition: all 0.2s ease;
  display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: 0px) and (max-width: 375px) {
      width: calc(100% / 3 - 20px);
    }

`;

const WeekHolderInner = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap:wrap;
  width: 60%;
  margin: 0 auto;
  @media (min-width: 0px) and (max-width: 375px) {
    width: 100%;
  }
  @media (min-width: 376px) and (max-width: 610px) {
    width: 100%;
  }
  @media (min-width: 611px) and (max-width: 768px) {
    width: 70%;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 60%;
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
text-align:center;
margin: 0px;
padding: 16px;

padding-top: 0;

`;

const NoteDay = styled.div`
background: #8bab50;
width: fit-content;
padding: 2px 15px;
border-radius: 5px;
color: white;
font-size: 14px;
`;

const KeyNote = styled.div`
background: #ff4949;
margin-bottom: 15px;
border-radius: 5px;
padding: 0px 0px;
text-transform: uppercase;
color: white;
align-items: center;
display: flex;
max-width: fit-content;
float:right
`;

const KeyNoteText = styled.p`
padding: 0px 10px;
margin: 0px 0px;
font-size: 14px;
`;


const Svg = styled.svg`
fill: white;
width: 24px;
`;

const WeekHolderHeadingRedd = styled.div`
  background: #f44336;
  border-radius: 0px 0px 5px 5px;
  padding: 5px 10px;
  color: white;
  font-size: 12px;
`;
const Notes = () => {
 


  const { diaries,diariesPublic } = useContext(DiaryContext);
  const [noteData, setNoteData] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [activeWeekId, setActiveWeekId] = useState([]);
  const [activeWeek, setActiveWeek] = useState([]);
  const [days, setDays] = useState([]);
  const [activeWeekCheck, setActiveWeekCheck] = useState('');
  
  const [activeDiary, setActiveDiary] = useState([]);
  const [activeDiaryData, setActiveDiaryData] = useState([]);
  const params = useParams();
  const navigate = useNavigate ()
  const { auth,authToken,userId } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    let filtered = ""
    if( diariesPublic?.filter((d) => d.DiaryId == parseInt(params?.id))[0]){
      filtered =  diariesPublic?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    }
    if( diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0]){
      filtered =  diaries?.filter((d) => d.DiaryId == parseInt(params?.id))[0];
    }

    document.title = "Sweet Leaf - " + filtered?.Title + "  Notes" ;
  
  }, [diaries,diariesPublic])

  useEffect(() => {


    let dataSend = {
      DiaryId:parseInt(params?.id)
    }
    
    axios
    .post(`${BASE_URL_PROD}/notes/all`,dataSend)
    .then(function (response) {
      console.log(response.data)
      setActiveWeekCheck(noteData?.filter((n)=> n.WeekId == activeWeekId)[0]?.WeekId)
      setNoteData(response.data?.filter((n)=> n.WeekId == activeWeekId))
 
    }).then(()=>{
      axios
      .post(`${BASE_URL_PROD}/weeks`,dataSend)
      .then(function (response) {
        setWeeks(response?.data)

    
      })
     
    })
    .catch(function (error) {
      enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
    });

 

  }, [activeWeekId]);




      const HandleActiveWeek = (w) => {
        setActiveWeek(w)
        setActiveWeekId(w.WeekId)

        let dataw = {
          WeekId:  w.WeekId,
        };
      
        axios
          .post(`${BASE_URL_PROD}/days`, dataw)
          .then(function (response) {
            console.log("days", response.data);
            setDays(response.data);
          })
          .catch(function (error) {
            enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
            console.log(error);
          });
      
      };

      
      

      const UpdateDay =(day,dayId)=>{
        console.log("day",day)
        for (let index = 0; index < days.length; index++) {
          const element = days[index];

          if(element.DayId == dayId){
           day.DayName = element.Day
          }

        }
        console.log("noteData",noteData)
      }

  return (

  
    <Root>
    

      <Inner>
 

      <Heading>Journal</Heading>

      
        <Flex2>
        {activeWeek.length == 0 && <Helper>Select a Week</Helper>}
          <WeekHolderInner>
        {weeks?.map((w,index)=>{
          return(
         <>
         {activeWeekId !== w.WeekId ? 
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
                       {w.Stage.toUpperCase() == "HAR" &&
                          <WeekHolderHeadingRedd>
                            {w.Stage.toUpperCase()}
                          </WeekHolderHeadingRedd>
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
                        
                        {w.Stage.toUpperCase() == "HAR" &&
                          <WeekHolderHeadingRedd>
                            {w.Stage.toUpperCase()}
                          </WeekHolderHeadingRedd>
                        }
                     
                    </WeekHolderActive>}</>
          )
        })}
</WeekHolderInner>



{activeWeek.WeekId   &&
  <NoteHolderOutter>
        {noteData?.map((n)=>{
          return(
            <NoteHolder>
             {console.log(noteData)}
             {n.KeyNote == 1 && 
               <KeyNote>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></Svg>
            <KeyNoteText>Key Note</KeyNoteText>
                </KeyNote>
             }
           
              <NoteDay>
                { UpdateDay(n,n.DayId)}
             
              {n?.DayName}
              </NoteDay>
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


