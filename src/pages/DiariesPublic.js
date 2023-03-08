import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { DiaryContext } from "../context/diary_context";
import PlaceHolder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import faTrash from "../assets/trash-can-regular.svg";
import { AuthContext } from "../context/auth_context";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import axios from "../components/shared/axios";
import PopUp from "../components/PopUp";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import { TailSpin } from  'react-loader-spinner'


const Root = styled.div`


  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;


const Inner = styled.div`

  border-radius: 5px 5px 5px 5px;

  background: #ffffff;
  padding: 0px 0px;

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


const MainHeading = styled.h1`
  margin: 0px 0px;
  font-size: 20px;
  margin-top: 0px;
  font-weight: bolder;
  margin: 0px 20px;
  //border-bottom: 2px solid #8bab50;
  margin-bottom: 5px;
  @media (max-width: 425px) {
    margin: unset;
    margin-bottom: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: unset;
    margin-bottom: 0px;
  }
`;

const DiaryHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding:0px 10px;

`;

const Diary = styled(NavLink)`
cursor: pointer;
width: calc(100% / 6 - 20px);
margin: 10px;
border-radius: 5px;

text-decoration: none;
color: #354f41;
@media (max-width: 425px) {
  max-width: calc(100% / 1 - 20px);
  width: 100%;
  margin: 10px 10px;
  border-radius: 0px;
}
@media (min-width: 426px) and (max-width: 699px) {
  width: calc(100% / 2 - 20px);
  margin: 10px;
}
  @media (min-width: 700px) and (max-width: 940px) {
    width: calc(100% / 2 - 20px);
  }
  @media (min-width: 941px) and (max-width: 1330px) {
    width: calc(100% / 4 - 20px);
  }
`;

const DiaryImageHolder = styled.div`
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;
  line-height: 0px;
  border-radius: 5px;
  min-height: 190px;
  background-position: center!important;
  background-size: cover!important;
  @media (max-width: 425px) {

    border-radius: 5px;
  }
`;

const DiaryImage = styled.img`
border-radius: 5px;
  @media (max-width: 425px) {

    border-radius: 5px;
  }
`;
const DiaryTextHolder = styled.div`
padding: 5px 0px;
overflow: auto;
`;

const Tag = styled.sup`

  padding: 0px 0px;
  font-size: 11px;
  display: block;


`;

const TagHolder = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Add = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  @media (max-width: 425px) {
    padding:15px 20px;
    padding-bottom: 5px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding:15px 20px;
    padding-bottom: 5px;
  }
`;
const SearchType = styled.div`
  display: flex;
  margin: 0px 0px;
  //box-shadow: 0px 0px 20px #00000012;
  margin-bottom: 15px;
  border-radius: 5px 5px 0px 0px;
  padding-top: 20px;
  align-items: center;
  @media (max-width: 425px) {
    padding-top: 20px;
    margin-bottom: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding-top: 20px;
    margin-bottom: 0px;
  }
`;
const SearchTypeBlock = styled.p`
padding: 5px 20px;
border: 1px solid #354f41;
color:#354f41;
margin-right: 10px;
border-radius: 50px;
font-size: 14px;
cursor: pointer;
:nth-child(1){
  border-radius: 50px;
  padding: 5px 20px;
  margin-left: 20px;
}
  @media (max-width: 425px) {
    padding: 5px 20px;
   
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding: 5px 20px;
  
  }
`;

const SearchTypeBlockActive = styled.p`
padding: 5px 20px;
border: 1px solid #8bab50;
margin-right: 10px;
border-radius: 50px;
color:white!important;
background:#8bab50;
cursor: pointer;
font-size: 14px;
:nth-child(1){
  border-radius: 50px;
  padding: 5px 20px;
  margin-left: 20px;
}
@media (max-width: 425px) {
  padding: 5px 20px;
 
}
@media (min-width: 426px) and (max-width: 768px) {
  padding: 5px 20px;

`;

const Button = styled.button`
padding: 8px 25px;
  background: #354f41;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


const DiaryText = styled.p`
font-size: 14px;
padding-bottom: 5px;
white-space: nowrap;
font-weight: bold;
margin: 0px;
`;

const LoadingHolder = styled.div`

    padding: 40px 0px;
    display: flex;
    justify-content: center;
