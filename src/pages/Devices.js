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
import axios from "../components/shared/axios";
import { useLocation, useParams } from "react-router-dom";
import DeviceImg from "../assets/Planter.png"

const Root = styled.div`

  
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
padding-bottom: 20px;
padding: 20px 0px;
margin: 80px auto;
width: 100%;
@media (max-width: 425px) {
  margin: 20px;
  padding: 20px 0px;
  border-radius: 5px;
  width: unset;
  padding-top: 0px;
}
@media (min-width: 426px) and (max-width: 768px) {
  margin: 20px;
  padding: 20px 0px;
  border-radius: 5px;
  width: unset;
  padding-top: 0px;
}
`;

const MainHeading = styled.div`
  margin: 0px 0px;
  font-size: 24px;
  margin-top: 0px;
  font-weight: bolder;
  padding: 0px 20px;
  padding-bottom: 20px;
  @media (max-width: 425px) {
    padding: unset;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding: unset;
  }
`;

const Add = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  @media (max-width: 425px) {
    padding: 20px;

  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding: 20px;
  }
`;

const Button = styled.button`
  padding: 5px 25px;
  background: #8bab50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

`;
const ButtonA = styled.button`
  padding: 5px 25px;
  background: #8bab50;
  margin-right: 0px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0px 20px;
  @media (max-width: 425px) {
    margin-right: 0px;

  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin-right: 0px;
  }

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
font-size: 20px;
color: #596876;

`;
const FormHeadingGroup = styled.div`
margin: 0px;
padding: 10px 15px;
padding-bottom: 0px;
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

const New = styled.div`
border: 2px solid #596876;
border-radius: 5px;
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
opacity: 0.4;
margin: 0px 20px;

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
background: ghostwhite;
padding: 20px;
border-radius: 5px;
margin: 0px 20px;
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
              <FormHeading>Add Device</FormHeading>
         
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
          <ButtonA
            onClick={() => {
              handleAddPopUp();
            }}
          >
            Add Devices
          </ButtonA>} 
        
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
