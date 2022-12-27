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
import { useLocation, useParams } from "react-router-dom";
import DeviceImg from "../assets/Planter.png"

const Root = styled.div`
  margin-top: 50px;
  
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
padding-top: 10px;
margin: 0 auto;

  @media (max-width: 425px) {
    margin: 0px;
    padding: 0px;
    border-radius: 5px;
    padding-bottom: 5px;
    
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px;
    padding: 0px;
    border-radius: 5px;
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
max-width: calc(100% / 4 - 20px);
margin: 10px;
border-radius: 5px;
width: 100%;
  
@media (max-width: 619px) {
  max-width: calc(100% / 1 - 30px);
  width: 100%;
  margin: 15px auto;
  border-radius: 0px;
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
  @media (max-width: 425px) {

    border-radius: 0px;
  }
`;

const DiaryImage = styled.img`
  border-radius: 5px 5px 0px 0px;
  @media (max-width: 425px) {

    border-radius: 0px;
  }
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
  background: #234a4c;
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
  background: #234a4c;
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
  transition: all 0.2s ease;
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
background:#234a4c;
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
  transition: all 0.2s ease;
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

const New = styled.div`
border: 2px solid #234a4c;
border-radius: 5px;
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
opacity: 0.4;
margin:20px;

`;
const NewText = styled.p`
margin:0px;
padding: 0px;

`;

const DeviceHolderOutter = styled.div`
display: flex;
flex-wrap: wrap;
`;

const DeviceHolder = styled.div`
max-width: calc(100% / 4 - 20px);
background: #ededed;
padding: 20px;
border-radius: 5px;
margin: 10px;
@media (max-width: 425px) {
  max-width: calc(100% / 1 - 40px);
  margin:20px
}
`;


const DeviceOnline = styled.div`
margin: 0px 5px;
background: #4caf50;
width: 10px;
display: block;
height: 10px;
border-radius: 50%;

`;

const DeviceTextGroup = styled.div`

display: flex;
align-items: baseline;
`;



const Devices = () => {

  const [deviceList, setDeviceList] = useState([]);
  const [popUpOffset, setPopUpOffset] = useState(-100);
  const navigate = useNavigate();
  const { auth,authToken,userId } = useContext(AuthContext);

  const params = useParams();

  
  

  const handleAddPopUp = (d) => {
    if (popUpOffset == -100) {
      setPopUpOffset(0);
    } else {
      setPopUpOffset(-100);
    }
  };


  const addDevice = (values)=>{
    console.log("values",values);
    
    setDeviceList([...deviceList,values])
    setPopUpOffset(-100);
  }


  useEffect(() => {
    console.log("deviceList",deviceList);
  }, [deviceList])
  
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
            initialValues={{ }}
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
               addDevice(values)
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
              <FormHeading>Lets Get You Setup</FormHeading>
         
                </FormHeadingGroup>
                <InputHolder>
             
                <div>
                  <Input
                    id="Id"
                    label="Enter Device Id"
                    type="Id"
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
          <MainHeading>Devices</MainHeading>
          {auth && deviceList.length > 0  && 
          <Button
            onClick={() => {
              handleAddPopUp();
            }}
          >
            Add Devices
          </Button>} 
        
        </Add>

{deviceList.length > 0 ? 
<DeviceHolderOutter>
{deviceList?.map((device)=>{
   return(
    <DeviceHolder>
      <><img src={DeviceImg} width="100%"/></>
      <div>Device Id : {device.Id}</div>
      <DeviceTextGroup>Status : Online <DeviceOnline></DeviceOnline> </DeviceTextGroup>
    </DeviceHolder>
    )
})}
</DeviceHolderOutter>
:
<New     onClick={() => {
  handleAddPopUp();
}}>
<NewText >Link a device to your account</NewText>
<NewText>+</NewText>
</New>
}
      
      </Inner>
    </Root>
    </>
  );
};

export default Devices;
