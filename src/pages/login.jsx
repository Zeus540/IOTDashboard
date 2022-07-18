import React,{useState,useContext} from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import Logo from "../assets/logoLogin.png";
import { Formik, Field, Form,ErrorMessage } from 'formik';
import * as Yup from "yup";
import { AuthContext } from "../context/auth_context";

const Root = styled.div`
background:#f8f8ffc4;

padding-top: 0px;
color:white;
min-height: calc(100vh - 84px);
display: flex;
flex-direction: column;
justify-content: center;

`;
const RootInner = styled.div`
width:380px;
align-self: center;
background: #DAD7CD;
padding: 20px;
border-radius: 10px;
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

margin: 15px 0px;
padding-top: 0px;
color:white;
display: flex;
flex-direction: column;
`;
const Label = styled.label`
color:green;
font-weight:bold;
`;
const Input = styled(Field)`
margin: 10px 0px;
padding: 15px 15px;
border-radius:5px;
border:none;
background:white;
`;

const ErrorText = styled.p`
color: red;
    margin: 0px;
    font-size: 12px;
`;

const Button = styled.button`
padding: 15px 50px;
width: fit-content;
margin-top: 20px;
border:none;
background:#588157;
color:white;
border-radius:5px;
`;

const Heading = styled.h1`
margin: 0px;
padding:10px 0px;
color:white;
text-align:center;
`;

function Login() {
  const {auth,setAuth} = useContext(AuthContext)
  const navigate = useNavigate ()
 
  const handleLogin =(values) =>{
    console.log("asdasd",auth)
    if(values.name == "Admin" && values.password == "Admin"){
      setAuth(true)
      navigate('dashboard')
      
    }


  }

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(5, 'Too Short!')
      .required('Required'),
  });
  
  
  return (
    <Root>
     <RootInner>
     <Heading>
     <img src={Logo} width="60%" />
    </Heading>

    <Formik
      initialValues={{
        name: '',
        password: '',
      
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        handleLogin(values)
      }}
    >
      {({ errors, touched }) => (
      <Form>

      <InputGrp>
        <Label htmlFor="name">UserName</Label>
        <Input id="name" name="name" placeholder="Type Name Here" />
        {errors.name && touched.name ? (<ErrorText>{errors.name}</ErrorText>) : null}

        </InputGrp>

        <InputGrp>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" placeholder="Type Password Here" type="password"/>
        {errors.password && touched.password ? (<ErrorText>{errors.password}</ErrorText>) : null}
      </InputGrp>

      <Button>Login</Button>
      </Form>
        )}
    </Formik>

    
        
     </RootInner>
    </Root>
  )
}

export default Login