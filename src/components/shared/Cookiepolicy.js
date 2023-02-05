import React from 'react'
import styled from "styled-components";

const Root = styled.div`
box-shadow: 0px 0px 20px #00000012;
background: #344e41;
position: fixed;
right:0px;
left:0px;
bottom: 0;
padding: 20px;
text-align: center;
`;


const Inner = styled.div`




padding: 0px 0px;

margin: 0px auto;
max-width: 1770px;
`;

const BtnHolder = styled.div`
display: flex;
justify-content: space-between;
width: 90%;
margin: 0 auto;
`;

const Button = styled.button`
padding: 5px 20px;
border-radius: 5px;
border: none;
cursor: pointer;
background: #8bab50;
color: white;
`;

const Text = styled.p`
margin-top: 0;
color: white;
`;

const Cookiepolicy = (props) => {
    console.log("props",props)

  return (
    <Root>
        <Inner>
        <Text>This site uses cookies and related technologies for site operation, analytics and third party advertising purposes as described in our Privacy Policy. You may choose to consent to our use of these technologies. To opt-out of sharing with third parties information related to these technologies, click "Decline"</Text>

    <BtnHolder>
        <Button>Manage Cookies</Button> 
        <Button onClick={()=>{props.SetCookie()}}>Accept</Button> 
    </BtnHolder>   
    </Inner> 
    </Root>
  )
}

export default Cookiepolicy