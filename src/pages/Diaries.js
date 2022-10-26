import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import { DiaryContext } from "../context/diary_context";
import PlaceHolder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import  faTrash  from "../assets/trash-can-regular.svg";
import { AuthContext } from "../context/auth_context";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import axios from "axios";

const Root = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;


const Inner = styled.div`
  max-width: 1770px;
  border-radius: 5px;

  background: #ffffff;
  padding: 20px;
  @media (max-width: 425px) {
    margin: 0px;
    padding: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px;
    padding: 0px;
  }
`;

const MainHeading = styled.div`
  margin: 0px 0px;
  font-size: 40px;
  margin-top: 0px;
`;

const DiaryHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Diary = styled.div`
  
  background: #c5c5c5;
  width: calc(100% / 4 - 20px);
  margin: 10px;
  border-radius: 5px;
  @media (max-width: 619px) {
    width: calc(100% / 1);
    margin: 15px 0px;
  }
  @media (min-width: 620px) and (max-width: 699px) {
    width: calc(100% / 2 - 20px);
    margin: 10px;
  }
  @media (min-width: 700px) and (max-width: 940px) {
    width: calc(100% / 2 - 20px);
  }
`;

const DiaryImageHolder = styled.div`
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;
`;

const DiaryImage = styled.img`
  border-radius: 5px 5px 0px 0px;
`;
const DiaryTextHolder = styled.div`
  padding: 15px 15px;
`;
const DeleteDiary = styled.div`
cursor:pointer;
`;
const DeleteDiarySvg = styled.img`
color:red;
`;
const Tag = styled.sup`
  margin-right: 10px;
  padding: 3px 10px;
  font-size: 10px;
  display: block;
  border-radius: 50px;
  color: white;
  background: #39595b;
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
    padding: 10px 20px;
    padding-top: 20px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding: 10px 20px;
    padding-top: 20px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #39595b;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

const PopUpHolder = styled.div`
  background: #121b1cc4 ;
  top: 0;
  position: fixed;
  z-index: 999;
  min-height: 100vh;
  right: 0px;
  height: calc(100vh - 74px);
  left: 0px;
  transform: translateY(${(props) => props.popUpOffset}%);
  transition: all 0.5s ease;
`;
const PopUpHolderInner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;

`;

const ClosePopUpHolder = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 30px;
  color: #b62a2a;
  cursor: pointer;
`;
const Input = styled(TextField)`
margin-bottom: 20px;
width: 100%;
`;
const FormHeading = styled.h1`
margin: 0px;

color:white
`;
const FormHeadingGroup = styled.div`
margin: 0px;
background:#39595b;
color:white;
padding: 20px;
`;

const FormSub = styled.p`
margin: 0px;

color:white
`;

const ClosePopUpHolderText = styled.p`
  text-align: center;

  font-size: 30px;
  margin: 0 auto;
  cursor: pointer;

  left: 0;
  color: #a5a5a5;
  width: 100%;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.2);
    color: #b62a2a;
  }
`;
const Form = styled.form`
overflow: auto;
max-height: 80vh;

background: white;
border-radius: 5px;
width:20%;
overflow:auto;

@media (max-width: 768px) {
  width: 90%;
}
`;
const InputHolder = styled.div`
padding: 20px;

