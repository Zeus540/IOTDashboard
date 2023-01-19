import React,{ useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logoLogin.png";
import axios from "axios"

const Root = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  height: calc(100vh - 73px);
`;

const Inner = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #dadada;
  text-align: center;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding-bottom: 40px;
`;

const LogoImg = styled.img`
    width: 300px;
    margin:0 auto
`;

const Text = styled.p`
    font-size: 30px;
    padding: 10px 0px;
    font-weight: bold;
    margin: 0;

`;

const TextSmall = styled.p`
padding: 0px;
font-size: 15px;
font-weight: unset;

`;


const VerifyComplete = () => {
const navigate = useNavigate()

    useEffect(() => {
        {console.log("params", params.token) }

        
        axios.post('${BASE_URL_PROD}/verify',params)
        .then((response) => {
        if(response.data.url){
            setTimeout(() => {
                navigate(response.data.url)
              }, 2500);
        }else{
            navigate('/')
        }
        console.log(response.data.url);
        })
        .catch((error)=> {
      
          console.log(error);
        })

    }, [])
    
    const params = useParams()

    return (
        <Root>
            <Inner>
                <LogoImg src={Logo} width="100%" />
               
               
                <Text>
                    Verification Successful
                </Text>
                <TextSmall>
                    You will be redirected shortly
                </TextSmall>
            </Inner>
        </Root>
    )
}

export default VerifyComplete