import React,{useState,useContext} from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import Logo from "../assets/logoLogin.png";
import { Formik, Field, Form,ErrorMessage } from 'formik';
import * as Yup from "yup";
import { AuthContext } from "../context/auth_context";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Root = styled.div`
background:#39595b26;

padding-top: 0px;
color:white;
min-height: calc(100vh - 70px);
display: flex;
flex-direction: column;
justify-content: center;

`;
const RootInner = styled.div`
width:380px;
align-self: center;
background: #ffffff;
padding: 20px;
border-radius: 5px;
@media(max-width:425px){
  margin: 16px;
padding: 20px;
width:unset;
}
@media(min-width:426px) and (max-width:768px){
  margin: 16px;
  padding: 20px;
  width:unset;
}
`;

const InputGrp = styled.div`

margin: 15px 0px;
padding-top: 0px;
color:white;
display: flex;
flex-direction: column;
`;
const InputGrpCheck = styled.div`


padding-top: 0px;
color:white;
display: flex;
align-items: center;
`;

const Label = styled.label`
color:#39595b;
font-weight:bold;
`;
const Input = styled(Field)`
margin: 10px 0px;
padding: 15px 15px;
border-radius:5px;
border:none;
background:#4e5f612e;
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
background:#39595b;
color:white;
border-radius:5px;
cursor: pointer;
`;

const Heading = styled.h1`
margin: 0px;
padding:10px 0px;
color:white;
text-align:center;
`;

function Register() {
  const {auth,setAuth} = useContext(AuthContext)
  const navigate = useNavigate ()
 
  const handleLogin =(values) =>{
    console.log(values)
    if(values.name == "Admin" && values.password == "Admin"){
      setAuth(true)
      navigate('/diaries')
      
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
      age: Yup.string()
     
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
        age: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        handleLogin(values)
      }}
    >
      {({ errors, touched,handleSubmit }) => (
      <Form  onSubmit={handleSubmit}>

      <InputGrp>
        <Label htmlFor="name">UserName</Label>
        <Input id="name" name="name" placeholder="Type Here" />
        {errors.name && touched.name ? (<ErrorText>{errors.name}</ErrorText>) : null}

        </InputGrp>

        <InputGrp>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="Type Here" type="email"/>
        {errors.email && touched.email ? (<ErrorText>{errors.email}</ErrorText>) : null}
      </InputGrp>

        <InputGrp>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" placeholder="Type Here" type="password"/>
        {errors.password && touched.password ? (<ErrorText>{errors.password}</ErrorText>) : null}
      </InputGrp>

      <InputGrp>
      <InputGrpCheck>
      <Checkbox  id="age" name="age"/>
      <Label htmlFor="age">I am 18 years old</Label>
      </InputGrpCheck>
      {errors.age && touched.age ? (<ErrorText>{errors.age}</ErrorText>) : null}
      </InputGrp>
  

      <Button>Create Account</Button>
      </Form>
        )}
    </Formik>

    
        
     </RootInner>
    </Root>
  )
}

export default Register