`;
const DeleteDiaryHolder = styled.div`
display: flex;
justify-content: space-between;
align-items: center;  
`;


const Diaries = () => {
  const { diaries,Update } = useContext(DiaryContext);
  const [diaryList, setDiaryList] = useState(diaries);
  const [popUpOffset, setPopUpOffset] = useState(-100);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    Update()
  }, [])
  
  const handleClick = (d) => {
    navigate(`/overview/${d.DiaryId}`);
  };

  const handleAddPopUp = (d) => {
    if (popUpOffset == -100) {
      setPopUpOffset(0);
    } else {
      setPopUpOffset(-100);
    }
  };


  const addDiary = (values)=>{
    console.log("values",values);
    axios.post('https://api.sweetleaf.co.za/diaries/add',values)
    .then(function (response) {
      if(response.data.insertId !== undefined){
        Update()
        setPopUpOffset(-100);
      }
     
      console.log("response",response.data.insertId);
    })
    .catch(function (error) {
  
      console.log(error);
    })
 
  }

  const deleteDiary = (DiaryId)=>{
    console.log("DiaryId",DiaryId);
    let data ={
      DiaryId:DiaryId
    }
    axios.post('https://api.sweetleaf.co.za/diaries/delete',data)
    .then(function (response) {
      if(response.data.affectedRows > 0){
        Update()
        setPopUpOffset(-100);
      }

     
    })
    .catch(function (error) {
  
      console.log(error);
    })
 
  }

  
  return (

    <>
      <PopUpHolder popUpOffset={popUpOffset}>
    

    <PopUpHolderInner>

    <ClosePopUpHolder
      onClick={() => {
        handleAddPopUp();
      }}
    >
      <ClosePopUpHolderText>
      
        <FontAwesomeIcon icon={faTimesCircle} />

      </ClosePopUpHolderText>
    </ClosePopUpHolder>
      
          <Formik
            initialValues={{ title: "", roomType: "" }}
            // validate={(values) => {
            //   const errors = {};
            //   if (!values.email) {
            //     errors.email = "Required";
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
            //       values.email
            //     )
            //   ) {
            //     errors.email = "Invalid email address";
            //   }
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                addDiary(values)
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (

              <Form onSubmit={handleSubmit}>
                 
   
              <FormHeadingGroup>
              <FormHeading>Lets Get Setup</FormHeading>
              <FormSub>Fill out the form below</FormSub>
                </FormHeadingGroup>
                <InputHolder>
             
                <div>
                  <Input
                    id="title"
                    label="Title"
                    type="title"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                
                <div>
                  <Input
                    id="roomType"
                    label="Room Type"
                    type="roomType"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div>
                  <Input
                    id="potSize"
                    label="Pot Size"
                    type="potSize"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div>
                  <Input
                    id="strain"
                    label="Strain"
                    type="strain"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div>
                  <Input
                    id="lightSchedule"
                    label="Light Schedule"
                    type="lightSchedule"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <Input
                    id="lightWattage"
                    label="Light Wattage"
                    type="lightWattage"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

             

              
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                </InputHolder>
              </Form>
            )}
          </Formik>
    
    </PopUpHolderInner>
  </PopUpHolder>
    
 
    <Root>
    

      <Inner>
        <Add>
          <MainHeading>Diaries</MainHeading>
          {auth &&   
          <Button
            onClick={() => {
              handleAddPopUp();
            }}
          >
            Add New Diary
          </Button>}
        
        </Add>

        <DiaryHolder>
          {diaries?.filter((d)=> d?.Public == 1)?.map((d) => {
            return (
              <Diary
                
              >
                <DiaryImageHolder onClick={() => {
                  handleClick(d);
                }}>
                 
                  <DiaryImage
                    src={d?.ThumbNail == "" ? PlaceHolder : d?.ThumbNail}
                    width="100%"
                  />
                </DiaryImageHolder>

                <DiaryTextHolder>
                  <TagHolder>
                    <Tag> {d?.Strain}</Tag>
                    <Tag> {d?.Room_Type}</Tag>
                    <Tag> {d?.Start_Date?.split("T")[0]}</Tag>
                  </TagHolder>
             <DeleteDiaryHolder>
             <div>{d?.Title}</div>
                {d?.DiaryId !== 2 &&
                    <DeleteDiary onClick={()=>{deleteDiary(d?.DiaryId)}}>        <DeleteDiarySvg src={faTrash} width="20px"/></DeleteDiary>
                }
             </DeleteDiaryHolder>
                </DiaryTextHolder>
              
              </Diary>
            );
          })}
        </DiaryHolder>
      </Inner>
    </Root>
    </>
  );
};

export default Diaries;