`;



const Diaries = () => {
  const { diariesPublic, getPublic, loadingPublic } = useContext(DiaryContext);
  const [diaryList, setDiaryList] = useState([]);
  const [diaryHavestList, setDiaryHavestList] = useState([]);
  const [diaryOnGoingList, setDiaryOnGoingList] = useState([]);
  const [diaryMostViewedList, setDiaryMostViewedList] = useState([]);
  const [diaryTypes, setDiaryTypes] = useState([]);
  const [diaryActiveType, setDiaryActiveType] = useState("All");
  const [popUpOffset, setPopUpOffset] = useState(-101);
  const navigate = useNavigate();
  const { auth, authToken,socket } = useContext(AuthContext);
  const params = useParams();

useEffect(() => {
  setDiaryHavestList(diariesPublic.filter((d) => d.HavestId !== null))
  setDiaryOnGoingList(diariesPublic.filter((d) => d.HavestId == null))
  setDiaryMostViewedList(diariesPublic.sort((a, b) => b.DiaryId - a.DiaryId).filter((d) => d.HavestId == null))

  let types = diariesPublic.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.Type === value.Type
    ))
  )
  setDiaryTypes(types)




}, [diariesPublic])


  const setFilter = (type) => {


    if (type == "All") {

      setDiaryActiveType(type)
      setDiaryHavestList(diariesPublic.filter((d) => d.HavestId !== null))
      setDiaryOnGoingList(diariesPublic.filter((d) => d.HavestId == null))
      setDiaryMostViewedList(diariesPublic.sort((a, b) => b.DiaryId - a.DiaryId).filter((d) => d.HavestId == null))

    } else {
      setDiaryActiveType(type)
      let list = diariesPublic.filter((d) => d.Type == type)
      setDiaryHavestList(list?.filter((d) => d.HavestId !== null))
      setDiaryOnGoingList(list.filter((d) => d.HavestId == null))
      setDiaryMostViewedList(list.filter((d) => d.HavestId == null).sort((a, b) => b.Start_Date - a.Start_Date))

    }

  }

  return (

    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{`SweetLeaf - Public Journals`}</title>
        <link rel="canonical" href={`https://sweetleaf.co.za/public-journals`} />
      </Helmet>

      
      <Root>


        <Inner>
          <SearchType>

            {diaryActiveType == "All" ?

              <SearchTypeBlockActive onClick={() => { setFilter("All") }}>
                All
              </SearchTypeBlockActive>
              :
              <SearchTypeBlock onClick={() => { setFilter("All") }}>
                All
              </SearchTypeBlock>

            }
            {diaryTypes.map((d) => {
              return (
                <>
                  {diaryActiveType == d.Type ?

                    <SearchTypeBlockActive onClick={() => { setFilter(d.Type) }}>
                      {d.Type}
                    </SearchTypeBlockActive>
                    :
                    <SearchTypeBlock onClick={() => { setFilter(d.Type) }}>
                      {d.Type}
                    </SearchTypeBlock>

                  }

                </>
              )
            })}
          </SearchType>
          {!loadingPublic ?
         <>
         {diaryMostViewedList.length > 0 &&
            <>
              <Add>
                <MainHeading>New Journals</MainHeading>


              </Add>

              <DiaryHolder>
                {diaryMostViewedList?.map((d) => {
                  return (
                    <Diary
                      to={`/public-journals/overview/${d.DiaryId}`}
                    >
                      <DiaryImageHolder style={{ background: `url(${d?.ThumbNail == "" ? PlaceHolder : d?.ThumbNail})` }}>


                      </DiaryImageHolder>

                      <DiaryTextHolder>

                        <DiaryText>{d?.Title} </DiaryText>
                        <Tag> {d?.UserName}</Tag>
                        <Tag> {d?.Strain}</Tag>



                        {/* <Tag> {d?.Start_Date?.split("T")[0]}</Tag> */}

                      </DiaryTextHolder>

                    </Diary>
                  );
                })}
              </DiaryHolder>

            </>
          }
         
          {diaryHavestList.length > 0 &&
            <>


              <Add>
                <MainHeading>Havested</MainHeading>
              </Add>

              <DiaryHolder>
                {diaryHavestList?.map((d) => {
                  return (
                    <Diary
                      to={`/public-journals/overview/${d.DiaryId}`}
                    >
                      <DiaryImageHolder style={{ background: `url(${d?.ThumbNail == "" ? PlaceHolder : d?.ThumbNail})` }}>


                      </DiaryImageHolder>

                      <DiaryTextHolder>

                        <DiaryText>{d?.Title} </DiaryText>
                        <Tag> {d?.UserName}</Tag>
                        <Tag> {d?.Strain}</Tag>



                        {/* <Tag> {d?.Start_Date?.split("T")[0]}</Tag> */}

                      </DiaryTextHolder>

                    </Diary>
                  );
                })}
              </DiaryHolder>
            </>}
            </>
         :
         <LoadingHolder>
         <TailSpin
       height="70"
       width="70"
       color="#4fa94d"
       ariaLabel="tail-spin-loading"
       radius="1"
       wrapperStyle={{}}
       wrapperClass=""
       visible={true}
     />
       </LoadingHolder>
              }
        </Inner>
      </Root>
    </>
  );
};

export default Diaries;
