import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { DiaryContext } from "../context/diary_context";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import axios from "../components/shared/axios";
import { useSnackbar } from 'notistack';
import {BASE_URL_PROD} from '../components/shared/Constants'
import { TailSpin } from  'react-loader-spinner'
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
const InnerHolder = styled.div`

margin-top: 15px;
display: flex;
justify-content: center;

`;


const Button = styled.button`
  padding: 8px 25px;
  background: #f0f8ff00;
  color: #8bab50;
  border: 1px  #8bab50 solid;
  border-radius: 5px;
  cursor: pointer;
  margin: 0px 20px;
`;

const Heading = styled.h2`
text-align: center;
font-size: 20px;
margin-top: 0px;
`;
const Text = styled.p`
text-align: center;
color:#f44336!important;
margin-top: 0px;
`;


const DeleteDiary = (props) => {
  const { enqueueSnackbar } = useSnackbar()
  const { diaries, Update } = useContext(DiaryContext);

  const navigate = useNavigate();
  const { auth, authToken, userId } = useContext(AuthContext);
const [loading, setLoading] = useState(false)


  const deleteDiary = () => {
    setLoading(true)
    let data = {
      DiaryId: props.Diary.DiaryId,
      Privacy: props.Diary.Public
    }

   
    axios.delete(`${BASE_URL_PROD}/diaries/delete`, { data: data })
      .then(function (response) {
        if (response.data.affectedRows > 0) {
          navigate('/my-journals')
          enqueueSnackbar("Diary Successfully Deleted", { variant: 'success' })
          props.setPopUpOffset(-101);
          setLoading(false)
        } else {
          setLoading(false)
          enqueueSnackbar(response.status, { variant: 'error' })
        }


      })
      .catch(function (error) {
        setLoading(false)
        enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
        console.log(error);
      })

  }


  return (
    <>
      <Inner>
        <Heading>
          Are you sure you want to delete <br /> {props.Diary.Title} ?
        </Heading>
        <Text>
          Warning this action will delete all information relating to {props.Diary.Title} <br /> this action is irreversible !
        </Text>

    

        {!loading ?
    <InnerHolder>
    <Button onClick={() => { deleteDiary() }}>
      Yes
    </Button>
    <Button onClick={() => { props.setPopUpOffset(-101) }}>
      Cancel
    </Button>
  </InnerHolder>
:
<InnerHolder>
<TailSpin
  height="40"
  width="40"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
</InnerHolder>
     }
      </Inner>
    </>
  )
}

export default DeleteDiary