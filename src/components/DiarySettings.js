import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { DiaryContext } from "../context/diary_context";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import axios from "../components/shared/axios";
import { useSnackbar } from 'notistack';
import { BASE_URL_PROD } from '../components/shared/Constants'


const Inner = styled.div`

width: 20%;
background: #ffffff;
padding: 20px;
border-radius: 5px;
display: flex;
justify-content: center;
flex-direction: column;
@media (max-width: 425px) {
  width: 80%;
}
@media (min-width: 426px) and (max-width: 768px) {
  width: 80%;
}
`;

const Heading = styled.h1`
margin: 0px;
font-size: 20px;
color: #596876;

`;
const ToggleHolder = styled.div`
display: flex;

flex-wrap: wrap;


justify-content: end;
flex-direction: column;

@media (max-width: 425px) {
  flex-direction: column;
  align-items: end;

}

`
const ToggleHolderLabel = styled.div`
color:black;
padding: 0px 10px;
display: flex;

`

const SvgW = styled.svg`
width: 20px;
fill: black;
`;

const CheckFlex = styled.div`
display: flex;
align-items: center;
padding: 10px 0px;

@media (max-width: 425px) {
  margin: 5px 0px;
}

`;
const CheckFlexHeading = styled.p`

margin-bottom: 5px;


`;


const AssignButton = styled.button`
padding: 5px 20px;
align-self: self-end;
width: fit-content;
border: none;
background: #8bab50;
color: white;
border-radius: 5px;
cursor: pointer;


@media (max-width: 425px) {
  margin: 10px 10px;
 
}
`;


const InputHolder = styled.div`
padding: 20px 0px;
align-self: self-end;
width: ${(props) => !props.assignDevice ? "0px" : "unset"};


display: ${(props) => !props.assignDevice ? "none" : "flex"};
transition: 0.5s all ease;

@media (max-width: 425px) {
  width: ${(props) => !props.assignDevice ? "0px" : "100%"};
}

`
const Input = styled.input`

background: transparent;
border: none;
border-bottom: 2px solid #8bab50;
padding: ${(props) => !props.assignDevice ? "0px" : "5px 5px"};
width: ${(props) => !props.assignDevice ? "0px" : "unset"};
color: black;
transition: 0.5s all ease;
@media (max-width: 425px) {
  width: ${(props) => !props.assignDevice ? "0px" : "100%"};
}

`

  ;

;

const InputHolderSubmit = styled.button`
display: ${(props) => !props.assignDevice ? "none" : "block"};
padding: 5px 20px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    border: none;
    background: #8bab50;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin: 0px 10px;
    margin-right: 0px;
    transition: 0.5s all ease;
`

  ;
const DiarySettings = (props) => {

  const { enqueueSnackbar } = useSnackbar()
  const params = useParams();
  const { diaries, diariesPublic, Update, loading } = useContext(DiaryContext);
  const [activeDiary, setActiveDiary] = useState([]);

  const [activeToggle, setActiveToggle] = useState(false);
  const [publicToggle, setPublicToggle] = useState(false);
  const [assignDevice, setAssignDevice] = useState(false);
  const [popUpOffset, setPopUpOffset] = useState(-100);
  const navigate = useNavigate();
  const { auth, authToken, userId, user } = useContext(AuthContext);

  useEffect(() => {
 
    setActiveDiary(props.Diary);

  }, [props.Diary])

  useEffect(() => {

    if (activeDiary?.Active == 1) {
      setActiveToggle(true)
    }
    if (activeDiary?.Active == 0) {
      setActiveToggle(false)
    }
    if (activeDiary?.Public == 1) {
      setPublicToggle(true)
    }
    if (activeDiary?.Public == 0) {
      setPublicToggle(false)
      console.log("213",activeDiary?.Public == 0)
    }

  }, [props.popUpOffset])




  const handleActiveToggle = (e, activeDiary) => {





    let values = {
      DiaryId: activeDiary.DiaryId,
      Active: e.target.checked
    }

    axios.post(`${BASE_URL_PROD}/diaries/update_active`, values)
      .then(function (response) {
        if (response.data.affectedRows == 1) {
          setActiveToggle(!e.target.checked)
        }


      })
      .catch(function (error) {

        console.log(error);
      })


  }


  const handlePublicToggle = (e, activeDiary) => {



    let values = {
      DiaryId: activeDiary.DiaryId,
      Active: e.target.checked
    }

    axios.post(`${BASE_URL_PROD}/diaries/update_public`, values,)
      .then(function (response) {
        if (response.data.affectedRows == 1) {
          setPublicToggle(!e.target.checked)
        }


      })
      .catch(function (error) {

        console.log(error);
      })


  }


  return (
    <>
      <Inner>
      <Heading>Diary Settings</Heading>

        {user?.UserId == activeDiary?.UserId &&

          <ToggleHolder>

            {activeToggle &&
              <>

                <>



                  <AssignButton onClick={() => { setAssignDevice(!assignDevice) }}>Assign Device +</AssignButton>

                  <InputHolder assignDevice={assignDevice}>
                    <Input text placeholder="Enter Device Id" assignDevice={assignDevice}></Input>
                    <InputHolderSubmit assignDevice={assignDevice} onClick={() => { setAssignDevice(false) }}>Submit</InputHolderSubmit>
                  </InputHolder>

                </>
              </>
            }
   <CheckFlexHeading>
   Set Diary as Active or In-active
   </CheckFlexHeading>

            <CheckFlex>

              <ToggleHolderLabel>In-Active</ToggleHolderLabel><label className="switch">
                <input type="checkbox" checked={activeToggle} onChange={(e) => { handleActiveToggle(e, activeDiary) }} />
                <span className="slider round"></span>

              </label>    <ToggleHolderLabel>Active</ToggleHolderLabel>

            </CheckFlex>

            <CheckFlexHeading>
   Set Diary as Public or Private
   </CheckFlexHeading>

   <CheckFlex>

<ToggleHolderLabel>Private</ToggleHolderLabel><label className="switch">
  <input type="checkbox" checked={publicToggle} onChange={(e) => { handlePublicToggle(e, activeDiary) }} />
  <span className="slider round"></span>

</label>    <ToggleHolderLabel>Public</ToggleHolderLabel>

</CheckFlex>
        

          </ToggleHolder>
        }
      </Inner>

    </>
  )
}

export default DiarySettings