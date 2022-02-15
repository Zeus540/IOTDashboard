import React from 'react'
import styled from 'styled-components';

const Root = styled.div`
background: #1f1f1f;

padding-top: 0px;
color:white;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;

`;
const RootInner = styled.div`
width:20%;
align-self: center;
@media(max-width:425px){
    width:90%;
  }
  @media(min-width:426px) and (max-width:768px){
    width:80%;
  }
  @media(min-width:769px) and (max-width:1024px){
    width:40%;
  }
`;

const InputGrp = styled.div`
background: #1f1f1f;
margin: 5px 0px;
padding-top: 0px;
color:white;
display: flex;
flex-direction: column;
`;
const Label = styled.label`
color:#7adb76;
`;
const Input = styled.input`
margin: 10px 0px;
padding: 10px 0px;
border-radius:5px;
`;
const Pre = styled.pre`
text-align:left;
font-size:40px;

`;
const Span = styled.sub`
color:#7adb76;
margin-left:5px;
font-size:20px;

`;
const Sup = styled.sup`
color:#7adb76;
font-size:18px;
margin-right:5px;

`;
const HeadingFlex = styled.div`
display:flex;
flex-direction: column;
align-items: center;
`;
const Button = styled.button`
padding: 10px 50px;
width: fit-content;
margin-top: 20px;
align-self
`;

const Heading = styled.h1`
margin: 0px;
padding:10px 0px;
color:white;

`;

function Login() {
  return (
    <Root>
     <RootInner>
     <Heading>
    <HeadingFlex>
    <Pre><Sup>IoT</Sup><span>Smart</span><Span>Pot</Span> </Pre>

    </HeadingFlex>
    </Heading>
        <InputGrp>
        <Label>Username</Label>
        <Input type="text" />
        </InputGrp>
        <InputGrp>
        <Label>Password</Label>
        <Input type="text" />
        </InputGrp>
        <Button>Login</Button>
     </RootInner>
    </Root>
  )
}

export default Login