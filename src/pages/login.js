import React,{useState,useContext,useEffect} from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import Logo from "../assets/logoLogin.png";
import { Formik, Field, Form,ErrorMessage } from 'formik';
import * as Yup from "yup";
import { AuthContext } from "../context/auth_context";
import axios from "axios"
import { NavLink } from "react-router-dom";

const Root = styled.div`


padding-top: 0px;
color:white;
min-height: calc(100vh - 60px);
display: flex;
flex-direction: column;
justify-content: center;

`;
const RootInner = styled.div`
width:480px;
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
const Label = styled.label`
color:#596876;
font-weight:bold;
`;
const Input = styled(Field)`
margin: 10px 0px;
padding: 15px 15px;
border-radius:5px;
border:none;
background: #4e5f612e;
`;

const ErrorText = styled.p`
color: #f44336;
    margin: 0px;
    font-size: 12px;
`;

const Button = styled.button`
padding: 5px 25px;
width: fit-content;

border:none;
background:#596876;
color:white;
border-radius:50px;
cursor:pointer;
`;

const Heading = styled.h1`
margin: 0px;
padding:10px 0px;
color:white;
text-align:center;
`;

const ErrMsg = styled.p`
color: #f44336;
    margin: 0px;
    font-size: 16px;
    text-align: center;
`;

const Help = styled.p`
color: #596876;
margin: 0px;
font-size: 16px;
text-align: center;
padding-top: 20px;
`;

const MenuLink = styled(NavLink)`
  margin: 0px 0px;
  padding: 15px 5px;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  color: #8bab50;
  text-decoration: none;
  &:hover {
    border-bottom: 4px solid #8bab50;
  
  }

`;

function Login() {
  const {auth,setToken} = useContext(AuthContext)
  const navigate = useNavigate ()
 const [errMsg, setErrMsg] = useState("")


 useEffect(() => {

  document.title = "Sweet Leaf - Login" 
}, [])

  const handleLogin =(values) =>{
    console.log("values",values);
    
    axios.post('https://api.sweetleaf.co.za/login',values)
    .then(function (response) {
      if(response.data == "Please Verify Your Account"){
        setErrMsg(response.data )
      }
      if(response.data.token){
        setToken(response.data)
      }
    
  
      console.log("response",response.data);
    })
    .catch(function (error) {
  
      console.log(error);
    })


  }

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
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
        email: '',
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
     <ErrMsg >{errMsg}</ErrMsg>
      <InputGrp>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="Type Here" />
        {errors.email && touched.email ? (<ErrorText>{errors.email}</ErrorText>) : null}

        </InputGrp>

        <InputGrp>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" placeholder="Type Here" type="password"/>
        {errors.password && touched.password ? (<ErrorText>{errors.password}</ErrorText>) : null}
      </InputGrp>

      <Button>Login</Button>

      <Help>Dont have an account?     <MenuLink to="/register">Sign Up Here</MenuLink> </Help>
      </Form>
        )}
    </Formik>

    
        
     </RootInner>
    </Root>
  )
}

export default Login