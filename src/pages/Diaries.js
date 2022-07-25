import React,{useContext,useState} from 'react'
import styled from "styled-components";
import { DiaryContext } from '../context/diary_context'
import PlaceHolder from '../assets/placeholder.png'
import {useNavigate} from 'react-router-dom'

const Root = styled.div`
 margin-top:50px;

  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  box-shadow: 2px 2px 20px 4px #a9a9a966;
  max-width: 1770px;
  border-radius: 10px;
  width: 100%;
  background: #d6d0bb;
  padding: 20px;
  @media(max-width:425px){
    margin: 16px;
  padding: 20px;
  }
  @media(min-width:426px) and (max-width:768px){
    margin: 16px;
    padding: 20px;
  }
 
`;

const MainHeading = styled.div`
 
 margin: 20px 0px;
 font-size: 40px;
 margin-top:0px;
`   ;


const DiaryHolder = styled.div`
display: flex;

`;

const Diary = styled.div`

background: #f2f2f2;
width: calc(100% / 4 - 20px);
margin: 10px;
border-radius: 10px;
@media(max-width:425px){
  width: unset;
  margin: unset;
}
@media(min-width:426px) and (max-width:768px){
  width: unset;
}

`;

const DiaryImageHolder = styled.div`

border-radius: 10px 10px 0px 0px;
`;

const DiaryImage = styled.img`

border-radius: 10px 10px 0px 0px;
`;
const DiaryTextHolder = styled.div`
padding: 15px 15px;

`;

const Tag = styled.sup`

margin-right: 10px;
padding: 3px 10px;
font-size: 10px;
display: block;
border-radius: 50px;
color: white;
background:#BC4749;

`;

const TagHolder = styled.div`
display: flex;
margin-bottom:10px

`;
const Diaries = () => {

    const {diaries} = useContext(DiaryContext)
    const [diaryList,setDiaryList] = useState(diaries)
    const navigate = useNavigate ()
   

    const handleClick =(d)=>{
        navigate(`/diaries/${d.DiaryId}`)
    }

  return (
    <Root>
        <Inner>
   <MainHeading>
   Diaries
   </MainHeading>

    <DiaryHolder>
        {diaries?.map((d)=>{
            return(
                <Diary onClick={()=>{handleClick(d)}}>
                   
                    <DiaryImageHolder> <DiaryImage src={d?.ThumbNail == "" ?   PlaceHolder : d?.ThumbNail} width="100%"/></DiaryImageHolder>
                   
                    <DiaryTextHolder>
                    <TagHolder>
                    <Tag> {d?.Strain}</Tag><Tag> {d?.Room_Type}</Tag>  <Tag> {d?.Start_Date?.split("T")[0]}</Tag>
                    </TagHolder>
                    <div>{d?.Title}</div>
                 
                    </DiaryTextHolder>
                </Diary>
            )
        })}
    </DiaryHolder>
    </Inner>
    </Root>
  )
}

export default Diaries